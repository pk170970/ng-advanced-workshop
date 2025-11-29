import { Directive, HostBinding, HostListener, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Directive({
  selector: '[action][textDone]'
})
export class StateButtonDirective2<T> {

  constructor() { }
  @Input('action') action!:Observable<T>
  @Input('textDone') textDone :string;
  @Input('textWhenWorking') textWhenWorking:string = "Saving...";

  @HostBinding('textContent')
  textContent = 'Save';

  @HostListener('click', ['$event'])
  triggerAction(event:Event){
    event.preventDefault();
    this.textContent = this.textWhenWorking;
    (event.target as HTMLElement).style.backgroundColor='Yellow';
    this.action.subscribe(()=>{
      this.textContent = this.textDone;
      (event.target as HTMLElement).style.backgroundColor='Green';
    })
  }
}
