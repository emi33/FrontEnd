import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EducacionService } from 'src/app/services/educacion.service';

@Component({
  selector: 'app-add-educacion',
  templateUrl: './add-educacion.component.html',
  styleUrls: ['./add-educacion.component.css']
})
export class AddEducacionComponent implements OnInit{
  educacion={
    institucion: '',
    titulo:'',
    fechainicio: 0,
    fechafin:0,
    personaid:0
    
  };

  constructor(private educacionService:EducacionService, private router: Router, private route: ActivatedRoute){

  }
  submitted = false;
ngOnInit(): void {
  
}
saveEducacion():void {
  const data = {
    institucion: this.educacion.institucion,
    titulo: this.educacion.titulo,
    fechainicio: this.educacion.fechainicio,
    fechafin: this.educacion.fechafin,
    personaid: this.route.snapshot.params['personaid']
  };
  this.educacionService.createEducacion(data)
  .subscribe(
    response => {
      console.log(response);
      this.submitted= true;
    }, error => {
      console.log(error);
    });
}
newEducacion(): void {
  this.submitted=false;
  this.educacion = {
    institucion: '',
    titulo:'',
    fechainicio: 0,
    fechafin:0,
    personaid:0
    
  }
}

}
