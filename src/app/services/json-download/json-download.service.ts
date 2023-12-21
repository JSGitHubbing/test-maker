
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JsonDownloadService {
  downloadObjectAsJson(object: any, fileName: string): void {
    const jsonContent = JSON.stringify(object, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });

    const downloadLink = document.createElement('a');
    downloadLink.download = fileName + '_' + (new Date()).toISOString() + '.json';
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.click();
  }
}