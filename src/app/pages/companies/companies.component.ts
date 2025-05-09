// src/app/companies/companies.component.ts
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Company } from '../../models';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html'
})
export class CompaniesComponent implements OnInit {
  companies: Company[] = [];
  constructor(private api: ApiService) {}
  ngOnInit() {
    this.api.getCompanies().subscribe(data => (this.companies = data));
  }
}
