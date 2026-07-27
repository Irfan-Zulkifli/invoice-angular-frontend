import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../services/master-service';
import { InvoiceService } from '../../services/invoice-service';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-invoice',
  imports: [ReactiveFormsModule],
  templateUrl: './update-invoice.html',
  styleUrl: './update-invoice.css',
})
export class UpdateInvoice implements OnInit {
  masterService = inject(MasterService);
  invoiceService = inject(InvoiceService);
  fb = inject(FormBuilder);
  invoiceForm !: FormGroup;
  route = inject(ActivatedRoute);
  router = inject(Router);
  submitted: boolean = false;
  id!: number;

  ngOnInit(): void {
    this.initForm();
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.invoiceService.view(this.id).subscribe({
      next: (response) => {
        const invoiceData = response.data;
        if (invoiceData.invoice_items) {
          invoiceData.invoice_items.forEach(line => {
            const row = this.createItem();
            this.invoiceItems.push(row);
          });
        }
        this.invoiceForm.patchValue(invoiceData);
      },
      error: (err) => {
        console.error(err);
      }
    })
    this.masterService.pageTitle.set("Edit Invoice");
    this.masterService.breadcrumbs.set([
      { label: 'All Invoices', url: '/invoice-list' },
      { label: "Edit Invoice", url: '#' }
    ]);
  }

  initForm() {
    this.invoiceForm = this.fb.group({
      customer_name: ['', Validators.required],
      number: ['', Validators.required],
      date: ['', Validators.required],
      reference: [''],
      invoice_items: this.fb.array([])
    });
  }

  get invoiceItems(): FormArray {
    return this.invoiceForm.get('invoice_items') as FormArray;
  }

  createItem() {
    return this.fb.group({
      product_name: ['', Validators.required],
      unit_price: [0, [Validators.required, Validators.min(0)]],
      quantity: [1, [Validators.required, Validators.min(1)]]
    })
  }

  addItem() {
    this.invoiceItems.push(this.createItem());
  }

  removeItem(index: number) {
    this.invoiceItems.removeAt(index);
  }

  submitForm() {
    this.submitted = true;

    if (this.invoiceForm.invalid || this.invoiceItems.length === 0) {
      this.invoiceForm.markAllAsTouched();
      return;
    }

    const payload: any = this.invoiceForm.value;
    payload.invoice_items = payload.invoice_items?.map((item: any) => ({
      ...item,
      total_amount: item.unit_price * item.quantity
    }));

    console.log(payload);

    this.invoiceService.update(this.id, payload).subscribe({
      next: (res: any) => {
        alert(res.message);
        this.router.navigate(['/invoice-list'])
      },
      error: (err) => {
        if (err.status === 422) {

          const validationErrors = err.error.errors;

          if (validationErrors.number) {
            const errorMessage = validationErrors.number[0];

            console.error(errorMessage);

            alert(errorMessage);
          }
        } else {
          alert("Something went wrong!");
        }
      }
    })
  }


}
