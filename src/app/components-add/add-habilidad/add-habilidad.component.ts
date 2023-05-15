import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HabilidadService } from 'src/app/services/habilidad.service';

@Component({
  selector: 'app-add-habilidad',
  templateUrl: './add-habilidad.component.html',
  styleUrls: ['./add-habilidad.component.css']
})
export class AddHabilidadComponent implements OnInit{

  numero:number=this.route.snapshot.params['id'];
  skillform!: FormGroup;

  skill={
    habilidad: '',
    porcentaje:0,
    semana:0,
    mensual: 0,
    personaid:0
    
  };

  constructor(private habilidadService: HabilidadService, private readonly fb: FormBuilder, private route: ActivatedRoute) { }

  submitted = false;

  ngOnInit(): void {
    this.numero= +this.route.snapshot.params['personaid'];
    this.skillform = this.initForm();
   
  }

  saveHabilidad(): void {
    const skill = this.skillform.value;
    this.habilidadService.createHabilidad(skill)
      .subscribe(
        () => {
          alert('Habilidad creada de forma exitosa');
          this.submitted = true;
        }, () => {
          alert('error al crear habilidad');
        });
  }

  newHabilidad(): void {
    this.submitted = false;
    this.skillform = this.initForm();
    this.skill={
      habilidad: '',
      porcentaje:0,
      semana:0,
      mensual: 0,
      personaid:0
    };
  }


  initForm(): FormGroup {
    return this.fb.group({
      habilidad: ['', [Validators.required, Validators.minLength(3)]],
      porcentaje: ['', [Validators.required, Validators.min(0), Validators.max(100), Validators.pattern("^[0-9]*$")]],
      semana: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      mensual: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      personaid: [this.numero],
      
    })
  }
 
}
