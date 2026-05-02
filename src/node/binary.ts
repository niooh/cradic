import { execSync } from 'child_process';
import { writeFileSync, readFileSync, unlinkSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

export async function generateBinary(
  input: string,
  format: 'png' | 'jpg' | 'pdf'
): Promise<Buffer> {
  if (format === 'pdf') {
    return generatePdfFromTypst(input);
  } else {
    return generateRasterFromSvg(input, format);
  }
}

/**
 * SVG 字符串 -> rsvg-convert -> PNG/JPG Buffer
 * 关键：rsvg-convert -o 将数据写入文件，需要读取文件而不是 stdout
 */
function generateRasterFromSvg(svg: string, format: 'png' | 'jpg'): Buffer {
  const tmpSvgFile = join(tmpdir(), `cradic-${Date.now()}.svg`);
  const tmpOutputFile = tmpSvgFile.replace(/\.svg$/, `.${format}`);
  
  writeFileSync(tmpSvgFile, svg);
  
  try {
    execSync(`rsvg-convert "${tmpSvgFile}" -o "${tmpOutputFile}"`, {
      stdio: 'pipe',
      encoding: 'buffer',
    });
    
    // 读取生成的文件
    return readFileSync(tmpOutputFile);
  } catch (error) {
    throw new Error(
      `Failed to generate ${format.toUpperCase()} from SVG. ` +
      `Make sure rsvg-convert is installed.\n` +
      `Install: brew install librsvg (macOS) or apt-get install librsvg2-bin (Linux)\n` +
      `Details: ${(error as Error).message}`
    );
  } finally {
    try { unlinkSync(tmpSvgFile); } catch {}
    try { unlinkSync(tmpOutputFile); } catch {}
  }
}

/**
 * Typst 源码字符串 -> typst compile -> PDF Buffer
 */
function generatePdfFromTypst(typstCode: string): Buffer {
  const tmpTypstFile = join(tmpdir(), `cradic-${Date.now()}.typ`);
  const tmpPdfFile = tmpTypstFile.replace(/\.typ$/, '.pdf');
  
  writeFileSync(tmpTypstFile, typstCode, 'utf-8');
  
  try {
    execSync(`typst compile "${tmpTypstFile}" "${tmpPdfFile}"`, {
      encoding: 'utf-8',
      stdio: 'pipe',
    });
    
    // 读取生成的 PDF 文件
    return readFileSync(tmpPdfFile);
  } catch (error) {
    throw new Error(
      `Failed to generate PDF from Typst code. ` +
      `Make sure typst is installed.\n` +
      `Install: brew install typst (macOS) or visit https://github.com/typst/typst/releases\n` +
      `Details: ${(error as Error).message}`
    );
  } finally {
    try { unlinkSync(tmpTypstFile); } catch {}
    try { unlinkSync(tmpPdfFile); } catch {}
  }
}
