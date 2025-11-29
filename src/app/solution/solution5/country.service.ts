import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Country, State} from './types';
import {map} from 'rxjs/operators';
import { COUNTRY_API_URL, STATE_API_URL } from 'src/app/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private countries$: Observable<Country[]>;

  constructor(private http: HttpClient) {
    this.countries$ = http.get<Country[]>(COUNTRY_API_URL);
  }

  getCountries(): Observable<Country[]> {
    return this.countries$;
  }

  getStatesFor(countryId: string): Observable<State[]> {
    return this.http.get<State[]>(`${STATE_API_URL}?countryCode=${countryId}`)
      .pipe(
        map(states => states.sort((a, b) => (a.description > b.description) ? 1 : -1))
      );
  }
}
