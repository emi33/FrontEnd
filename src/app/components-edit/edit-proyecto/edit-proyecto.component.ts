import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyecto } from 'src/app/entities/proyecto';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { ImgUploadService } from 'src/app/shared/services/img-upload.service';

@Component({
  selector: 'app-edit-proyecto',
  templateUrl: './edit-proyecto.component.html',
  styleUrls: ['./edit-proyecto.component.css']
})
export class EditProyectoComponent implements OnInit{
  proyectoForm!: FormGroup;
  numero!: number;
  carpeta!: string 
  name!:string;
  currentProyecto: Proyecto = {
    id:0,
    nombreProyecto: '',
    descripcion: '',
    desarrollo: '',
    lanzamiento: 0,
    img: '',
    link:'',
    personaid:0
  };

  constructor(private proyectoService: ProyectoService, private route: ActivatedRoute, private router: Router, public imguploadService: ImgUploadService, private readonly fb: FormBuilder) { }
  
  ngOnInit(): void {
    this.proyectoForm = this.initForm();
    this.numero = +this.route.snapshot.params['id'];//conversor a number
    this.getProyecto(this.numero);
    this.carpeta = "uploads/Foto_proyeco_" +this.numero;
   
    this.name = "proyecto_" + this.numero;
  }

  //Obtener datos de persona
  getProyecto(id: number): void {
    this.proyectoService.getProyecto(id)
      .subscribe({
        next: (data) => {
          this.currentProyecto = data;
          console.log(data);
          this.proyectoForm.patchValue({
            id:this.currentProyecto.id,
            nombreProyecto: this.currentProyecto.nombreProyecto,
            descripcion: this.currentProyecto.descripcion,
            desarrollo: this.currentProyecto.desarrollo,
            lanzamiento: this.currentProyecto.lanzamiento,
            img: this.currentProyecto.img,
            link: this.currentProyecto.link,
            personaid: this.currentProyecto.personaid
          })
          
          }, error: (e) => console.error(e)});
  }

  //Editar Persona
  async updateProyecto(): Promise<void> {
    if (this.currentProyecto.id != null) {
      const proyecto= this.proyectoForm.value;
      //buscamos las url de las imagenes en firebase
      proyecto.img = await this.imguploadService.getImageUrl(this.name, this.carpeta);
      this.proyectoService.updateProyecto(this.currentProyecto.personaid, this.currentProyecto.id, this.currentProyecto)
        .subscribe(
          () => {
            alert('exito: ' );
            console.log(this.currentProyecto);
            
            this.router.navigate(['/portfolio/' + this.currentProyecto.personaid]);
          }, () => {
            alert("Error al cargar datos " );
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
      nombreProyecto:['', [Validators.required, Validators.minLength(3)]],
      descripcion:['', [Validators.required, Validators.minLength(3)]],
      desarrollo:['', [Validators.required, Validators.minLength(3)]],
      lanzamiento: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      img:['', [Validators.required, Validators.minLength(4)]],
      link:['', [Validators.required, Validators.minLength(10)]],
    })
    }

    
 /* numero!: number;
  name!:string;
  carpeta!: string;
  @Input() currentProyecto: Proyecto = {
    id:0,
    nombreProyecto: '',
    descripcion: '',
    desarrollo: '',
    lanzamiento: 0,
    img: '',
    link:'',
    personaid:0
  };
  constructor(
    private proyectoService: ProyectoService,
    private route: ActivatedRoute,
    private router: Router,
    public imguploadService: ImgUploadService) { }

  ngOnInit(): void {
    this.numero = +this.route.snapshot.params['id'];//conversor a number
    this.carpeta = "uploads/Foto_proyeco_" +this.numero;
   
    this.name = "proyecto_" + this.numero;
    this.getProyecto(this.numero );
   
    
    
  }

  getProyecto(id: number): void {
    this.proyectoService.getProyecto(id)
      .subscribe({
        next: (data) => {
          this.currentProyecto = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  async updateProyecto(): Promise<void> {
    if (this.currentProyecto.id != null) {
      this.currentProyecto.img = await this.imguploadService.getImageUrl(this.name, this.carpeta);
      this.proyectoService.updateProyecto(this.currentProyecto.personaid,this.currentProyecto.id, this.currentProyecto)
        .subscribe(
          () => {
            console.log('exito');
            this.router.navigate(['/portfolio/'+this.currentProyecto.personaid]);

          }, () => {
            alert("Error al cargar datos");
          }
        );
    }
  }
  uploadImage($event: any, nombrefoto: string, carpetafoto: string) {
    
    this.imguploadService.uploadImage($event, nombrefoto, carpetafoto);
  }*/
}
