import { Injectable } from '@angular/core';
import { AbstractHttpComponent } from '@core/abstracts/abstract-http-component';
import { IProduct } from '@core/interfaces';
import { PaginatedResponseModel } from '@core/models';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends AbstractHttpComponent {
  private productsSubject: BehaviorSubject<PaginatedResponseModel<IProduct> | null> =
    new BehaviorSubject<PaginatedResponseModel<IProduct> | null>(null);

  public getProducts$(): Observable<PaginatedResponseModel<IProduct> | null> {
    return this.productsSubject.asObservable();
  }

  public getProducts(): Observable<PaginatedResponseModel<IProduct>> {
    return this.httpGetRequest<PaginatedResponseModel<IProduct>>(
      'api/products/'
    ).pipe(tap((products) => this.productsSubject.next(products)));
  }

  public postProduct(product: IProduct): Observable<any> {
    return this.httpPostRequest('api/products/', product);
  }

  public patchProduct(id: number, product: IProduct): Observable<any> {
    return this.httpPatchRequest(`api/products/${id}/`, product);
  }

  public deleteProduct(id: number): Observable<void> {
    return this.httpDeleteRequest(`api/products/${id}/`);
  }
}
