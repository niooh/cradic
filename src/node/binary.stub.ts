export async function generateBinary(
  svg: string,
  format: 'png' | 'jpg' | 'avif' | 'pdf'
): Promise<Buffer> {
  throw new Error('Binary generation is not supported in browser environment');
}
