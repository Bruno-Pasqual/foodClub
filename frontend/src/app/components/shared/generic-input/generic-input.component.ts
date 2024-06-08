import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-generic-input',
  templateUrl: './generic-input.component.html',
  styleUrls: ['./generic-input.component.css'], // Corrigido: styleUrl para styleUrls
})
export class GenericInputComponent {
  @Input() labelText: string = 'Título da label';
  @Input() placeholderText: string = 'Digite a sua entrada';
  @Input() typeOfInput: string = 'text'; // Corrigido: Text para text
}
