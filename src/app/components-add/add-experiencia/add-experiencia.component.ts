import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Experiencia } from 'src/app/entities/experiencia';
import { ExperienciaService } from 'src/app/services/experiencia.service';

@Component({
  selector: 'app-add-experiencia',
  templateUrl: './add-experiencia.component.html',
  styleUrls: ['./add-experiencia.component.css']
})
export class AddExperienciaComponent implements OnInit{
  numero!: number;
  experienciaForm!: FormGroup
  
  submitted = false;
  experiencia!:Experiencia;

  constructor(private experienciaService:ExperienciaService, private route: ActivatedRoute, private fb: FormBuilder ){

  }
 
ngOnInit(): void {
  this.numero= +this.route.snapshot.params['personaid'];
 this.experienciaForm =this.initForm();
}
saveExperiencia():void {
  this.experiencia = this.experienciaForm.value;

  this.experienciaService.createExperiencia( this.experiencia ).subscribe({
    next: ()=> {
      alert("experiencia creada satisfactoriamente");
      this.submitted=true;
    }, error: () => {
      alert('error al crear experiencia');
    }
    })
 ;

}
newExperiencia(): void {
  this.submitted=false;
  this.experienciaForm.reset();
  this.experiencia= new Experiencia();
  
}
initForm(): FormGroup {
  return this.fb.group({
    
    empresa: ['', [Validators.required, Validators.minLength(4)]],
    cargo: ['', [Validators.required, Validators.minLength(3)]],
    descripcion: ['', [Validators.required, Validators.minLength(10)]],
    fecha: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
    fechafin: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
    personaid: [this.numero]
  })
}
}
