import { Component } from '@angular/core';
import { Navbar } from '../../../shared/components/navbar/navbar';
import { RouterOutlet } from '@angular/router';
import { Topbar } from '../../../shared/components/topbar/topbar';

@Component({
  selector: 'app-main-layout',
  imports: [Navbar, RouterOutlet, Topbar],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {}
