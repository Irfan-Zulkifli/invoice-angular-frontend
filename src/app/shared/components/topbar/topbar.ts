import { Component, inject } from '@angular/core';
import { MasterService } from '../../../services/master-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-topbar',
  imports: [RouterLink],
  templateUrl: './topbar.html',
  styleUrl: './topbar.css',
})
export class Topbar {
  masterService = inject(MasterService);

}
