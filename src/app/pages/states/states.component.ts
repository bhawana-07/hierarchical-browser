import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';
import { State } from '../../models';

@Component({
  selector: 'app-states',
  templateUrl: './states.component.html'
})
export class StatesComponent implements OnInit {
  companyCode!: string;
  countryCode!: string;
  states: State[] = [];

  constructor(
    private route: ActivatedRoute,
    private api: ApiService
  ) {}

  ngOnInit() {
    // 1. read the codes out of the URL
    this.companyCode = this.route.snapshot.paramMap.get('companyCode')!;
    this.countryCode = this.route.snapshot.paramMap.get('countryCode')!;

    // 2. fetch (or get cached) single companies tree
    this.api.getCompanies().subscribe(all => {
      // 3. find the one company by code
      const comp = all.find(c => c.company_code === this.companyCode)!;
      // 4. find the one country by code
      const co   = comp.countries.find((c:any) => c.country_code === this.countryCode)!;
      // 5. now take its states
      this.states = co.states;
      console.log(this.states)
    });
  }
}
