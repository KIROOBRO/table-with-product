import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from '@core/components/table/table.module';
import { ApiInterceptor } from '@core/interceptors/api.interceptor';
import { AddEditProductModalModule } from '@core/modals/add-edit-product-modal/add-edit-product-modal.module';
import { ConfirmModalModule } from '@core/modals/confirm-modal/confirm-modal.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TableModule,
    MatButtonModule,
    AddEditProductModalModule,
    MatIconModule,
    ConfirmModalModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
