import { Component, input } from '@angular/core';
import { DINAddress } from '../../../models/DINAddress';

@Component({
  selector: 'app-address-field',
  imports: [],
  template: `
    <div
      class="flex flex-col w-[85mm] h-[45mm] pl-[5mm] bg-[rgba(127,127,127,0.04)] print:bg-transparent rounded-[3mm] select-none"
    >
      @let currentAddress = address();
      <!-- Rücksendeangabe -->
      <div class="h-[5mm] text-[8pt] leading-normal">
        @if(currentAddress.senderDetails) {
        <span>{{ currentAddress.senderDetails }}</span>
        } @else if (!currentAddress.recipientDetails) {
        <!-- Placeholder -->
        <span class="opacity-50 print:hidden"
          >Klaus Fischer • Am Bahnhof 5 • 20095 Hamburg</span
        >
        }
      </div>
      <!-- Zusatz- und Vermerkzone -->
      <div class="h-[12.7mm] flex flex-col-reverse">
        @if(currentAddress.endorsement) { @for(line of
        currentAddress.endorsement.split('\\n'); track line) {
        <span>{{ line }}</span>
        } } @else if (!currentAddress.recipientDetails) {
        <!-- Placeholder -->
        <span class="opacity-50 print:hidden">Einschreiben</span>
        }
      </div>
      <!-- Anschriftzone -->
      <div class="h-[27.3mm] flex flex-col">
        @if (currentAddress.recipientDetails) { @for(line of
        currentAddress.recipientDetails.split('\\n'); track line) {
        <span>{{ line }}</span>
        } } @else {
        <!-- Placeholder -->
        <span class="opacity-50 print:hidden">Musterfirma GmbH</span>
        <span class="opacity-50 print:hidden">Frau Richterin</span>
        <span class="opacity-50 print:hidden">Dr. Sabine Meier</span>
        <span class="opacity-50 print:hidden">Hauptstraße 123</span>
        <span class="opacity-50 print:hidden">10115 Berlin</span>
        <!-- <span class="opacity-50 print:hidden">(DEUTSCHLAND)</span> -->
        }
      </div>
    </div>
  `,
})
export class AddressFieldComponent {
  address = input.required<DINAddress>();
}
