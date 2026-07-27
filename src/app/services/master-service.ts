import { Injectable, Service, signal } from '@angular/core';
import { Breadcrumb } from '../core/models/breadcrumb';

@Injectable({ providedIn: 'root' })
export class MasterService {
  pageTitle = signal<string>('Dashboard');
  breadcrumbs = signal<Breadcrumb[]>([]);
}
