import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Habilidad } from 'src/app/entities/habilidad';
import { HabilidadService } from 'src/app/services/habilidad.service';

@Component({
  selector: 'app-edit-habilidad',
  templateUrl: './edit-habilidad.component.html',
  styleUrls: ['./edit-habilidad.component.css']
})
export class EditHabilidadComponent implements OnInit{
 
  habilidadForm!: FormGroup;

  numero!: number;

  currentHabilidad: Habilidad = {
    id:0,
    habilidad: '',
    porcentaje: 0,
    semana:0,
    mensual:0,
    personaid:0
  };

  constructor(private habilidadService: HabilidadService, private route: ActivatedRoute, private router: Router, private readonly fb: FormBuilder) { }
  
  ngOnInit(): void {
    this.habilidadForm = this.initForm();
    this.numero = +this.route.snapshot.params['id'];//conversor a number
    this.getHabilidad(this.numero);
    
  }

  getHabilidad(id: number): void {
    this.habilidadService.getHabilidad(id)
      .subscribe({
        next: (data) => {
          this.currentHabilidad = data;
          console.log(data);
          this.habilidadForm.patchValue({
            id:this.currentHabilidad.id,
            habilidad: this.currentHabilidad.habilidad,
            porcentaje: this.currentHabilidad.porcentaje,
            semana: this.currentHabilidad.semana,
            mensual: this.currentHabilidad.mensual,
            personaid: this.currentHabilidad.personaid
          })
          
          }, error: (e) => console.error(e)});
  }

  
   updateHabilidad(): void {
    if (this.currentHabilidad.id != null) {
      const habilidad= this.habilidadForm.value;
      
      this.habilidadService.updateHabilidad(this.currentHabilidad.personaid,this.currentHabilidad.id, habilidad)
        .subscribe(
          () => {
            console.log('exito al editar habilidad');
            console.log(this.currentHabilidad);
            
            this.router.navigate(['/portfolio/' + this.currentHabilidad.personaid]);
          }, () => {
            alert("Error al cargar habilidad " );
          }
        );
    } else{
      console.log('error');
      
    }
  }
  

  //inicializar FormGroup
  initForm(): FormGroup{
    return this.fb.group({
      
      habilidad:['', [Validators.required, Validators.minLength(3)]],
      porcentaje: ['', [Validators.required, Validators.min(0), Validators.max(100), Validators.pattern("^[0-9]*$")]],
      semana: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      mensual: ['', [Validators.required, Validators.pattern("^[0-9]*$")]]
      
    })
    }
  
}
