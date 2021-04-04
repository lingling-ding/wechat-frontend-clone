import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@app/core/declarations/user.interface';
import { environment } from '@app/env';
import { Observable } from 'rxjs';
import { RepositoryAbstract } from './repository.abstract';

export interface PasswordData {
  current_password?: string;
  password: string;
  password_confirmation: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserRepository extends RepositoryAbstract<User, User[]> {
  constructor(http: HttpClient) {
    super(`${environment.apiDomain}/users`, http);
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${environment.apiDomain}/current_user`);
  }
}
