import { DINAddress } from './DINAddress';
import { DINForm } from './DINForm';
import { DINRefLine } from './DINRefLine';

export type DINInfoBlock = string;

export type DINLetter = {
  form: DINForm;
  address: DINAddress;
  infoBlock?: DINInfoBlock;
  refLine?: DINRefLine;
  // we may want to split this into subject, salutation, body, closing (with signature), Enclosure(s) and CC
  // TODO: multiple pages
  text: string;
  // TODO: TBD
  // header: unknown;
  // TODO: TBD
  // footer: unknown;
};
