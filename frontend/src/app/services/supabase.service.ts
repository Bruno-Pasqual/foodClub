import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators'; // Importe 'map' do rxjs/operators
import { User } from '../models/Usuario';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabaseUrl = 'https://krjrlepfeiwkiydkjypo.supabase.co';
  private supabaseKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtyanJsZXBmZWl3a2l5ZGtqeXBvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMTMyMjE1MiwiZXhwIjoyMDI2ODk4MTUyfQ.dHHr5RQ7nyKdeyNFSssFZWkV0EqzesUAjqRK0AZC-7I';
  public supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
  }

  // Método para buscar usuários
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
            return null;
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

    //
  }
}
