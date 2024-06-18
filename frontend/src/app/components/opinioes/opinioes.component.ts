import { Component, OnInit, HostListener } from '@angular/core';
interface IOpiniao {
  imagem: string;
  texto: string;
  nome: string;
}

@Component({
  selector: 'app-opinioes',
  templateUrl: './opinioes.component.html',
  styleUrl: './opinioes.component.css',
  host: {
    '[style.--index]': 'currentIndex'
  }
})



export class OpinioesComponent implements OnInit{
  
  opinioes: IOpiniao[] = [
    {
      imagem: '../../../assets/imgs/foto-empresa.svg',
      texto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.',
      nome: 'João Silva - 1'
    },
    {
      imagem: '../../../assets/imgs/foto-empresa.svg',
      texto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.',
      nome: 'João Silva - 2'
    },
    {
      imagem: '../../../assets/imgs/foto-empresa.svg',
      texto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.',
      nome: 'João Silva - 3'
    },
    {
      imagem: '../../../assets/imgs/foto-empresa.svg',
      texto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.',
      nome: 'João Silva - 4'
    },
    {
      imagem: '../../../assets/imgs/foto-empresa.svg',
      texto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.',
      nome: 'João Silva - 5'
    },
    {
      imagem: '../../../assets/imgs/foto-empresa.svg',
      texto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.',
      nome: 'João Silva - 6'
    },
    // ...
  ];

  currentIndex = 0;
  initialX: number = 0;
  initialIndex: number = 0;
  dragging = false;

  constructor() {}

  ngOnInit(): void {}

  onDragStart(event: TouchEvent | MouseEvent): void {
    this.dragging = true;
    this.initialX = this.getEventX(event);
    this.initialIndex = this.currentIndex;
  }

  onDragMove(event: TouchEvent | MouseEvent): void {
    if (!this.dragging) return;
    
    const currentX = this.getEventX(event);
    const deltaX = currentX - this.initialX;

    if (deltaX > 50 && this.currentIndex > 0) {
      this.currentIndex = this.initialIndex - 1;
      this.dragging = false;
    } else if (deltaX < -50 && this.currentIndex < this.opinioes.length - 1) {
      this.currentIndex = this.initialIndex + 1;
      this.dragging = false;
    }
  }

  onDragEnd(event: TouchEvent | MouseEvent): void {
    this.dragging = false;
  }

  getEventX(event: TouchEvent | MouseEvent): number {
    if (event instanceof TouchEvent) {
      return event.touches[0].clientX;
    } else {
      return event.clientX;
    }
  }
}
