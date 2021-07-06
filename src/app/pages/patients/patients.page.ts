import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MultiImagesModel } from 'src/app/modals/MultiImagesModel';
import { PatientModal } from 'src/app/modals/PatientModal';
import { FBSrvServiceService } from 'src/app/service/fbsrv-service.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.page.html',
  styleUrls: ['./patients.page.scss'],
})
export class PatientsPage implements OnInit {

  dID: string
  list: PatientModal[]

  multiImageModel: MultiImagesModel[]
  uid: string = ''

  constructor(private fbService: FBSrvServiceService, private actRoute: ActivatedRoute,
    private route: Router) { }

  async ngOnInit() {

    this.dID = this.actRoute.snapshot.paramMap.get('id');
    this.uid = localStorage.getItem("uid")
    if(this.dID) {
    this.getAllImages();
    (await this.fbService.getPatients(this.dID)).subscribe(res => {
      this.list = res
      console.log(res)
    })
  }
  }

  delete(id) {
    if(this.fbService.presentAlert("Are you sure to delete the Patient?")) {
      let uid = localStorage.getItem("uid")
      this.fbService.firebaseFirestore.collection("ionic")
      .doc(uid).collection("dentists")
      .doc(this.dID).collection("patients").doc(id)
      .delete()
      this.fbService.presentAlert("Patient Deleted")
    }
  }

  addPatient() {
    this.route.navigateByUrl("/addpatient/"+this.dID)
  }

  async getAllImages() {
    (await this.fbService.getAllDocImages(this.dID, this.uid)).subscribe(res => {
      this.multiImageModel = res
      console.log(res)
    })
  }

  onEdit(pid: string) {
    this.route.navigateByUrl("/addpatient/"+this.dID)
  }

}
