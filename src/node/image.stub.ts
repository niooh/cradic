export async function generateImage(
  svg: string,
  format: 'png' | 'jpg' | 'pdf'
): Promise<string> {
  throw new Error('Image generation is not supported in browser environment');
}
