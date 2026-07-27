import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../services/master-service';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InvoiceService } from '../../services/invoice-service';
import { Invoice } from '../../core/models/invoice';

@Component({
  selector: 'app-create-invoice',
  imports: [ReactiveFormsModule],
  templateUrl: './create-invoice.html',
  styleUrl: './create-invoice.css',
})
export class CreateInvoice implements OnInit {
  masterService = inject(MasterService);
  invoiceService = inject(InvoiceService);
  router = inject(Router);
  fb = inject(FormBuilder);

  invoiceForm!: FormGroup;
  submitted = false;

  ngOnInit(): void {
    this.masterService.pageTitle.set("Create Invoice");
    this.masterService.breadcrumbs.set([
      { label: "Create Invoice", url: '#' }
    ]);

    this.initForm();
  }

  initForm() {
    this.invoiceForm = this.fb.group({
      customer_name: ['', Validators.required],
      number: ['', Validators.required],
      date: ['', Validators.required],
      reference: [''],
      invoice_items: this.fb.array([this.createItem()])
    });
  }

  get invoiceItems(): FormArray {
    return this.invoiceForm.get('invoice_items') as FormArray;
  }

  createItem(): FormGroup {
    return this.fb.group({
      product_name: ['', Validators.required],
      unit_price: [0, [Validators.required, Validators.min(0)]],
      quantity: [1, [Validators.required, Validators.min(1)]]
    });
  }

  addItem() {
    this.invoiceItems.push(this.createItem());
  }

  removeItem(index: number) {
    this.invoiceItems.removeAt(index);
  }

  submitForm() {
    this.submitted = true;

    // Check if the form is valid and if there is at least one item
    if (this.invoiceForm.invalid || this.invoiceItems.length === 0) {
      this.invoiceForm.markAllAsTouched();
      return;
    }

    // Calculate total amount for each item before saving
    const payload: any = this.invoiceForm.value; // Use 'any' temporarily so TS doesn't complain about mapping
    payload.invoice_items = payload.invoice_items?.map((item: any) => ({
      ...item,
      total_amount: item.unit_price * item.quantity
    }));

    console.log(payload);

    this.invoiceService.store(payload).subscribe({
      next: () => {
        alert("Invoice created successfully!");
        this.router.navigate(['/invoice-list']);
      },
      error: (err) => {
        console.error("Error saving invoice", err.message);
        alert("Failed to save invoice.");
      }
    });
  }
}
