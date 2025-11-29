import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { Country, CountryWithInput } from '../types';


@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {

  @Input('placeholderText') placeholderText: string = '';
  @Input('dropdownData$') dropdownData$: Observable<any>;
  @Input('currentCountry') currentCountry:Country;
  @Output('countryEmitter') countryEmitter = new EventEmitter<any>();
  @Output('stateEmitter') stateEmitter = new EventEmitter<any>();



  dropdownControl = new FormControl<string>('');

  constructor() {
  }

  ngOnInit(): void {
    console.log('inside ngoninit');
    this.dropdownControl.valueChanges.subscribe(data => {
      console.log('country data is ', this.currentCountry);
      this.countryEmitter.emit({input:data, country: this.currentCountry});
      if (this.currentCountry) {
        this.stateEmitter.emit({
          input: data,
          country: this.currentCountry,
        });
      }
    });
  }

  updateDropDown(country: Country) {
    console.log('value is ', country);
    this.currentCountry = country;
    this.dropdownControl.setValue(country.description);
    console.log('on update', this.dropdownControl.value);
    // this.stateEmitter.emit({ stateInput: this.dropdownControl.value, country: this.selectedCountry });
  }

}
