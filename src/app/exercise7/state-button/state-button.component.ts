import { Component, HostListener, Input } from '@angular/core';
import { Observable } from 'rxjs';

type State = 'initial' | 'pending' | 'fulfill';

@Component({
  selector: 'app-state-button2',
  templateUrl: './state-button.component.html',
  styleUrls: ['./state-button.component.css']
})
export class StateButtonComponent2 {
  @Input('action') action!:Observable<any>;
  state:State = 'initial';

  @HostListener('click',['$event'])
  triggerAction(event:Event){
    event.preventDefault();
    this.state = 'pending';
    this.action.subscribe(()=>{
      this.state = 'fulfill';
    })
  }
}
