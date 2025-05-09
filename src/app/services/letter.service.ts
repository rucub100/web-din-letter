import { computed, Injectable, signal, Signal } from '@angular/core';
import { DINInfoBlock, DINLetter } from '../models/DINLetter';
import { DINForm } from '../models/DINForm';
import { DINRefLine } from '../models/DINRefLine';

@Injectable({
  providedIn: 'root',
})
export class LetterService {
  private _dinLetter = signal<DINLetter>({
    form: 'B',
    address: {
      recipientDetails: '',
    },
    text: '',
  });

  public readonly dinLetter: Signal<DINLetter> = this._dinLetter.asReadonly();
  // flattened signals for easier access in templates
  public readonly form = computed(() => this._dinLetter().form);
  public readonly address = computed(() => this._dinLetter().address);
  public readonly infoBlock = computed(() => this._dinLetter().infoBlock);
  public readonly refLine = computed(() => this._dinLetter().refLine);
  public readonly text = computed(() => this._dinLetter().text);

  public setForm(form: DINForm): void {
    this._dinLetter.update((letter) => ({ ...letter, form }));
  }

  // setters for address fields
  public setSenderDetails(senderDetails: string): void {
    this._dinLetter.update((letter) => ({
      ...letter,
      address: { ...letter.address, senderDetails },
    }));
  }
  public setEndorsement(endorsement: string): void {
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

  public setRefLine(refLine: DINRefLine): void {
    this._dinLetter.update((letter) => ({ ...letter, refLine }));
  }

  public setText(text: string): void {
    this._dinLetter.update((letter) => ({ ...letter, text }));
  }
}
