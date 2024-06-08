import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent {
  cadastroForm: FormGroup;
  tipoCadastro: string = '';

  constructor(private fb: FormBuilder) {
    this.cadastroForm = this.fb.group({
      email: [''],
      password: [''],
      tipoUsuario: [''],
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault(); // Evita o comportamento padrão de envio do formulário
    alert('Funciona ');
  }

  updateTipoCadastro(tipo: string): void {
    this.tipoCadastro = tipo;
  }

  updateEmail(email: string): void {
    this.cadastroForm.patchValue({ email: email });
  }
}
