import { execSync } from 'child_process';
import { writeFileSync, unlinkSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

export async function generateImage(
  svg: string,
  format: 'png' | 'jpg' | 'pdf'
): Promise<string> {
  const tmpFile = join(tmpdir(), `cradic-${Date.now()}.svg`);
  writeFileSync(tmpFile, svg);

  try {
    if (format === 'pdf') {
      return generatePdf(svg);
    } else {
      return generateRaster(tmpFile, format);
    }
  } finally {
    unlinkSync(tmpFile);
  }
}

function generateRaster(svgFile: string, format: 'png' | 'jpg'): string {
  try {
    const output = execSync(`rsvg-convert -f ${format} "${svgFile}"`, {
      encoding: 'utf-8',
    });
    return output;
  } catch (error) {
    throw new Error(
      `Failed to convert SVG to ${format}. Make sure rsvg-convert is installed.`
    );
  }
}

function generatePdf(svg: string): string {
  const tmpTypst = join(tmpdir(), `cradic-${Date.now()}.typ`);
  const typstContent = `#set page(width: auto, height: auto, margin: 0pt)
#image.decode(bytes("${Buffer.from(svg).toString('base64')}"), format: "svg")`;

  writeFileSync(tmpTypst, typstContent);

  try {
    execSync(`typst compile "${tmpTypst}"`, { encoding: 'utf-8' });
    return 'PDF generated';
  } catch (error) {
    throw new Error('Failed to generate PDF. Make sure typst is installed.');
  } finally {
    unlinkSync(tmpTypst);
  }
}