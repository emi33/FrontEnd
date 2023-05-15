import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Experiencia } from 'src/app/entities/experiencia';
import { ExperienciaService } from 'src/app/services/experiencia.service';

@Component({
  selector: 'app-edit-experiencia',
  templateUrl: './edit-experiencia.component.html',
  styleUrls: ['./edit-experiencia.component.css']
})
export class EditExperienciaComponent implements OnInit{
  experienciaForm!: FormGroup;

  numero!: number;

  currentExperiencia: Experiencia = {
    id:0,
    empresa:'',
    cargo: '',
    descripcion: '',
    fecha:0,
    fechafin:0,
    personaid: 0
  };

  constructor(private experienciaService: ExperienciaService, private route: ActivatedRoute, private router: Router, private readonly fb: FormBuilder) { }
  
  ngOnInit(): void {
    this.experienciaForm = this.initForm();
    this.numero = +this.route.snapshot.params['id'];//conversor a number
    this.getExperiencia(this.numero);
    
  }

  getExperiencia(id: number): void {
    this.experienciaService.getExperiencia(id)
      .subscribe({
        next: (data) => {
          this.currentExperiencia = data;
          console.log(data);
          this.experienciaForm.patchValue({
            id:this.currentExperiencia.id,
            empresa: this.currentExperiencia.empresa,
            cargo: this.currentExperiencia.cargo,
            descripcion: this.currentExperiencia.descripcion,
            fecha: this.currentExperiencia.fecha,
            fechafin: this.currentExperiencia.fechafin,
            personaid: this.currentExperiencia.personaid
          })
          
          }, error: (e) => console.error(e)});
  }

  
   updateExperiencia(): void {
    if (this.currentExperiencia.id != null) {
      const experiencia= this.experienciaForm.value;
      
      this.experienciaService.updateExperiencia(this.currentExperiencia.personaid,this.currentExperiencia.id, experiencia)
        .subscribe(
          () => {
            alert('exito al editar experiencia');
            console.log(this.currentExperiencia);
            
            this.router.navigate(['/portfolio/' + this.currentExperiencia.personaid]);
          }, () => {
            alert("Error al cargar experiencia " );
          }
        );
    } else{
      alert('error');
      
    }
  }
  

  //inicializar FormGroup
  initForm(): FormGroup{
    return this.fb.group({
      
      empresa:['', [Validators.required, Validators.minLength(4)]],
      cargo:['', [Validators.required, Validators.minLength(3)]],
      descripcion:['', [Validators.required, Validators.minLength(10)]],
      fecha: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      fechafin: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      
    })
    }
  
}
