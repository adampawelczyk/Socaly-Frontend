import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClipboardService {
  constructor() { }

  public writeText(textToCopy: string): Promise<void> {
    return new Promise<void>(
      (resolve, reject): void => {
        let success = false;
        const listener = (clipboardEvent: ClipboardEvent): void => {
          clipboardEvent.clipboardData?.setData('text/plain', textToCopy);
          clipboardEvent.preventDefault();
          success = true;
        };

        const input = document.createElement('input');
        document.body.appendChild(input);
        input.select();

        document.addEventListener('copy', listener);
        document.execCommand('copy');
        document.removeEventListener('copy', listener);
        document.body.removeChild(input);
        success ? resolve() : reject();
      },
    );
  }
}
