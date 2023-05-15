import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  personaForm!: FormGroup;

  numero!: number;

  carpeta!: string 
  name!:string;
  carpetabanner!: string 
  namebanner!:string;

  persona:Persona = {
    id:0,
    nombre: '',
    apellido: '',
    edad: 0,
    acercade: '',
    ocupacion: '',
    email: '',
    imagen: '',
    banner: ''
  };

  constructor(private personaService: PersonaService, private route: ActivatedRoute, private router: Router, public imguploadService: ImgUploadService, private readonly fb: FormBuilder) { }
  
  ngOnInit(): void {
    this.personaForm = this.initForm();
    this.numero = +this.route.snapshot.params['id'];//conversor a number
    this.getPersona(this.numero);
    console.log(this.persona);
    
    this.carpeta = "uploads/Foto_de_perfil_" +this.numero;
    this.carpetabanner = "uploads/Banner_" +this.numero;
    this.name = "foto_perfil_" + this.numero;
    this.namebanner = "banner_" + this.numero;
  }

  //Obtener datos de persona
  getPersona(id: number): void {
    this.personaService.getPersona(id)
      .subscribe({
        next: (data) => {
          this.persona = data;
          console.log(data);
          this.personaForm.patchValue({
            id:this.persona.id,
            nombre: this.persona.nombre,
            apellido: this.persona.apellido,
            edad: this.persona.edad,
            acercade: this.persona.acercade,
            ocupacion: this.persona.ocupacion,
            email: this.persona.email
        
          })
          
          }, error: (e) => console.error(e)});
  }

  //Editar Persona
  async updatePersona(): Promise<void> {
    if (this.persona.id != null) {
      this.persona= this.personaForm.getRawValue();
      //buscamos las url de las imagenes en firebase
      this.persona.imagen = await this.imguploadService.getImageUrl(this.name, this.carpeta);
      this.persona.banner = await this.imguploadService.getImageUrl(this.namebanner, this.carpetabanner);
      this.personaService.updatePersona(this.numero, this.persona)
        .subscribe(
          () => {

            console.log( this.persona);
            alert('exito al editar perfil')
            this.router.navigate(['/portfolio/' + this.numero]);
          }, () => {
            alert("Error al cargar perfil " );
          }
        );
    } else{
      console.log('error');
      
    }
  }
  //Subir imagen
  uploadImage($event: any, nombrefoto: string, carpetafoto: string) {
    
    this.imguploadService.uploadImage($event, nombrefoto, carpetafoto);
  }

  //inicializar FormGroup
  initForm(): FormGroup{
    return this.fb.group({
      id:[],
      nombre:['', [Validators.required, Validators.minLength(3)]],
      apellido:['', [Validators.required, Validators.minLength(3)]],
      edad:['', Validators.required],
      acercade:['', [Validators.required, Validators.minLength(10)]],
      ocupacion:['', [Validators.required, Validators.minLength(4)]],
      email:['', [Validators.required, Validators.email]],
      imagen:[],
      banner:[]
    })
    }

    
}