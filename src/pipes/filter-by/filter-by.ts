import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy',
})
export class FilterByPipe implements PipeTransform {
  transform(items: any[], terms: {lotNumber: string}) {
    if (!items) return items;
    let lot: number;
    if (terms.lotNumber) {
      lot = parseInt(terms.lotNumber);
    }
    return items.filter((item) => {
      let result = false;
      if (terms.lotNumber) {
        result = (item.number+'').includes(terms.lotNumber);
      }
      return result;
    })
  }
}
