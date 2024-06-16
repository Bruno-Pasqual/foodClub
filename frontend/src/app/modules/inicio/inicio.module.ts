import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationBarComponent } from '../../components/shared/navigation-bar/navigation-bar.component';
import { PaginaInicialComponent } from '../../components/pages/pagina-inicial/pagina-inicial.component';

@NgModule({
  declarations: [NavigationBarComponent, PaginaInicialComponent],
  imports: [CommonModule],
  exports: [NavigationBarComponent, PaginaInicialComponent],
})
export class InicioModule {}
