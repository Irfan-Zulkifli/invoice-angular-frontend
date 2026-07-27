import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Invoice } from '../../core/models/invoice';
import { HttpClient } from '@angular/common/http';
import { PaginatedResponse } from '../../core/models/paginated-response';
import { InvoiceService } from '../../services/invoice-service';
import { MasterService } from '../../services/master-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-invoice-list',
  imports: [RouterLink],
  templateUrl: './invoice-list.html',
  styleUrl: './invoice-list.css',
})
export class InvoiceList implements OnInit {

  // Have a variable that store array of invoices
  paginatedInvoices = signal<PaginatedResponse<Invoice> | null>(null);
  invoices: WritableSignal<Invoice[]> = signal([]);

  private invoiceService = inject(InvoiceService);

  private masterService = inject(MasterService);

  router = inject(Router);

  http = inject(HttpClient);

  ngOnInit() {
    this.masterService.pageTitle.set('All Invoices');
    this.masterService.breadcrumbs.set([
      {
        label: 'All Invoices',
        url: '#'
      }
    ]);
    this.getAllInvoices();
  }

  getAllInvoices(page: number = 1) {
    this.invoiceService.getInvoices(page).subscribe({
      next: (res: PaginatedResponse<Invoice>) => {
        this.paginatedInvoices.set(res);
        console.log(this.paginatedInvoices())
      },
      error: (err: any) => {
        console.error('Error fetching invoices:', err);
      }
    })
  }

  viewInvoice(id: number=0) {
    this.router.navigate(['/view-invoice', id]);
  }

  changePage(url: string | null) {
    if (!url) return;

    // find the page number inside url
    const match = url.match(/page=(\d+)/);
    if (match) {
      this.getAllInvoices(Number(match[1]));
    }
  }

  deleteInvoice(id: number = 0) {

    let isConfirm: boolean = confirm('test');

    if (isConfirm) {
      this.invoiceService.delete(id).subscribe({
        next: (res: any) => {
          alert(res.message)
          this.getAllInvoices();
        },
        error: (err) => {
          alert(err.error);
          this.getAllInvoices();
        }
      })
    }
  }
}
