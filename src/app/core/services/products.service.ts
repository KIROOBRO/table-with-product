import { Injectable } from '@angular/core';
import { AbstractHttpComponent } from '@core/abstracts/abstract-http-component';
import { IProduct } from '@core/interfaces';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends AbstractHttpComponent {
  private productsSubject: BehaviorSubject<IProduct[] | null> =
    new BehaviorSubject<IProduct[] | null>(null);

  public getProducts$(): Observable<IProduct[] | null> {
    return this.productsSubject.asObservable();
  }

  public getProducts(): Observable<IProduct[]> {
    return this.httpGetRequest<IProduct[]>('api/products/').pipe(
      tap((products) => this.productsSubject.next(products))
    );
  }

  public postProduct(product: IProduct): Observable<IProduct> {
    return this.httpPostRequest('api/products/', product);
  }

  public patchProduct(id: number, product: IProduct): Observable<IProduct> {
    return this.httpPatchRequest(`api/products/${id}/`, product);
  }

  public deleteProduct(id: number): Observable<void> {
    return this.httpDeleteRequest(`api/products/${id}/`);
  }
}
