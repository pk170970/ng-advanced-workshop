import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Country, CountryService } from './country.service';


@Component({
  selector: 'app-exercise1',
  templateUrl: './exercise1.component.html',
  styleUrls: ['./exercise1.component.css']
})
export class Exercise1Component implements OnInit {
  public countriesData$:Observable<Country[]>;
  public countryDropdown = new FormControl<Country['id']>(null);

  constructor(
    private http:HttpClient,
    private countryService:CountryService
  ) { }

  ngOnInit() {
    this.countriesData$ = this.countryService.getCountryData();
    this.countriesData$.subscribe(data=>{
      this.countryDropdown.setValue(data[0].id);
    })
  }
  
}
