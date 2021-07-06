import { Component, OnInit } from '@angular/core';
import { DentistModel } from 'src/app/modals/DentistModal';
import { FBSrvServiceService } from 'src/app/service/fbsrv-service.service';

@Component({
  selector: 'app-adddentist',
  templateUrl: './adddentist.page.html',
  styleUrls: ['./adddentist.page.scss'],
})
export class AdddentistPage implements OnInit {

  modal: DentistModel = {
    name: "",
  email: "" ,
  count: 0,
  favorite: false,
  }

  filelist: any
  imgUrls =[]

  constructor(private fbService: FBSrvServiceService) { }

  ngOnInit() {
  }

  addDentist() {
    this.fbService.addDentist(this.modal, this.filelist)
  }

  onSelectImages(e) {
    this.imgUrls = []
    this.filelist = e.target.files  
    if (e.target.files) {
      for (let j = 0; j < File.length; j++) {
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[j]);
        reader.onload=(ev: any)=> {
          this.imgUrls.push(ev.target.result)
        }
      }
    }
  }

}
