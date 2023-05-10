import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonaService } from 'src/app/services/persona.service';
import { ImgUploadService } from 'src/app/shared/services/img-upload.service';

@Component({
  selector: 'app-add-persona',
  templateUrl: './add-persona.component.html',
  styleUrls: ['./add-persona.component.css']
})
export class AddPersonaComponent implements OnInit{
  indexPersona: number = 0;
  numero: number = 0;
  carpeta!: string; 
  name!:string;
  carpetabanner!: string; 
  bannerpicture:string='';
  namebanner!:string;

  
  persona={
    id:0,
    nombre: '',
    apellido: '',
    edad: 0,
    acercade:'',
    ocupacion:'',
    email:'',
    imagen:'',
    banner:''
  };

  constructor(private personaService: PersonaService, private route: ActivatedRoute, public imguploadService: ImgUploadService, private router: Router){}
  
  submitted = false;

  ngOnInit(): void {
 this.getPersonas()
 
    this.carpeta = "uploads/Foto_de_perfil_"
    this.carpetabanner="uploads/Banner_";
  
    this.name = "foto_perfil_" ;
    this.namebanner="foto_banner_";
  }

  getPersonas(): void {
    this.personaService.getPersonaList()
      .subscribe({
        next: (data) => {
          this.persona = data;
          console.log(data);
          }, error: (e) => console.error(e)});
  }
  async createPersona(): Promise<void> {
    
      this.persona.imagen = await this.imguploadService.getImageUrl(this.name, this.carpeta);

      this.persona.banner = await this.imguploadService.getImageUrl(this.namebanner, this.carpetabanner);
      this.personaService.createPersona( this.persona)
        .subscribe(
          () => {
            console.log('exito');
           
          }, err => {
            alert("Error al cargar datos " + err);
          }
        );
    
  }
  uploadImage($event: any, nombreFoto: string, Carpeta: string) {
   
    this.imguploadService.uploadImage($event, nombreFoto, Carpeta);
  }


  newPersona(): void {
    this.submitted=false;
    this.persona = {
      id:0,
    nombre: '',
    apellido: '',
    edad: 0,
    acercade:'',
    ocupacion:'',
    email:'',
    imagen:'',
    banner:''
    }
  }
}
