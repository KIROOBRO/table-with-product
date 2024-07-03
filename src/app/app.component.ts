import { Component, OnInit, Self, TrackByFunction } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DELETE_PRODUCT, PRODUCTS_TABLE_HEADERS } from '@core/constants';
import { IProduct } from '@core/interfaces';
import { AddEditProductModalComponent } from '@core/modals/add-edit-product-modal/add-edit-product-modal.component';
import { ConfirmModalComponent } from '@core/modals/confirm-modal/confirm-modal.component';
import { ConfirmModalModel } from '@core/models';
import { NgOnDestroy, ProductsService } from '@core/services';
import { trackByFnById } from '@core/utils/functions';
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

  public trackByProducts: TrackByFunction<IProduct> = trackByFnById;

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
          this.snackBar.open('The product has been edited!', 'Success', {
            duration: 3000
          });

          return;
        }

        this.snackBar.open('The product has been added!', 'Success', {
          duration: 3000
        });
      });
  }

  public openDeleteModal(productId: number): void {
    const dialogConfig = new MatDialogConfig<ConfirmModalModel>();
    dialogConfig.autoFocus = false;
    dialogConfig.data = DELETE_PRODUCT;

    this.dialog
      .open(ConfirmModalComponent, dialogConfig)
      .afterClosed()
      .pipe(
        filter(Boolean),
        switchMap(() => this.productsService.deleteProduct(productId)),
        takeUntil(this.ngOnDestroy$)
      )
      .subscribe(() => {
        this.snackBar.open('The product has been deleted!', 'Success', {
          duration: 3000
        });
      });
  }

  private initProducts(): Observable<IProduct[]> {
    return this.productsService
      .getProducts()
      .pipe(takeUntil(this.ngOnDestroy$));
  }
}
