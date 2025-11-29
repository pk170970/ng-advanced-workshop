import { Component } from '@angular/core';
import { Observable, combineLatest, debounceTime, map, startWith, withLatestFrom } from 'rxjs';
import { Country, State } from './types';
import { CountryService } from './country.service';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-exercise3',
  templateUrl: './exercise3.component.html',
  styleUrls: ['./exercise3.component.css']
})
export class Exercise3Component {

  countries$: Observable<Country[]>;
  states$: Observable<State[]>;
  country!: Country;
  state!: State;
  countryInput = new FormControl<string>('');

  constructor(private service: CountryService) {
    // this.countries$ = this.countryInput.valueChanges.pipe(
    //   withLatestFrom(this.service.getCountries()),
    //   map(([searchInput, countries]) => {
    //     const term = searchInput.toLowerCase();
    //     if(!term) return countries;
    //     return countries.filter(country => country.description.toLowerCase().includes(term))
    //   })
    // )

    this.countries$ = combineLatest([
      this.service.getCountries(),
      this.countryInput.valueChanges.pipe(
        startWith(''),
      )
    ]).pipe(
      map(([countries, searchInput]) => {
        const term = searchInput.toLowerCase();
        if (!term) return countries;
        return countries.filter(country => country.description.toLowerCase().includes(term))
      })
    )
  }

  updateStates(country: Country) {
    // this.country = country;
    this.countryInput.setValue(country.description);
    this.states$ = this.service.getStatesFor(country.id);
  }
}
