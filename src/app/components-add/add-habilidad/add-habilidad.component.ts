import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HabilidadService } from 'src/app/services/habilidad.service';

@Component({
  selector: 'app-add-habilidad',
  templateUrl: './add-habilidad.component.html',
  styleUrls: ['./add-habilidad.component.css']
})
export class AddHabilidadComponent implements OnInit{
  skill={
    habilidad: '',
    porcentaje:0,
    semana:0,
    mensual: 0,
    personaid:0
    
  };

  constructor(private habilidadService:HabilidadService, private router: Router, private route: ActivatedRoute){

  }
  submitted = false;
ngOnInit(): void {
  
}
saveHabilidad():void {
  const data = {
    habilidad: this.skill.habilidad,
    porcentaje: this.skill.porcentaje,
    semana: this.skill.semana,
    mensual: this.skill.mensual,
    personaid: this.route.snapshot.params['personaid']
  };
  this.habilidadService.createHabilidad(data)
  .subscribe(
    response => {
      console.log(response);
      this.submitted= true;
    }, error => {
      console.log(error);
    });
}
newHabilidad(): void {
  this.submitted=false;
  this.skill={
    habilidad: '',
    porcentaje:0,
    semana:0,
    mensual: 0,
    personaid:0
    
  };
}

}
