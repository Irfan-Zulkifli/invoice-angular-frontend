import { inject, Injectable, Service } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedResponse } from '../core/models/paginated-response';
import { Invoice } from '../core/models/invoice';

@Injectable({ providedIn: 'root' })
export class InvoiceService {
  private apiUrl = `${environment.baseUrl}/invoices`;

  http = inject(HttpClient);

  getInvoices(page: number = 1, sort: string = 'created_at', direction: string = 'asc'): Observable<PaginatedResponse<Invoice>> {

    let params = new HttpParams()
      .set('page', page.toString())
      .set('sort', sort)
      .set('direction', direction);

    return this.http.get<PaginatedResponse<Invoice>>(this.apiUrl, { params })
  }

  store(invoice: Invoice): Observable<{ message: string, success: boolean, data: Invoice }> {
    return this.http.post<{ message: string, success: boolean, data: Invoice }>(this.apiUrl, invoice);
  }

  view(id: number): Observable<{ message: string, success: boolean, data: Invoice }> {
    return this.http.get<{ message: string, success: boolean, data: Invoice }>(`${this.apiUrl}/${id}`);
  }

  update(id: number, invoice: Invoice): Observable<{ message: string, data: Invoice }> {
    return this.http.put<{ message: string, data: Invoice }>(`${this.apiUrl}/${id}`, invoice);
  }

  delete(id: number): Observable<{ message: string, success: boolean }> {
    return this.http.delete<{ message: string, success: boolean }>(`${this.apiUrl}/${id}`);
  }
}

