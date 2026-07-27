import { InvoiceItem } from "./invoice-item";

export interface Invoice {
  id?: number;
  number: string;
  date: string;
  reference: string;
  customer_name: string;

  invoice_items?: InvoiceItem[];
}
