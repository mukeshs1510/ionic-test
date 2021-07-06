import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UserModal } from '../modals/UserDetailsModel';
import { FBSrvServiceService } from '../service/fbsrv-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  modal: UserModal = {
    name: '',
    email: '',
    password: '',
  }
  conPass: string

  // dataForm: FormGroup

  constructor(private fbService: FBSrvServiceService, private router: Router, private navCtrl: NavController,
    private fb: FormBuilder) { }

  ngOnInit() {
  }

   onRegister() {
    this.fbService.register(this.modal, this.conPass)
    }

    // initReactiveForm() {
    //   this.dataForm = this.fb.group({
    //     'name': new FormControl('', Validators.required),
    //     'email': new FormControl('', Validators.required),
    //     'password': new FormControl('', Validators.required),
    //     'conPass': new FormControl('', Validators.required),
    //   })
    // }

  goBack(){
    this.navCtrl.navigateBack('/login')
  }

}
