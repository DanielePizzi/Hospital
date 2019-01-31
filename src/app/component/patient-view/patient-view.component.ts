import { Component, OnInit, Input } from '@angular/core';
import { Patient } from '../../model/patient';
import { HospitalService } from '../../service/hospital.service';
import { Summary } from '../../model/summary';
import { Definition } from '../../model/definition';

@Component({
  selector: 'app-patient-view',
  templateUrl: './patient-view.component.html',
  styleUrls: ['./patient-view.component.css']
})
export class PatientViewComponent implements OnInit {

  @Input() patient: Patient;
  mostraAttivita: boolean = false;
  activitieList: Summary[] = [];
  definitionActivities: Definition[] = [];

  sumModerateActivity: number = 0;
  sumVigorousActivity: number = 0;
  isAppropriate: boolean;


  constructor(
    private hospitalService: HospitalService
  ) { }

  ngOnInit() {
  }

  controllAppropriateActivity(){
    this.definitionActivities = this.hospitalService.getDefinitionActivities();
    let date = new Date()
    let yearPatient = date.getFullYear() - parseInt(this.patient.birthDate.split("-")[0]);
    if (date.getMonth()+1 < parseInt(this.patient.birthDate.split("-")[1])) {
      yearPatient = yearPatient - 1 ;
    } else if(date.getMonth()+1 == parseInt(this.patient.birthDate.split("-")[1])){
      if (date.getDate() < parseInt(this.patient.birthDate.split("-")[1])) {
        yearPatient = yearPatient - 1 ;
      }
    }
    if(yearPatient>= 20 && yearPatient<= 40){
      this.activitieList.forEach(activity => {
        this.definitionActivities.forEach(definition => {
          if (activity.activity == definition.activity) {
            if (definition.intensity == "moderate") {
              this.sumModerateActivity = activity.minutes;
            } else if (definition.intensity == "vigorous"){
              this.sumVigorousActivity = activity.minutes;
            }
          }
        });
      });
      if (this.sumModerateActivity < 150 && this.sumVigorousActivity == 0 ) {
        this.isAppropriate = false
      } else if(this.sumModerateActivity = 0 && this.sumVigorousActivity < 75) {
        this.isAppropriate =  false;
      } else if(this.sumModerateActivity != 0 && this.sumVigorousActivity != 0 && (this.sumModerateActivity + (this.sumVigorousActivity*2) < 150)) {
        this.isAppropriate =  false;
      } else {
        this.isAppropriate =  true;
      }
    } else {
      this.isAppropriate = false;
    }
  }

  showActivities(){
    this.mostraAttivita = !this.mostraAttivita;
    if (this.mostraAttivita) {
      this.hospitalService.getDetail(this.patient.id).subscribe(data => {
        this.activitieList = data;
        this.controllAppropriateActivity();
      })
    } else {
      this.activitieList = [];
      this.sumModerateActivity = 0;
      this.sumVigorousActivity = 0;
    }
  }

}
