import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'moment'
})
export class MomentPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    const arg = args[0];
    const amount = arg[0];
    const duration = arg[1];

    return moment(value, 'YYYY-MM-DD').add(amount, duration).format('YYYY-MM-DD');
  }

}
