import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css'],
})
export class NavigationBarComponent {
  @Input() paginaAtual: string;
  @Output() paginaAtualChange = new EventEmitter<string>();

  constructor() {
    this.paginaAtual = '';
  }

  updatePaginaAtiva(paginaAtual: string) {
    this.paginaAtual = paginaAtual;
    this.paginaAtualChange.emit(this.paginaAtual);
  }
}
