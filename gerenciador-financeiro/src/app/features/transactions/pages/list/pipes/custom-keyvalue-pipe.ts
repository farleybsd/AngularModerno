import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customKeyvalue',
  pure: false
})
export class CustomKeyvaluePipe implements PipeTransform {

  transform(obj: Record<string,unknown>): {key: string, value: unknown}[]  {
    return  Object.keys(obj).map(key => ({key, value: obj[key]}));
  }

}
