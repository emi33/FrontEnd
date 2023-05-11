import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectoService } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-add-proyecto',
  templateUrl: './add-proyecto.component.html',
  styleUrls: ['./add-proyecto.component.css']
})
export class AddProyectoComponent implements OnInit{
  numero!: number;
  name!:string;
  carpeta!: string;
  project={
    nombreProyecto: '',
    descripcion:'',
    desarrollo:'',
    lanzamiento: 0,
    img: '',
    link:'',
    personaid:0
    
  };

  constructor(private proyectoService:ProyectoService, private router: Router, private route: ActivatedRoute){

  }
  submitted = false;
  ngOnInit(): void {
  

  
}
saveProyecto():void {
  const data = {
    nombreProyecto: this.project.nombreProyecto,
    descripcion: this.project.descripcion,
    desarrollo: this.project.desarrollo,
    lanzamiento: this.project.lanzamiento,
    link: this.project.link,
    personaid: this.route.snapshot.params['personaid']
  };
  this.proyectoService.createProyecto(data)
  .subscribe(
    response => {
      console.log(response);
      this.submitted= true;
    }, error => {
      console.log(error);
    });
}
newProyecto(): void {
  this.submitted=false;
  this.project={
    nombreProyecto: '',
    descripcion:'',
    desarrollo:'',
    lanzamiento: 0,
    img: '',
    link:'',
    personaid:0
    
  };
}
}
