import { execSync } from 'child_process';
import { writeFileSync, readFileSync, unlinkSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';


// 工具检测
function isCommandAvailable(command: string): boolean {
  try {
    execSync(`command -v ${command}`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

// SVG -> PNG/JPG
function convertWithRsvg(svgFile: string, outputFile: string): void {
  const isJpg = outputFile.endsWith('.jpg');
  const bgFlag = isJpg ? '-b white ' : '';
  execSync(`rsvg-convert ${bgFlag}"${svgFile}" -o "${outputFile}"`, {
    stdio: 'pipe', encoding: 'buffer',
  });
}

function convertWithMagick(svgFile: string, outputFile: string): void {
  const cmd = isCommandAvailable('magick') ? 'magick' : 'convert';
  execSync(`${cmd} "${svgFile}" "${outputFile}"`, { stdio: 'pipe' });
}

function convertWithCairo(svgFile: string, outputFile: string): void {
  const fmt = outputFile.endsWith('.jpg') ? 'jpg' : 'png';
  execSync(`cairosvg "${svgFile}" -o "${outputFile}" -f ${fmt}`, { stdio: 'pipe' });
}

function renderSvgToRaster(svg: string, format: 'png' | 'jpg'): Buffer {
  const tmpSvg = join(tmpdir(), `cradic-${Date.now()}.svg`);
  const tmpOut = tmpSvg.replace(/\.svg$/, `.${format}`);
  writeFileSync(tmpSvg, svg);

  const converters = [
    { name: 'rsvg-convert', fn: () => convertWithRsvg(tmpSvg, tmpOut) },
    { name: 'ImageMagick', fn: () => convertWithMagick(tmpSvg, tmpOut) },
    { name: 'cairosvg', fn: () => convertWithCairo(tmpSvg, tmpOut) },
  ];

  let lastError: Error | null = null;
  for (const c of converters) {
    try {
      c.fn();
      return readFileSync(tmpOut);
    } catch (e) {
      lastError = e as Error;
      continue;
    } finally {
      try { unlinkSync(tmpSvg); } catch {}
      try { unlinkSync(tmpOut); } catch {}
    }
  }

  throw new Error(
    `Failed to generate ${format.toUpperCase()} from SVG.\n` +
    `Attempted: rsvg-convert, ImageMagick, cairosvg.\n` +
    `Install one: brew install librsvg / imagemagick / pip install cairosvg\n` +
    `Last error: ${lastError?.message}`
  );
}

function convertJpgToAvif(jpgBuffer: Buffer): Buffer {
  const tmpJpg = join(tmpdir(), `cradic-${Date.now()}.jpg`);
  const tmpAvif = tmpJpg.replace(/\.jpg$/, '.avif');
  writeFileSync(tmpJpg, jpgBuffer);

  try {
    // 优先使用 avifenc
    if (isCommandAvailable('avifenc')) {
      execSync(`avifenc --speed 0 "${tmpJpg}" "${tmpAvif}"`, { stdio: 'pipe' });
      return readFileSync(tmpAvif);
    }

    // 降级到 ImageMagick
    if (isCommandAvailable('magick') || isCommandAvailable('convert')) {
      const cmd = isCommandAvailable('magick') ? 'magick' : 'convert';
      execSync(`${cmd} "${tmpJpg}" "${tmpAvif}"`, { stdio: 'pipe' });
      return readFileSync(tmpAvif);
    }

    throw new Error(
      'Failed to generate AVIF.\n' +
      'Install avifenc or ImageMagick.'
    );
  } catch (error) {
    throw new Error(
      `Failed to convert JPG to AVIF.\n` +
      `Details: ${(error as Error).message}`
    );
  } finally {
    try { unlinkSync(tmpJpg); } catch {}
    try { unlinkSync(tmpAvif); } catch {}
  }
}

// Typst -> PDF
function generatePdfFromTypst(typstCode: string): Buffer {
  const tmpTypst = join(tmpdir(), `cradic-${Date.now()}.typ`);
  const tmpPdf = tmpTypst.replace(/\.typ$/, '.pdf');
  writeFileSync(tmpTypst, typstCode, 'utf-8');

  try {
    execSync(`typst compile "${tmpTypst}" "${tmpPdf}"`, { stdio: 'pipe' });
    return readFileSync(tmpPdf);
  } catch (error) {
    throw new Error(
      `Failed to generate PDF from Typst code.\n` +
      `Make sure typst is installed.\n` +
      `Details: ${(error as Error).message}`
    );
  } finally {
    try { unlinkSync(tmpTypst); } catch {}
    try { unlinkSync(tmpPdf); } catch {}
  }
}

/**
 * 统一导出入口
 */
export async function generateBinary(
  input: string,
  format: 'png' | 'jpg' | 'avif' | 'pdf'
): Promise<Buffer> {
  switch (format) {
    case 'pdf':
      return generatePdfFromTypst(input);

    case 'avif': {
      const jpg = renderSvgToRaster(input, 'jpg');
      return convertJpgToAvif(jpg);
    }

    case 'png': case 'jpg':
      return renderSvgToRaster(input, format);

    default:
      throw new Error(`Unsupported format: ${format}`);
  }
}