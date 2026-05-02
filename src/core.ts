import { OutputType, DEFAULT_PARAMS } from './constants';
import { isNodeEnv, isBrowserEnv, downloadFile } from './utils';
import { renderHtml } from './render/html';
import { renderSvg } from './render/svg';
import { renderText } from './render/text';
import { renderTypst } from './render/typst';

export class Cradic {
  private text: string;
  private outputType: OutputType = 'html';
  private customParams?: Record<string, any>;
  private content: string = '';

  constructor(text: string) {
    this.text = text;
  }

  to(type: OutputType): this {
    this.outputType = type;
    return this;
  }

  with(params: Record<string, any>): this {
    this.customParams = params;
    return this;
  }

  private async generate(): Promise<string> {
    if (this.content) return this.content;

    switch (this.outputType) {
      case 'html':
        this.content = renderHtml(this.text, this.customParams);
        break;
      case 'svg':
        this.content = renderSvg(this.text, this.customParams);
        break;
      case 'text':
        this.content = renderText(this.text);
        break;
      case 'typ':
        this.content = renderTypst(this.text, this.customParams);
        break;
      case 'png':
      case 'jpg':
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

  private async generateBinary(): Promise<string> {
    if (!isNodeEnv()) {
      throw new Error('Binary generation only works in Node.js');
    }

    const { generateBinary } = await import('./node/binary');

    // 根据输出类型决定使用 SVG 还是 Typst
    const input = this.outputType === 'pdf'
      ? renderTypst(this.text, this.customParams)
      : renderSvg(this.text, this.customParams);

    const buffer = await generateBinary(input, this.outputType as 'png' | 'jpg' | 'pdf');

    return buffer.toString('base64');
  }

  log(): this {
    this.generate().then((content) => {
      console.log(content);
    });
    return this;
  }

  async saveAs(filename: string): Promise<void> {
    const content = await this.generate();
  
    if (isNodeEnv()) {
      const { saveFile } = await import('./node/fs');
    
      // 对于二进制格式，需要特殊处理
      if (['png', 'jpg', 'pdf'].includes(this.outputType)) {
        const { saveBinaryFile } = await import('./node/fs');
        const buffer = Buffer.from(content, 'base64');
        await saveBinaryFile(filename, buffer);
      } else {
        await saveFile(filename, content);
      }
    } else if (isBrowserEnv()) {
      const mimeType = this.getMimeType();
      downloadFile(content, filename, mimeType);
    }
}

  private getMimeType(): string {
    switch (this.outputType) {
      case 'html':
        return 'text/html';
      case 'svg':
        return 'image/svg+xml';
      case 'text':
        return 'text/plain';
      case 'typ':
        return 'text/plain';
      default:
        return 'application/octet-stream';
    }
  }

  async toString(): Promise<string> {
    return this.generate();
  }
}

export function from(text: string): Cradic {
  return new Cradic(text);
}
