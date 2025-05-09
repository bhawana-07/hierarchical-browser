import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Company } from './models';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiService {
  // This Observable will execute the HTTP GET only once,
  // then replay the last value to any new subscriber.
  private companies$!: Observable<Company[]>;

  constructor(private http: HttpClient) {}

  getCompanies(): Observable<Company[]> {
    if (!this.companies$) {
      this.companies$ = this.http
        .get<Company[]>('/api/companies')
        .pipe(shareReplay(1));
    }
    return this.companies$;
  }
}
