import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DentistModel } from 'src/app/modals/DentistModal';
import { MultiImagesModel } from 'src/app/modals/MultiImagesModel';
import { FBSrvServiceService } from 'src/app/service/fbsrv-service.service';

@Component({
  selector: 'app-dantists',
  templateUrl: './dantists.page.html',
  styleUrls: ['./dantists.page.scss'],
})
export class DantistsPage implements OnInit {
  
  uid: string
  list: DentistModel[]

  favorite: boolean = false;
  multiImageModel: MultiImagesModel[]

  constructor(private fbService: FBSrvServiceService, 
    private router: Router) { }

  async ngOnInit() {
    this.uid = localStorage.getItem("uid");
      (await this.fbService.getDentists()).subscribe(ress => {
        this.list = ress
      })
  }

  onLogout() {
    this.fbService.firebaseAuth.signOut()
    localStorage.removeItem("uid")  
    this.router.navigateByUrl('/login')
  }

  fav(id:any){
    this.favorite = true
    let isfavourite = { favorite : true}
  console.log(isfavourite)
    this.fbService.firebaseFirestore.collection('ionic').doc(this.uid).collection("dentists").doc(id).update(isfavourite);
    this.fbService.presentToast("Added Favourite");
  }
  noFav(id:any){
    this.favorite = false;
    let isfavourite = { favorite : false}
    this.fbService.firebaseFirestore.collection('ionic').doc(this.uid).collection("dentists").doc(id).update(isfavourite);
    this.fbService.presentToast("Removed Favourite");
  }

  delete(id) {
    if(confirm("Are you sure to delete the Dentist?")) {
      let uid = localStorage.getItem("uid")
      this.fbService.firebaseFirestore.collection("ionic").doc(uid).collection("dentists").doc(id).delete()
      this.fbService.presentAlert("Dentist Deleted")
    }
  }
}
