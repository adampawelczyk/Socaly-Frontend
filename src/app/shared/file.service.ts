import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private basePath = '/uploads';

  constructor(private db: AngularFireDatabase,
              private storage: AngularFireStorage) { }

  async uploadFile(file: File) {
    const filePath = `${this.basePath}/${file.name}`;

    try {
      const snap = await this.storage.upload(filePath, file);

      return await snap.ref.getDownloadURL();
    } catch (error) {
      throw error;
    }
  }

  removeFile(url: string) {
    this.storage.refFromURL(url).delete();
  }
}
