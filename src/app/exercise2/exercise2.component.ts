import { Component } from '@angular/core';
import {map, Observable, switchMap} from 'rxjs';
import {Country, State} from './types';
import {CountryService} from './country.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-exercise2',
  templateUrl: './exercise2.component.html',
  styleUrls: ['./exercise2.component.css']
})

export class Exercise2Component {

  countries$: Observable<Country[]> = this.service.getCountries();
  states$: Observable<State[]>;
  countryDropdown = new FormControl<Country['id']>(null);
  statesDropdown = new FormControl<State['id']>(null);



  constructor(private service: CountryService) { 
    this.states$ = this.countryDropdown.valueChanges.pipe(
      switchMap(data => this.service.getStates(data))
    );
  }



}
