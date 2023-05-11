import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from 'src/app/entities/persona';
import { PersonaService } from 'src/app/services/persona.service';
import { ImgUploadService } from 'src/app/shared/services/img-upload.service';

@Component({
  selector: 'app-edit-persona',
  templateUrl: './edit-persona.component.html',
  styleUrls: ['./edit-persona.component.css']
})
export class EditPersonaComponent implements OnInit {
  
  numero!: number;
  carpeta!: string 
  name!:string;
  carpetabanner!: string 
  namebanner!:string;
  @Input() viewMode = false;
  @Input() currentPersona: Persona = {
    id:0,
    nombre: '',
    apellido: '',
    edad: 0,
    acercade: '',
    ocupacion: '',
    email:'',
    imagen: '',
    banner: ''
  };

  constructor(private personaService: PersonaService, private route: ActivatedRoute, private router: Router, public imguploadService: ImgUploadService) { }
  
  ngOnInit(): void {
    this.numero = +this.route.snapshot.params['id'];//conversor a number
    this.carpeta = "uploads/Foto_de_perfil_" +this.numero;
    this.carpetabanner = "uploads/Banner_" +this.numero;
    if (!this.viewMode) {
      this.getPersona(this.numero);
      this.name = "foto_perfil_" + this.numero;
      this.namebanner = "banner_" + this.numero;
    }
  }
  getPersona(id: number): void {
    this.personaService.getPersona(id)
      .subscribe({
        next: (data) => {
          this.currentPersona = data;
          console.log(data);
          }, error: (e) => console.error(e)});
  }
  async updatePersona(): Promise<void> {
    if (this.currentPersona.id != null) {
      this.currentPersona.imagen = await this.imguploadService.getImageUrl(this.name, this.carpeta);
      this.currentPersona.banner = await this.imguploadService.getImageUrl(this.namebanner, this.carpetabanner);
      this.personaService.updatePersona(this.currentPersona.id, this.currentPersona)
        .subscribe(
          () => {
            console.log('exito');
            this.router.navigate(['/portfolio/' + this.currentPersona.id]);
          }, err => {
            alert("Error al cargar datos " + err);
          }
        );
    }
  }
  uploadImage($event: any, nombrefoto: string, carpetafoto: string) {
    
    this.imguploadService.uploadImage($event, nombrefoto, carpetafoto);
  }
  
}