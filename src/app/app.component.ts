import { Component, OnInit } from '@angular/core';
import { HospitalService } from './service/hospital.service';
import { Patient } from './model/patient';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{

  patientList: Patient[] = [];
  filteredItems: Patient[] = [];
  title = 'HospitalApp';

  constructor(
    private hospitalService: HospitalService
  ) { }

  ngOnInit(): void {
    this.hospitalService.getPatients().subscribe(data => {
      this.patientList = data;
      this.assignCopy();
    })
    this.hospitalService.getDefinitions().subscribe(data => {

    });
  }

  assignCopy(){
    this.filteredItems = Object.assign([], this.patientList);
 }
 filterItem(value){
    if(!value){
        this.assignCopy();
    } // when nothing has typed
    this.filteredItems = Object.assign([], this.patientList).filter(
       item => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1
    )
 }

}
