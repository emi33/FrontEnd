import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Educacion } from 'src/app/entities/educacion';
import { EducacionService } from 'src/app/services/educacion.service';

@Component({
  selector: 'app-edit-educacion',
  templateUrl: './edit-educacion.component.html',
  styleUrls: ['./edit-educacion.component.css']
})
export class EditEducacionComponent {
  educacionForm!: FormGroup;

  numero!: number;

  currentEducacion: Educacion = {
    id:0,
    institucion: '',
    titulo: '',
    fechainicio:0,
    fechafin:0,
    personaid: 0
  };

  constructor(private educacionService: EducacionService, private route: ActivatedRoute, private router: Router, private readonly fb: FormBuilder) { }
  
  ngOnInit(): void {
    this.educacionForm = this.initForm();
    this.numero = +this.route.snapshot.params['id'];//conversor a number
    this.getEducacion(this.numero);
    console.log(this.currentEducacion);
    
  }

  //Obtener datos de persona
  getEducacion(id: number): void {
    this.educacionService.getEducacion(id)
      .subscribe({
        next: (data) => {
          this.currentEducacion = data;
          console.log(data);
          this.educacionForm.patchValue({
            id:this.currentEducacion.id,
            institucion: this.currentEducacion.institucion,
            titulo: this.currentEducacion.titulo,
            fechainicio: this.currentEducacion.fechainicio,
            fechafin: this.currentEducacion.fechafin,
            personaid: this.currentEducacion.personaid
          })
          
          }, error: (e) => console.error(e)});
  }

  //Editar Persona
   updateEducacion(): void {
    if (this.currentEducacion.id != null) {
      const educacion= this.educacionForm.value;
      
      this.educacionService.updateEducacion(this.currentEducacion.personaid,this.currentEducacion.id, educacion)
        .subscribe(
          () => {
            console.log('exito');
            console.log(this.currentEducacion);
            
            this.router.navigate(['/portfolio/' + this.currentEducacion.personaid]);
          }, () => {
            alert("Error al cargar datos " );
          }
        );
    } else{
      console.log('error');
      
    }
  }
  

  //inicializar FormGroup
  initForm(): FormGroup{
    return this.fb.group({
      
      institucion:['', [Validators.required, Validators.minLength(3)]],
      titulo:['', [Validators.required, Validators.minLength(3)]],
      fechainicio:['', Validators.required],
      fechafin:['', Validators.required]
      
    })
    }

 /* @Input() currentEducacion: Educacion = {
    id:0,
    institucion: '',
    titulo: '',
    fechainicio:0,
    fechafin:0,
    personaid: 0
  };
  constructor(
    private educacionService: EducacionService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.getEducacion(this.route.snapshot.params['id']);
  }

  getEducacion(id: number): void {
    this.educacionService.getEducacion(id)
      .subscribe({
        next: (data) => {
          this.currentEducacion = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  updateEducacion(): void {
    if (this.currentEducacion.id != null) {
      this.educacionService.updateEducacion(this.currentEducacion.personaid,this.currentEducacion.id, this.currentEducacion)
        .subscribe(
          () => {
            console.log('exito');
            this.router.navigate(['/portfolio/'+this.currentEducacion.personaid]);

          }, err => {
            alert("Error al cargar datos"+err);
          }
        );
    }
  }*/
}
