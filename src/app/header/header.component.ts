import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private service: AppService) { }

  ngOnInit() {
  }

  newEmployee() {
    this.router.navigate(['/newEmployee']);
  }

  searchEmployee() {
    this.router.navigate(['/search']);
  }



}
