import { Component, Input, OnInit } from '@angular/core';
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
  numero!: number;
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
  }
}
