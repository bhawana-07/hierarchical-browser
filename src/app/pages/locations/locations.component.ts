// src/app/locations/locations.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { ApiService }        from '../../api.service';
import { Location }          from '../../models';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html'
})
export class LocationsComponent implements OnInit {
  companyCode!: string;
  countryCode!: string;
  stateCode!: string;
  locations: Location[] = [];

  constructor(
    private route: ActivatedRoute,
    private api: ApiService
  ) {}

  ngOnInit() {
    // 1) Pull the codes from the URL exactly as you named them in your routes:
    this.companyCode = this.route.snapshot.paramMap.get('companyCode')!;
    this.countryCode = this.route.snapshot.paramMap.get('countryCode')!;
    this.stateCode   = this.route.snapshot.paramMap.get('stateCode')!;

    // 2) Fetch (or get cached) the full companies tree once
    this.api.getCompanies().subscribe((all) => {
      // 3) Find the matching company by its code
      const comp = all.find(c => c.company_code === this.companyCode);
      if (!comp) return;

      // 4) Within that company, find the country by its code
      const co = comp.countries.find(x => x.country_code === this.countryCode);
      if (!co) return;

      // 5) Within that country, find the state by its code
      const st = co.states.find(x => x.state_code === this.stateCode);
      if (!st) return;

      // 6) Now grab the locations array
      this.locations = st.locations;
    });
  }
}
