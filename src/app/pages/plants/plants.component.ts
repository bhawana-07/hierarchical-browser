import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { ApiService }        from '../../api.service';
import { Plant }             from '../../models';

@Component({
  selector: 'app-plants',
  templateUrl: './plants.component.html'
})
export class PlantsComponent implements OnInit {
  companyCode!: string;
  countryCode!: string;
  stateCode!: string;
  locationCode!: string;
  plants: Plant[] = [];

  constructor(
    private route: ActivatedRoute,
    private api: ApiService
  ) {}

  ngOnInit() {
    // 1) Read all the codes from the URL
    this.companyCode  = this.route.snapshot.paramMap.get('companyCode')!;
    this.countryCode  = this.route.snapshot.paramMap.get('countryCode')!;
    this.stateCode    = this.route.snapshot.paramMap.get('stateCode')!;
    this.locationCode = this.route.snapshot.paramMap.get('locationCode')!;

    // 2) Fetch (or get cached) the full nested tree
    this.api.getCompanies().subscribe(all => {
      // 3) Drill down by code at each level
      const comp = all.find(c => c.company_code === this.companyCode);
      if (!comp) return;

      const co = comp.countries.find(c => c.country_code === this.countryCode);
      if (!co) return;

      const st = co.states.find(s => s.state_code === this.stateCode);
      if (!st) return;

      const loc = st.locations.find(l => l.location_code === this.locationCode);
      if (!loc) return;

      // 4) Finally assign the plants array
      this.plants = loc.plants;
    });
  }
}
