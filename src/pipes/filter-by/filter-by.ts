import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy',
})
export class FilterByPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(items: any[], terms: {partialLotNumber: number}) {
    if (!items) return items;
    return items.filter((item) => {
      let result = false;
      if (terms.partialLotNumber) {
        result = item.number.toString().includes(terms.partialLotNumber.toString());
      }
      return result;
    });
  }
}
