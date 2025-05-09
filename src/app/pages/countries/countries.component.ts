import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { ApiService }        from '../../api.service';
import { Country }           from '../../models';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html'
})
export class CountriesComponent implements OnInit {
  companyCode!: string;
  countries: Country[] = [];

  constructor(
    private route: ActivatedRoute,
    private api: ApiService
  ) {}

  ngOnInit() {
    // Pull the same name you used in the route: ":companyCode"
    this.companyCode = this.route.snapshot.paramMap.get('companyCode')!;

    // Filter the single companies payload down to this company’s countries
    this.api.getCompanies().subscribe(data => {
      const comp = data.find((c:any) => c.company_code === this.companyCode);
      this.countries = comp?.countries ?? [];
    });
  }
}
