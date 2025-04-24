export type DINForm = 'A' | 'B';

export function isDINForm(value: string): value is DINForm {
  return value === 'A' || value === 'B';
}
