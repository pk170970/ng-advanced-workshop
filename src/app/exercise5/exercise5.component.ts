import { Component } from '@angular/core';
import {combineLatest, Observable, of, Subject} from 'rxjs';
import {Country, State, CountryWithInput} from './types';
import {FormControl} from '@angular/forms';
import {CountryService} from './country.service';
import {map, startWith, switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-exercise5',
  templateUrl: './exercise5.component.html',
  styleUrls: ['./exercise5.component.css']
})
export class Exercise5Component {

  countries$: Observable<Country[]>;
  currentCountry : Country;
  states$: Observable<State[]>;
  
  countryControl = new Subject<string>();
  stateControl = new Subject<string>();

  constructor(private service: CountryService) {
    this.countries$ = combineLatest([
      this.countryControl.pipe(startWith('')),
      this.service.getCountries()
    ])
    .pipe(
      map(([userInput, countries]) => countries.filter(c => c.description.toLowerCase().indexOf(userInput.toLowerCase()) !== -1))
    );

    this.states$ = this.stateControl.pipe(
      startWith(''),
      switchMap(userInput => 
        this.service.getStatesFor(this.currentCountry?.id).pipe(
          tap(v => console.log("combineLatest(states) emitted:", userInput)),
          map(states => states.filter(state => state.description.toLowerCase().includes(userInput.toLowerCase())))
        )
      )
    )
  }

  countryInputChange(data:any){
    console.log('in parent for country', data);
    this.countryControl.next(data.input);
    this.currentCountry = data.country;
    this.stateControl.next('');
  }

  stateInputChange(data:any){
    console.log('in parent for state', data);
    if(data && data?.country){
      this.stateControl.next(data?.stateInput);
    }
  }

}
