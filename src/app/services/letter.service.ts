import {
  computed,
  effect,
  inject,
  Injectable,
  signal,
  Signal,
} from '@angular/core';
import { DINInfoBlock, DINLetter } from '../models/DINLetter';
import { DINForm } from '../models/DINForm';
import { DINRefLine } from '../models/DINRefLine';
import { PlatformService } from './platform.service';

@Injectable({
  providedIn: 'root',
})
export class LetterService {
  private readonly _localStorageKey = 'letter';
  private readonly _defaultLetter: DINLetter = {
    form: 'B',
    address: {
      senderDetails: undefined,
      endorsement: undefined,
      recipientDetails: '',
    },
    infoBlock: undefined,
    refLine: undefined,
    text: '',
  };

  private _platformService = inject(PlatformService);
  private _dinLetter = signal<DINLetter>(
    (this._platformService.isBrowser &&
      localStorage.getItem(this._localStorageKey) &&
      JSON.parse(localStorage.getItem(this._localStorageKey)!)) ||
      this._defaultLetter
  );

  public readonly dinLetter: Signal<DINLetter> = this._dinLetter.asReadonly();
  // flattened signals for easier access in templates
  public readonly form = computed(() => this._dinLetter().form);
  public readonly address = computed(() => this._dinLetter().address);
  public readonly infoBlock = computed(() => this._dinLetter().infoBlock);
  public readonly refLine = computed(() => this._dinLetter().refLine);
  public readonly text = computed(() => this._dinLetter().text);

  constructor() {
    if (this._platformService.isBrowser) {
      effect(() => {
        localStorage.setItem(
          this._localStorageKey,
          JSON.stringify(this._dinLetter())
        );
      });
    }
  }

  public setForm(form: DINForm): void {
    this._dinLetter.update((letter) => ({ ...letter, form }));
  }

  // setters for address fields
  public setSenderDetails(senderDetails: string | undefined): void {
    this._dinLetter.update((letter) => ({
      ...letter,
      address: { ...letter.address, senderDetails },
    }));
  }
  public setEndorsement(endorsement: string | undefined): void {
    this._dinLetter.update((letter) => ({
      ...letter,
      address: { ...letter.address, endorsement },
    }));
  }
  public setRecipientDetails(recipientDetails: string): void {
    this._dinLetter.update((letter) => ({
      ...letter,
      address: { ...letter.address, recipientDetails },
    }));
  }

  public setInfoBlock(infoBlock: DINInfoBlock): void {
    this._dinLetter.update((letter) => ({ ...letter, infoBlock }));
  }

  public removeInfoBlock(): void {
    this._dinLetter.update((letter) => {
      const { infoBlock, ...rest } = letter;
      return { ...rest, infoBlock: undefined };
    });
  }

  public setRefLine(refLine: DINRefLine): void {
    this._dinLetter.update((letter) => ({ ...letter, refLine }));
  }

  public removeRefLine(): void {
    this._dinLetter.update((letter) => {
      const { refLine, ...rest } = letter;
      return { ...rest, refLine: undefined };
    });
  }

  public setText(text: string): void {
    this._dinLetter.update((letter) => ({ ...letter, text }));
  }

  public reset(): void {
    this._platformService.runInBrowser(() => {
      localStorage.removeItem(this._localStorageKey);
    });

    this._dinLetter.set(this._defaultLetter);
  }
}
