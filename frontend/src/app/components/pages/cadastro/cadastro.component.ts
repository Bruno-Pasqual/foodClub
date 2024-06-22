import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupabaseService } from '../../../services/supabase.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent {
  cadastroForm: FormGroup;
  tipoCadastro: string = '';

  constructor(private fb: FormBuilder, private supaService: SupabaseService) {
    this.cadastroForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      tipoUsuario: ['', [Validators.required]],
    });
  }

  onSubmit(event: Event): void {
    const { email, password, confirmPassword, tipoUsuario } =
      this.cadastroForm.value;

    if (this.cadastroForm.invalid || password != confirmPassword) {
      alert('Algo deu errado, verifique os campos e tente novamente');
    } else {
      event.preventDefault();
      this.supaService
        .createUser(email, password, tipoUsuario)
        .subscribe((res) => {
          console.log(res);
        });
    }
  }

  updateTipoCadastro(tipo: string): void {
    this.tipoCadastro = tipo;
  }
}
