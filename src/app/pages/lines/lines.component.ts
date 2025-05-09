// src/app/pages/lines/lines.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { ApiService }        from '../../api.service';
import { Line }              from '../../models';

@Component({
  selector: 'app-lines',
  templateUrl: './lines.component.html'
})
export class LinesComponent implements OnInit {
  companyCode!: string;
  countryCode!: string;
  stateCode!: string;
  locationCode!: string;
  plantCode!: string;
  lines: Line[] = [];

  constructor(
    private route: ActivatedRoute,
    private api: ApiService
  ) {}

  ngOnInit() {
    // 1) Read codes from the URL
    this.companyCode  = this.route.snapshot.paramMap.get('companyCode')!;
    this.countryCode  = this.route.snapshot.paramMap.get('countryCode')!;
    this.stateCode    = this.route.snapshot.paramMap.get('stateCode')!;
    this.locationCode = this.route.snapshot.paramMap.get('locationCode')!;
    this.plantCode    = this.route.snapshot.paramMap.get('plantCode')!;

    // 2) Fetch the full tree once
    this.api.getCompanies().subscribe(all => {
      const comp = all.find(c => c.company_code === this.companyCode);
      if (!comp) return;

      const co = comp.countries.find(c => c.country_code === this.countryCode);
      if (!co) return;

      const st = co.states.find(s => s.state_code === this.stateCode);
      if (!st) return;

      const loc = st.locations.find(l => l.location_code === this.locationCode);
      if (!loc) return;

      const pl = loc.plants.find(p => p.plant_code === this.plantCode);
      if (!pl) return;

      // 3) Finally assign the lines array
      this.lines = pl.lines;
    });
  }
}
