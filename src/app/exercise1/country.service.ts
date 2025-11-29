import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Country {
    description: string,
    id: string
}

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  countryData$ : Observable<Country[]>;

  constructor(private http:HttpClient) {
    this.countryData$ = this.http.get<Country[]>('https://bookish-space-garbanzo-wqrg6rppjvjf5xgq-3000.app.github.dev/countries');
   }

  getCountryData() : Observable<Country[]>{
    return this.countryData$;
  }
}
