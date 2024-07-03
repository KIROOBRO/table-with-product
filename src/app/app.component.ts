import { Component, OnInit, Self } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PRODUCTS_TABLE_HEADERS } from '@core/constants/products-table-headers';
import { IProduct } from '@core/interfaces';
import { AddEditProductModalComponent } from '@core/modals/add-edit-product-modal/add-edit-product-modal.component';
import { PaginatedResponseModel } from '@core/models';
import { NgOnDestroy } from '@core/services';
import { ProductsService } from '@core/services/products.service';
import { filter, Observable, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [NgOnDestroy, MatSnackBar]
})
export class AppComponent implements OnInit {
  public PRODUCTS_TABLE_HEADERS = PRODUCTS_TABLE_HEADERS;

  public products$ = this.productsService.getProducts$();

  constructor(
    @Self() private readonly ngOnDestroy$: NgOnDestroy,
    private productsService: ProductsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initProducts().subscribe();
  }

  public openAddEditProductModal(product: IProduct | null = null): void {
    const dialogConfig = new MatDialogConfig<IProduct>();
    dialogConfig.autoFocus = false;
    dialogConfig.data = product;

    this.dialog
      .open(AddEditProductModalComponent, dialogConfig)
      .afterClosed()
      .pipe(
        filter(Boolean),
        takeUntil(this.ngOnDestroy$),
        switchMap((res: IProduct) => {
          if (res.id) {
            return this.productsService.patchProduct(res.id, res);
          }

          return this.productsService.postProduct(res);
        }),
        switchMap(() => this.initProducts())
      )
      .subscribe(() => {
        if (product?.id) {
          this.snackBar.open('The product has been edited!');

          return;
        }

        this.snackBar.open('The product has been added!');
      });
  }

  public openDeleteModal(productId: number): void {
    console.log(productId, 'productId');
  }

  private initProducts(): Observable<PaginatedResponseModel<IProduct>> {
    return this.productsService
      .getProducts()
      .pipe(takeUntil(this.ngOnDestroy$));
  }
}
