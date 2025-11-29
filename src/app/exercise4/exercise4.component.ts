import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { Country, State } from './types';
import { FormControl } from '@angular/forms';
import { CountryService } from './country.service';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-exercise4',
  templateUrl: './exercise4.component.html',
  styleUrls: ['./exercise4.component.css']
})
export class Exercise4Component {

  countries$: Observable<Country[]>;
  states$: Observable<State[]> = this.service.getStatesFor('');
  state!: State;
  countryControl = new FormControl<string>('');
  stateControl = new FormControl<string>({ value: '', disabled: true });

  constructor(private service: CountryService) {
    this.countries$ = combineLatest([
      this.service.getCountries(),
      this.countryControl.valueChanges.pipe(
        startWith('')
      )
    ]).pipe(
      map(([countries, countryInput]) => countries.filter(c => c.description.toLowerCase().indexOf((countryInput ?? "").toLowerCase()) !== -1))
    );
  }

  updateStates(country: Country) {
    this.countryControl.setValue(country.description);
    this.stateControl.enable();

    this.states$ = combineLatest([
      this.service.getStatesFor(country.id),
      this.stateControl.valueChanges.pipe(
        startWith('')
      ),
    ]).pipe(
      map(([states, stateInput]) => {
        return states.filter(state => state.description.toLowerCase().indexOf(stateInput.toLowerCase() ?? "") !== -1)
      })
    );
  }
}
