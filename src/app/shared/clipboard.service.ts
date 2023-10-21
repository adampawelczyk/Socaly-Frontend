import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClipboardService {
  constructor() { }

  public writeText(textToCopy: string): Promise<void> {
    return new Promise<void>((resolve, reject): void => {
      const input = document.createElement('input');
      input.value = textToCopy;

      document.body.appendChild(input);
      input.select();

      try {
        document.execCommand('copy');
        resolve();
      } catch (error) {
        reject(error);
      } finally {
        document.body.removeChild(input);
      }
    });
  }
}
