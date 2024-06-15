import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/pages/login/login.component';
import { LoginModule } from './login/login.module';
import { NavigationBarComponent } from './components/shared/navigation-bar/navigation-bar.component';
import { InicioComponent } from './modules/inicio/inicio.component';

@NgModule({
  declarations: [AppComponent, NavigationBarComponent, InicioComponent],
  imports: [BrowserModule, AppRoutingModule, LoginModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
