import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';

export class AbstractHttpComponent {
  protected http = inject(HttpClient);

  public httpGetRequest<T>(url: string, params: Params = {}): Observable<T> {
    return this.http.get<T>(url, { params });
  }

  public httpPostRequest<T, U>(
    url: string,
    body: T,
    params: Params = {},
    options = {}
  ): Observable<U> {
    return this.http.post<U>(url, body, {
      params,
      ...options
    });
  }

  public httpPutRequest<T, U>(url: string, body: T): Observable<U> {
    return this.http.put<U>(url, body);
  }

  public httpPatchRequest<T, U>(url: string, body: T): Observable<U> {
    return this.http.patch<U>(url, body);
  }

  public httpDeleteRequest<T>(url: string): Observable<T> {
    return this.http.delete<T>(url);
  }
}
