import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'activityPipe'})
export class ActivityPipe implements PipeTransform {
  transform(value, args:string[]) : any {
    switch (value) {
        case "sleeping":
          return "Sonno"
        case "stationary-awake":
          return "Riposo"
        case "walking":
          return "Camminata"
        case "cycling":
          return "Ciclismo"
        case "swimming":
          return "Nuoto"
        case "running":
          return "Corsa"
      default:
        return "";
    }
  }
}
