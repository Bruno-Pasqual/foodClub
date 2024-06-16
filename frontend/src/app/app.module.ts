import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/pages/login/login.component';
import { LoginModule } from './login/login.module';
import { NavigationBarComponent } from './components/shared/navigation-bar/navigation-bar.component';
import { PaginaInicialComponent } from './components/pages/pagina-inicial/pagina-inicial.component';
import { InicioModule } from './modules/inicio/inicio.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, LoginModule, InicioModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
