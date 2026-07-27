import { Component, inject, OnInit, signal } from '@angular/core';
import { MasterService } from '../../services/master-service';
import { ActivatedRoute } from '@angular/router';
import { InvoiceService } from '../../services/invoice-service';
import { Invoice } from '../../core/models/invoice';

@Component({
  selector: 'app-view-invoice',
  imports: [],
  templateUrl: './view-invoice.html',
  styleUrl: './view-invoice.css',
})
export class ViewInvoice implements OnInit {
  masterService = inject(MasterService);
  route = inject(ActivatedRoute);
  invoiceService = inject(InvoiceService);

  invoice = signal<Invoice | null>(null);

  ngOnInit(): void {
    // 1. Get the ID from the URL
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // 2. Call the service directly inside ngOnInit
    this.invoiceService.view(id).subscribe({
      next: (response) => {
        console.log(response.data.invoice_items);
        const invoiceData = response.data;
        this.invoice.set(invoiceData);
        console.log(this.invoice()?.invoice_items);

        // Update the header and breadcrumbs
        this.masterService.pageTitle.set("Invoice " + invoiceData.number);
        this.masterService.breadcrumbs.set([
          { label: 'All Invoices', url: '/invoice-list' },
          { label: invoiceData.number, url: '#' }
        ]);
      },
      error: (err) => console.error(err)
    });
  }
}
