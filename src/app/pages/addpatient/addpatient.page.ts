import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { PatientModal } from 'src/app/modals/PatientModal';
import { FBSrvServiceService } from 'src/app/service/fbsrv-service.service';

@Component({
  selector: 'app-addpatient',
  templateUrl: './addpatient.page.html',
  styleUrls: ['./addpatient.page.scss'],
})
export class AddpatientPage implements OnInit {

  // modal: PatientModal = {
  //   balance: null,
  //   name: "",
  //   email: "",
  //   mobile: null,
  // }

  pid: string
  uid: string = ""
  did: string = ""
  form: FormGroup

  constructor(private fbService: FBSrvServiceService, private actRoute: ActivatedRoute,
    private fb: FormBuilder) { }

  ngOnInit() {
    // reactive form
    this.initReactiveForm()

    // ids
    this.pid = this.actRoute.snapshot.paramMap.get('id');
    this.uid = localStorage.getItem("uid")

    if(this.pid) {
      // this.fbService.getSpecificPetient(this.pid, this.uid, this.did)
    }
  }

  addPatient() {
    // this.fbService.addPatient(this.modal, this.pid)
    // this.fbService.addPatient(this.form.value, this.pid)
    console.log(this.form.value)
  }

  get treatmentForm() : FormArray {
    return this.form.get("treatmentForm") as FormArray
  }

  initReactiveForm() {
    this.form = this.fb.group({
      'name': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required),
      'mobile': new FormControl('', Validators.required),
      'balance': new FormControl('', Validators.required),
      'timeStamp': new FormControl(firebase.default.firestore.FieldValue.serverTimestamp()),
      'treatmentForm': this.fb.array([
        this.fb.group({
          'treatement': new FormControl(''),
        })
      ])
    })
  }

  addMoreContractForms() {
    let contractArr = this.form.get('treatmentForm') as FormArray;
    let newContract = this.fb.group({
      'treatement': '',
    });
    this.treatmentForm.push(newContract)
  }

  deleteForm(i) {
    if(i != 0) {
      this.treatmentForm.removeAt(i)
    }
  }

}
