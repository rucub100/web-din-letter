import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlatformService {
  private readonly _platformId = inject(PLATFORM_ID);
  private readonly _isBrowser = isPlatformBrowser(this._platformId);
  private readonly _isServer = isPlatformServer(this._platformId);

  get isBrowser(): boolean {
    return this._isBrowser;
  }

  get isServer(): boolean {
    return this._isServer;
  }

  runInBrowser(fn: () => void): void {
    if (this._isBrowser) {
      fn();
    }
  }

  runOnServer(fn: () => void): void {
    if (this._isServer) {
      fn();
    }
  }
}
