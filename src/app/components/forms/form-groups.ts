import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { getGermanCurrentDate } from '../../utils';

export type AddressFormGroup = FormGroup<{
  senderDetailsEnabled: FormControl<boolean>;
  senderDetails: FormControl<string>;
  endorsementEnabled: FormControl<boolean>;
  endorsement: FormControl<string>;
  recipientDetails: FormControl<string>;
}>;

export function createAddressFormGroup(
  formBuilder: FormBuilder
): AddressFormGroup {
  return formBuilder.nonNullable.group({
    senderDetailsEnabled: [true],
    senderDetails: [
      { value: '', disabled: false },
      [Validators.required, Validators.maxLength(60)],
    ],
    endorsementEnabled: [false],
    endorsement: [{ value: '', disabled: true }, Validators.required],
    recipientDetails: [{ value: '', disabled: false }, Validators.required],
  });
}

export type InfoBlockFormGroup = FormGroup<{
  infoBlock: FormControl<string>;
}>;

export function createInfoBlockFormGroup(
  formBuilder: FormBuilder
): InfoBlockFormGroup {
  return formBuilder.nonNullable.group({
    infoBlock: [''],
  });
}

export type RefLineFormGroup = FormGroup<{
  column1Label: FormControl<string>;
  column1Value: FormControl<string>;
  column2Label: FormControl<string>;
  column2Value: FormControl<string>;
  column3Label: FormControl<string>;
  column3Value: FormControl<string>;
  dateColumn: FormControl<string>;
  dateLabel: FormControl<string>;
  dateValue: FormControl<string>;
}>;

export function createRefLineFormGroup(
  formBuilder: FormBuilder
): RefLineFormGroup {
  return formBuilder.nonNullable.group({
    column1Label: [''],
    column1Value: [''],
    column2Label: [''],
    column2Value: [''],
    column3Label: [''],
    column3Value: [''],
    dateColumn: ['date'],
    dateLabel: [{ value: 'Datum', disabled: true }],
    dateValue: [
      {
        value: getGermanCurrentDate(),
        disabled: true,
      },
    ],
  });
}

export type TextFormGroup = FormGroup<{
  subject: FormControl<string>;
  subjectBold: FormControl<boolean>;
  salutation: FormControl<string>;
  closing: FormControl<string>;
  company: FormControl<string>;
  signatory: FormControl<string>;
  enclosures: FormControl<boolean>;
}>;

export function createTextFormGroup(formBuilder: FormBuilder): TextFormGroup {
  return formBuilder.nonNullable.group({
    subject: [''],
    subjectBold: [false],
    salutation: [''],
    closing: [''],
    company: [''],
    signatory: [''],
    enclosures: [false],
  });
}
