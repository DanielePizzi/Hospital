import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Patient } from '../model/patient';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Summary } from '../model/summary';
import { Definition } from '../model/definition';

@Injectable()
export class HospitalService {

  definitionActivities: Definition[] = [];

  constructor(private http: HttpClient) { }

  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>("/api/v1/patients")
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  getDetail(id: number): Observable<Summary[]> {
    return this.http.get<Summary[]>("/api/v1/patients/"+id+"/summary")
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  getDefinitions(): Observable<Definition[]> {
    return this.http.get<Definition[]>("/api/v1/definitions/activities")
      .pipe(
        map(response => {
          this.setDefinitionActivities(response);
          return response;
        })
      );
  }

  setDefinitionActivities(definitionActivities: Definition[]){
    this.definitionActivities = definitionActivities
  }

  getDefinitionActivities(){
    return this.definitionActivities;
  }

}
