import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Country, State} from './types';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private countries$: Observable<Country[]>;
  private states$: Observable<State[]>;

  constructor(private http: HttpClient) {
    this.countries$ = http.get<Country[]>('https://bookish-space-garbanzo-wqrg6rppjvjf5xgq-3000.app.github.dev/countries');
    this.states$ = http.get<State[]>('https://bookish-space-garbanzo-wqrg6rppjvjf5xgq-3000.app.github.dev/states');
  }

  getCountries(): Observable<Country[]> {
    return this.countries$;
  }

  getStates(id:string): Observable<State[]> {
    return this.http.get<State[]>(`https://bookish-space-garbanzo-wqrg6rppjvjf5xgq-3000.app.github.dev/states?countryCode=${id}`).pipe(
      map(data => data.sort((a,b)=> a.description > b.description ? 1: -1))
    )
  }
}
