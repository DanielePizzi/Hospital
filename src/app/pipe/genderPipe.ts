import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'genderPipe'})
export class GenderPipe implements PipeTransform {
  transform(value, args:string[]) : any {
    if (value == "male") {
      return "Maschio";
    } else if(value == "female"){
      return "Femmina";
    }
  }
}
