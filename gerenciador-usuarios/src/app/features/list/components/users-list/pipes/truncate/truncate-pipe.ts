import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string,DefaultLength:number =15): string {
    if(value.length > DefaultLength ){
     return value.substring(0, DefaultLength) + '...';
    }

    return value;
  }

}
