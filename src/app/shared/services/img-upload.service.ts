import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class ImgUploadService {
  url: string= "";
  constructor(private storage: AngularFireStorage) { }


  public uploadImage($event: any, name: string, carpeta: string){
    
    const file = $event.target.files[0]
    console.log(file);
    this.storage.upload(carpeta+'/' + name, file)
    .then(()=>{this.getImageUrl(name, carpeta)})
    .catch(error=> console.log(error))
  }
 
  public async getImageUrl(name: string, root: string): Promise<string>{
    const imageRef = this.storage.ref(`${root}/${name}`);
    this.url = await imageRef.getDownloadURL().toPromise();
    console.log("la url es: " + this.url);
    return this.url;
  }
}
