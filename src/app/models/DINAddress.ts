export type DINAddress = {
  // return address
  senderDetails?: string;
  // endorsement area / optional endorsement line
  // up to 3 lines, reverse vertical line direction
  endorsement?: string;
  // address zone / recipient address area
  // up to 6 lines:
  // 1. name of the company
  // 2. salutation, if applicable, professional or official title
  // 3. if applicable, academic degrees (e.g. Dr., Dipl.-Ing.), name
  // 4. street/house number or PO box
  // 5. postal code and city
  // 6. country, if applicable
  recipientDetails: string;
};
