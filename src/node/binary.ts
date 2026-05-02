import { execSync } from 'child_process';
import { writeFileSync, readFileSync, unlinkSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

export async function generateBinary(
  input: string,
  format: 'png' | 'jpg' | 'pdf'
): Promise<Buffer> {
  if (format === 'pdf') {
    return generatePdfFromTyp(input);
  } else {
    return generateRasterFromSvg(input, format);
  }
}

/**
 * SVG 字符串 -> rsvg-convert -> PNG/JPG Buffer
 * 内部创建并清理临时 SVG 文件
 */
function generateRasterFromSvg(svg: string, format: 'png' | 'jpg'): Buffer {
  const tmpSvgFile = join(tmpdir(), `cradic-${Date.now()}.svg`);
  const tmpPngFile = tmpSvgFile.replace(/\.svg$/, '.png');
  writeFileSync(tmpSvgFile, svg);
  try {
    return execSync(`rsvg-convert "${tmpSvgFile}" -o "${tmpPngFile}"`, { stdio: 'pipe' });
  } finally {
    unlinkSync(tmpSvgFile);
  }
}

/**
 * Typst 源码字符串 -> typst compile -> PDF Buffer
 * 内部创建并清理临时 .typ 和 .pdf 文件
 */
function generatePdfFromTyp(typstCode: string): Buffer {
  const tmpTypstFile = join(tmpdir(), `cradic-${Date.now()}.typ`);
  const tmpPdfFile = tmpTypstFile.replace(/\.typ$/, '.pdf');

  writeFileSync(tmpTypstFile, typstCode, 'utf-8');

  try {
    execSync(`typst compile "${tmpTypstFile}" "${tmpPdfFile}"`, {
      encoding: 'utf-8',
      stdio: 'pipe',
    });
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
