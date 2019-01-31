import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'fromMinuteToHourPipe'})
export class FromMinuteToHourPipe implements PipeTransform {
  transform(value, args:string[]) : any {
    if(value > 0 && value/60 < 1) {
      return value + ' Minuti';
    } else {
      let result = roundUp(value/60,2);
      let ore = Math.floor(result);
      let minutiTemp = value%60;
      let minuti;
      if (minutiTemp == 0) {
        return ore + ' Ore';
      } else {
        minuti = minutiTemp;
      }
      return  ore + ' Ore e ' + minuti + " minuti";
    }
  }
}

function roundUp(num, precision) {
  precision = Math.pow(10, precision)
  return Math.ceil(num * precision) / precision
}
