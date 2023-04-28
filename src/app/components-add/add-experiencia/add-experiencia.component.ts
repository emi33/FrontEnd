import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExperienciaService } from 'src/app/services/experiencia.service';

@Component({
  selector: 'app-add-experiencia',
  templateUrl: './add-experiencia.component.html',
  styleUrls: ['./add-experiencia.component.css']
})
export class AddExperienciaComponent implements OnInit{
  experiencia={
    empresa: '',
    cargo:'',
    descripcion:'',
    fecha: '',
    personaid:0
    
  };

  constructor(private experienciaService:ExperienciaService, private router: Router, private route: ActivatedRoute){

  }
  submitted = false;
ngOnInit(): void {
  
}
saveExperiencia():void {
  const data = {
    empresa: this.experiencia.empresa,
    cargo: this.experiencia.cargo,
    descripcion: this.experiencia.descripcion,
    fecha: this.experiencia.fecha,
    personaid: this.route.snapshot.params['personaid']
  };
  this.experienciaService.createExperiencia(data)
  .subscribe(
    response => {
      console.log(response);
      this.submitted= true;
    }, error => {
      console.log(error);
    });
}
newExperiencia(): void {
  this.submitted=false;
  this.experiencia = {
    empresa: '',
    cargo:'',
    descripcion:'',
    fecha: '',
    personaid:0
  }
}

}
