import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private STORAGE_KEY = 'timestamp';
  private TIMESTAMP_KEY = 'login_timestamp';
  private EXPIRY_DAYS = 1;

  setItem(value: string) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(value));
    localStorage.setItem(this.TIMESTAMP_KEY, Date.now().toString());
  }

  getItem(): string | null {
    this.clearIfExpired();
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  }

  clear() {
    localStorage.removeItem(this.STORAGE_KEY);
    localStorage.removeItem(this.TIMESTAMP_KEY);
  }

  private clearIfExpired() {
    const timestamp = localStorage.getItem(this.TIMESTAMP_KEY);
    if (timestamp) {
      const now = Date.now();
      const diffDays = (now - parseInt(timestamp, 10)) / (1000 * 60 * 60 * 24);
      if (diffDays >= this.EXPIRY_DAYS) {
        this.clear();
      }
    }
  }
}
