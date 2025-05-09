// src/app/app-routing.module.ts
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CompaniesComponent }  from './pages/companies/companies.component';
import { CountriesComponent }  from './pages/countries/countries.component';
import { StatesComponent }     from './pages/states/states.component';
import { LocationsComponent }  from './pages/locations/locations.component';
import { PlantsComponent }     from './pages/plants/plants.component';
import { LinesComponent }      from './pages/lines/lines.component';

const routes: Routes = [
  // 1) Full list of companies
  { path: '', component: CompaniesComponent },

  // 2) After clicking a company (e.g. /Coke) → list its countries
  { path: ':companyCode', component: CountriesComponent },

  // 3) After clicking a country (e.g. /Coke/IN) → list its states
  { path: ':companyCode/:countryCode', component: StatesComponent },

  // 4) After clicking a state (e.g. /Coke/IN/UP) → list its locations
  { path: ':companyCode/:countryCode/:stateCode', component: LocationsComponent },

  // 5) After clicking a location (e.g. /Coke/IN/UP/FZ) → list its plants
  { path: ':companyCode/:countryCode/:stateCode/:locationCode', component: PlantsComponent },

  // 6) After clicking a plant (e.g. /Coke/IN/UP/FZ/DS) → list its lines
  { path: ':companyCode/:countryCode/:stateCode/:locationCode/:plantCode', component: LinesComponent },

  // 7) Fallback to companies
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
