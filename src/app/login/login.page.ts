import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { FBSrvServiceService } from '../service/fbsrv-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = ""
  password: string = ""

  constructor(private fbService: FBSrvServiceService) { }

  ngOnInit() {
  }

  onLogin() {
      this.fbService.login(this.email, this.password)
  }

  

}
