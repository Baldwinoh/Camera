import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import {Camera, CameraOptions} from '@ionic-native/camera';
import { Platform } from 'ionic-angular';
import { Flashlight } from '@ionic-native/flashlight';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 
public photos:any;
public base64Image:string;
  constructor(public navCtrl: NavController,private camera: Camera, private alertCtrl: AlertController,private platform:Platform, private flash: Flashlight) {
    this.platform.ready().then(()=>{
     
    })
    }
    
  ngOnInit(): void {
   this.photos = [];
  }
  
  takePhoto(){
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType:this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true,
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.base64Image = 'data:image/jpeg;base64,' + imageData;
     this.photos.push(this.base64Image);
     this.photos.reverse();
    }, (err) => {
    console.log(err);
    });

  }
  toggle(){
    this.flash.toggle();
   
   }

    deletePhoto(index) {
      let confirm = this.alertCtrl.create({
        title: 'Are you sure you want do delete this Image?',
        message: 'Ok Mr Baldwinoh',
        buttons: [
          {
            text: 'No',
            handler: () => {
              console.log('Disagree clicked');
            }
          }, {
            text: 'Yes',
            handler: () => {
              console.log('Agree clicked');
              this.photos.splice(index, 1);
            }
          }
        ]
      });
    confirm.present();
    

    }
    Gallery(){
      const options : CameraOptions = {
        quality: 100, // picture quality
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation:true,
        saveToPhotoAlbum:true

    }
    this.camera.getPicture(options) .then((imageData) => {
      this.base64Image = "data:image/jpeg;base64," + imageData;
      this.photos.push(this.base64Image);
      this.photos.reverse();
    }, (err) => {
      console.log(err);
    })
}
}
