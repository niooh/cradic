import { writeFile, mkdir } from 'fs/promises';
import { resolve, dirname } from 'path';

export async function saveFile(filename: string, content: string): Promise<void> {
  try {
    const filepath = resolve(process.cwd(), filename);
    const directory = dirname(filepath);
    
    await mkdir(directory, { recursive: true });
    await writeFile(filepath, content, 'utf-8');
    console.log(`Saved to ${filepath}`);
  } catch (error) {
    console.error(`Failed to save file: ${(error as Error).message}`);
    throw error;
  }
}

// 二进制文件写入
export async function saveBinaryFile(filename: string, buffer: Buffer): Promise<void> {
  try {
    const filepath = resolve(process.cwd(), filename);
    const directory = dirname(filepath);

    await mkdir(directory, { recursive: true });
    await writeFile(filepath, buffer);
    console.log(`Saved to ${filepath}`);
  } catch (error) {
    console.error(`Failed to save file: ${(error as Error).message}`);
    throw error;
  }
}
