export function getGermanCurrentDate() {
  return new Date().toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export function replaceSenderDetailsDelimiters(senderDetails: string): string {
  return senderDetails.replaceAll(/-/g, '•');
}
