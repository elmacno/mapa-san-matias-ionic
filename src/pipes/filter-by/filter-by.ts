import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy',
})
export class FilterByPipe implements PipeTransform {
  transform(items: any[], terms: {lotNumber: string}) {
    if (!items) return items;
    return items.filter((item) => {
      let result = false;
      if (terms.lotNumber) {
        result = (item.number+'').includes(terms.lotNumber);
      }
      return result;
    })
  }
}
