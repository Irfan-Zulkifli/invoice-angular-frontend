import { Routes } from '@angular/router';
import { MainLayout } from './layouts/components/main-layout/main-layout';
import { NotFound } from './layouts/components/not-found/not-found';
import { InvoiceList } from './features/invoice-list/invoice-list';
import { CreateInvoice } from './features/create-invoice/create-invoice';
import { ViewInvoice } from './features/view-invoice/view-invoice';
import { UpdateInvoice } from './features/update-invoice/update-invoice';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        redirectTo: 'invoice-list',
        pathMatch: 'full'
      },
      {
        path: 'invoice-list',
        component: InvoiceList,
      },
      {
        path: 'create-invoice',
        component: CreateInvoice,
      },
      {
        path: 'view-invoice/:id',
        component: ViewInvoice
      },
      {
        path: 'edit-invoice/:id',
        component: UpdateInvoice
      }
    ]
  },
  {
    path: '**',
    component: NotFound,
  }
];
