import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage'
import { AngularFirestore} from '@angular/fire/firestore';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FBSrvServiceService {

  uid: string

  constructor(public firebaseAuth: AngularFireAuth, private router: Router, public firebaseFirestore: AngularFirestore,
    private firebaseStorage: AngularFireStorage, public alertController: AlertController,
    public loadingController: LoadingController, public toastController: ToastController) {
      //  this.getUidOfUser()
      //  console.log(this.uid)
      this.firebaseAuth.authState.subscribe((res:any) => {
        this.uid = res.uid
        localStorage.setItem("uid", this.uid)  
      })
     }

     async getUidOfUser() {
      await this.firebaseAuth.authState.subscribe(res => {
        this.uid = res.uid
      })
    }

    async login(email, password) {
      this.startLoader()
    if(email != "" && password != "") {
      try{
        await this.firebaseAuth.signInWithEmailAndPassword(email, password).then(res => {
          this.stopLoader()
          localStorage.setItem("uid", this.uid)  
          this.router.navigateByUrl("/dentist")
          console.log("SuccessFully Login")
        })
      } catch(err) {
        if(err.code === "auth/invalid-email") {
          this.presentAlert("User not found!")
        }
      }
    } else {
      this.presentAlert("Please provide username!")
    }
    }

    async register(userData, conPass) {
      if(userData.email != "" && userData.password != "" && conPass != "") {
        if(userData.password === conPass) {
          try{
          await this.firebaseAuth.createUserWithEmailAndPassword(userData.email, userData.password).then(res => {
            localStorage.setItem("uid", this.uid)  
            this.storeUserDetails(userData, res.user.uid)
          })
        } catch(err) {
            this.presentAlert(err.code)
        }
        } else {
          this.presentAlert("Password is not matchinf!")
        }
      } else {
        this.presentAlert("Please provide username!")
      }
    }

    storeUserDetails(userData, uid) {
       this.firebaseFirestore.collection("ionic").doc(uid).set(userData).then(res => {
        this.router.navigateByUrl("/dentist")
        console.log("SuccessFully Register")
       })
    }

    async addDentist(data, multiImages) {
      this.startLoader()
      let uid = localStorage.getItem("uid")
      await this.firebaseFirestore.collection("ionic").doc(uid).collection("dentists").add(data).then(res => {
        this.addMultipleImage(res.id, multiImages, uid)
      })
    }

    addMultipleImage(id, multiImages, uid) {
        const upload = []
        for(const file of multiImages) {
          const date = Date()
          const path = `ionicDentists/${id}/IMG${date}${file.name}`
          const ref = this.firebaseStorage.ref(path)
          const task = this.firebaseStorage.upload(path, file)
          // upload.push()
          const _t = task.then(f => {
            return f.ref.getDownloadURL().then(res => {
              return this.firebaseFirestore.collection("ionic").doc(uid).collection("dentists")
              .doc(id).collection("multiImages").add({
                docImages: res,
                imagePath: path
              })
            })
          }).then(res => {
            this.presentToast("Dentist Added Successfully!")
            this.stopLoader()
          })
        }
    }

    async getAllDocImages(id, uid) {
      
      return await this.firebaseFirestore.collection("ionic").doc(uid).collection("dentists")
      .doc(id).collection("multiImages").get().pipe(
        map(actions => actions.docs.map(a => {
          const data = a.data() as any;
          const id = a.id;
          return { id, ...data };
        }))
      )
    }

    async addPatient(data, dId) {
      this.startLoader()
      let uid = localStorage.getItem("uid")
      await this.firebaseFirestore.collection("ionic").doc(uid)
      .collection("dentists").doc(dId).collection("patients")
      .add(data).then(res => {
        this.stopLoader()
        this.presentToast("Patient Added Successfully!")
      })
    }

    async getPatients(dId) {
      // this.getUidOfUser()
      let uid = localStorage.getItem("uid")
      return await this.firebaseFirestore.collection("ionic").doc(uid).collection("dentists").doc(dId).collection("patients").get().pipe(
        map(actions => actions.docs.map(a => {
          const data = a.data() as any;
          const id = a.id;
          return { id, ...data };
        }))
      )
    }

    async getDentists() {
      // this.getUidOfUser()
      // if(this.uid) {
        let uid = localStorage.getItem("uid")
        return await this.firebaseFirestore.collection("ionic").doc(uid).collection("dentists").get().pipe(
          map(actions => actions.docs.map(a => {
            const data = a.data() as any;
            const id = a.id;
            return { id, ...data };
          }))
        )
      // }
    }

    async getSpecificPetient(pid: string, uid, dId) {
      return this.firebaseFirestore.collection("ionic").doc(uid).collection("dentists")
      .doc(dId)
      .collection("patients").doc(pid)
      .valueChanges()
    }

    async presentAlert(msg: string) {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Alert',
        subHeader: 'Authentication error',
        message: msg,
        buttons: ['OK']
      });
      await alert.present();
      const { role } = await alert.onDidDismiss();
      console.log('onDidDismiss resolved with role', role);
    }
  
    async startLoader() {
      const loading = await this.loadingController.create({
        message: 'Please wait...',
      });
      await loading.present();
    }
  
    async stopLoader() {
      return await this.loadingController.dismiss();
    }

    async presentToast(msg: string) {
      const toast = await this.toastController.create({
        message: msg,
        duration: 1600
      });
      toast.present();
    }

}

