import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompaniesComponent } from './pages/companies/companies.component';
import { CountriesComponent } from './pages/countries/countries.component';
import { StatesComponent } from './pages/states/states.component';
import { LocationsComponent } from './pages/locations/locations.component';
import { LinesComponent } from './pages/lines/lines.component';
import { HttpClientModule } from '@angular/common/http';
import { PlantsComponent } from './pages/plants/plants.component';


@NgModule({
  declarations: [
    AppComponent,
    CompaniesComponent,
    CountriesComponent,
    StatesComponent,
    LocationsComponent,
    LinesComponent,
    PlantsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
        HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
