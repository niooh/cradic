import { OutputType, DEFAULT_PARAMS, TYPE_ALIAS, OutputTypeAlias } from './constants';
import { isNodeEnv, isBrowserEnv, downloadFile } from './utils';
import { renderHtml } from './render/html';
import { renderSvg } from './render/svg';
import { renderText } from './render/text';
import { renderTypst } from './render/typst';

function getMimeType(type: OutputType): string {
  switch (type) {
    case 'html': return 'text/html';
    case 'svg': return 'image/svg+xml';
    case 'text': return 'text/plain';
    case 'typ': return 'text/plain';
    case 'png': return 'image/png';
    case 'jpg': return 'image/jpeg';
    case 'avif': return 'image/avif';
    case 'pdf': return 'application/pdf';
    default: return 'application/octet-stream';
  }
}

function isBufferLike(obj: any): boolean {
  return isNodeEnv() && obj && typeof obj === 'object' && obj.constructor && obj.constructor.isBuffer?.(obj);
}

export class Cradic {
  private text: string;
  private outputType: OutputType = 'html';
  private customParams?: Record<string, any>;
  private content: string | Buffer = '';

  constructor(text: string) {
    this.text = text;
  }

  to(type: OutputType | OutputTypeAlias): this {
    this.outputType = (TYPE_ALIAS[type as OutputTypeAlias] || type) as OutputType;
    return this;
  }

  with(params: Record<string, any>): this {
    this.customParams = params;
    return this;
  }

  private async generate(): Promise<string | Buffer> {
    if (this.content) return this.content;

    switch (this.outputType) {
      case 'html':
        this.content = renderHtml(this.text, this.customParams);
        break;
      case 'svg':
        this.content = renderSvg(this.text, this.customParams);
        break;
      case 'text':
        this.content = renderText(this.text, this.customParams);
        break;
      case 'typ':
        this.content = renderTypst(this.text, this.customParams);
        break;
      case 'png': case 'jpg': case 'avif':
      case 'pdf':
        if (!isNodeEnv()) {
          throw new Error(`${this.outputType} is not supported in browser`);
        }
        this.content = await this.generateBinary();
        break;
      default:
        throw new Error(`Unknown output type: ${this.outputType}`);
    }

    return this.content;
  }

  private async generateBinary(): Promise<Buffer> {
    if (!isNodeEnv()) {
      throw new Error('Binary generation only works in Node.js');
    }

    const { generateBinary } = await import('./node/binary');
    
    // 根据输出类型决定使用 .typ | .svg
    const input = this.outputType === 'pdf'
      ? renderTypst(this.text, this.customParams)
      : renderSvg(this.text, this.customParams);

    return generateBinary(input, this.outputType as 'png' | 'jpg' | 'pdf');
  }

  log(): this {
    this.generate().then((content) => {
      if (isBufferLike(content)) {
        const buf = content as unknown as Buffer;
        console.log(
          `[${this.outputType.toUpperCase()}] Generated binary data (${buf.length} bytes)`
        );
      } else {
        console.log(content);
      }
    });
    return this;
  }

  async saveAs(filename: string): Promise<void> {
    const content = await this.generate();

    if (isNodeEnv()) {
      const { saveFile, saveBinaryFile } = await import('./node/fs');

      if (isBufferLike(content)) {
        await saveBinaryFile(filename, content as unknown as Buffer);
      } else {
        await saveFile(filename, content as string);
      }
    } else if (isBrowserEnv()) {
      const mimeType = getMimeType(this.outputType);
      // 浏览器环境中，二进制文件应该已经被处理
      downloadFile(content as string, filename, mimeType);
    }
  }

  async toStr(): Promise<string> {
    const content = await this.generate();
    if (isBufferLike(content)) {
      throw new Error(
        `Cannot convert binary data (${this.outputType}) to string. ` +
        `Use saveAs() to save to file instead.`
      );
    }
    return content as string;
  }
}

export function from(text: string): Cradic {
  return new Cradic(text);
}
