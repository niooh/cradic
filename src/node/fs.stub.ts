export async function saveFile(filename: string, content: string): Promise<void> {
  throw new Error('File saving is not supported in browser environment');
}
