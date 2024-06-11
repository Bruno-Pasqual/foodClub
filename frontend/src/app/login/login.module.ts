import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from '../components/pages/login/login.component';
import { CadastroComponent } from '../components/pages/cadastro/cadastro.component';
import { HomeComponent } from '../components/pages/home/home.component';
import { HeaderComponent } from '../components/header/header.component';
import { RouterModule } from '@angular/router';
import { ComofuncionaComponent } from '../components/comofunciona/comofunciona.component';

@NgModule({
  declarations: [
    LoginComponent,
    CadastroComponent,
    HomeComponent,
    HeaderComponent,
    ComofuncionaComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule, // Importando ReactiveFormsModule
  ],
  exports: [HeaderComponent],
})
export class LoginModule {}
