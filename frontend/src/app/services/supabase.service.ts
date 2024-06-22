import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/Usuario';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabaseUrl = 'https://krjrlepfeiwkiydkjypo.supabase.co';
  private supabaseKey = 'YOUR_SUPABASE_KEY';
  public supabase: SupabaseClient;

  constructor() {
    console.log('SupabaseService is being initialized');
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
    console.log('Supabase client created');
  }

  fetchUsuarios(): Observable<User[]> {
    return from(
      this.supabase
        .from('tusuario')
        .select('*')
        .then(({ data }) => data as User[])
    );
  }

  fetchUserByEmail(email: string): Observable<any> {
    return from(
      this.supabase
        .from('tusuario')
        .select('*')
        .eq('email_usuario', email)
        .single()
        .then(({ data, error }) => {
          if (error) {
            console.error('Error fetching user by email:', error);
            return null;
          }
          return data;
        })
    );
  }

  createUser(
    email: string,
    password: string,
    tipoUsuario: string
  ): Observable<any> {
    const createUserPromise = this.supabase
      .from('tusuario')
      .insert([
        {
          email_usuario: email,
          tipo_usuario: tipoUsuario,
          senha_usuario: password,
        },
      ])
      .select();

    return from(createUserPromise).pipe(
      map(({ data, error }) => {
        if (error) {
          console.error('Error creating user:', error);
          throw new Error(error.message);
        }
        return data;
      })
    );
  }

  confirmLoggin(email: string, password: string): Observable<boolean> {
    return this.fetchUserByEmail(email).pipe(
      map((res: any) => {
        if (res != null) {
          return res.senha_usuario === password;
        }
        return false;
      })
    );
  }
}
