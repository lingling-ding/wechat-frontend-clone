import { HttpClient } from '@angular/common/http';
import { Directive } from '@angular/core';
import { Identifiable } from '@app/interfaces/identifiable';
import { Observable } from 'rxjs';

export interface Information {
  title: string;
  detail: string;
}

@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class RepositoryAbstract<T extends Identifiable, K> {
  readonly BASE_URL: string;

  protected constructor(private baseUrl, protected http: HttpClient) {
    this.BASE_URL = this.baseUrl;
  }

  findAll(params = {}): Observable<K> {
    return this.http.get<K>(this.BASE_URL, { params });
  }

  search(params = {}): Observable<T[]> {
    return this.http.get<T[]>(`${this.BASE_URL}/search`, { params });
  }

  findById(id: number): Observable<T> {
    return this.http.get<T>(`${this.BASE_URL}/${id}`);
  }

  create(entity: T): Observable<T> {
    return this.http.post<T>(this.BASE_URL, entity);
  }

  update(entity: T): Observable<T> {
    return this.http.patch<T>(`${this.BASE_URL}/${entity.id}`, entity);
  }

  delete(id: number): Observable<unknown> {
    return this.http.delete(`${this.BASE_URL}/${id}`);
  }
}
