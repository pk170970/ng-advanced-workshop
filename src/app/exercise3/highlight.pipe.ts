import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight2'
})
export class HighlightPipe2 implements PipeTransform {

  transform(value : string = '', input: string=''): string {
    const index = value.toLowerCase().indexOf(input.toLowerCase());
    if(index < 0) return value;
    
    const prefix = value.substring(0,index);
    const highlightedText = value.substring(index, input.length + index);
    const suffix = value.substring(input.length + index);
    return `${prefix}<b>${highlightedText}</b>${suffix}`;
  }

}
