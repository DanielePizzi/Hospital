import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule }  from '@angular/common/http';
import { HospitalService } from './service/hospital.service';
import { PatientViewComponent } from './component/patient-view/patient-view.component';
import { GenderPipe } from './pipe/genderPipe';
import { ActivityPipe } from './pipe/activityPipe';
import { FromMinuteToHourPipe } from './pipe/fromMinuteToHourPipe';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    PatientViewComponent,
    GenderPipe,
    ActivityPipe,
    FromMinuteToHourPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [HospitalService],
  bootstrap: [AppComponent],
  exports:[GenderPipe,ActivityPipe,FromMinuteToHourPipe]
})
export class AppModule { }
