import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectoService } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-add-proyecto',
  templateUrl: './add-proyecto.component.html',
  styleUrls: ['./add-proyecto.component.css']
})
export class AddProyectoComponent implements OnInit{

  numero:number=this.route.snapshot.params['id'];
  projectForm!: FormGroup;

  project={
    nombreProyecto: '',
    descripcion:'',
    desarrollo:'',
    lanzamiento: 0,
    img: '',
    link:'',
    personaid:0
    
  };

  constructor(private proyectoService: ProyectoService, private readonly fb: FormBuilder, private route: ActivatedRoute) { }

  submitted = false;

  ngOnInit(): void {
    this.numero= +this.route.snapshot.params['personaid'];
    this.projectForm = this.initForm();
   
  }

  saveProyecto(): void {
    const project = this.projectForm.value;
    this.proyectoService.createProyecto(project)
      .subscribe(
        () => {
          alert('exito al crear nuevo proyecto');
          this.submitted = true;
        }, () => {
          alert('error al crear nuevo proyecto');
        });
  }

  newProyecto(): void {
    this.submitted = false;
    this.projectForm = this.initForm();
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


  initForm(): FormGroup {
    return this.fb.group({
      nombreProyecto: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required, Validators.minLength(3)]],
      desarrollo: ['', [Validators.required, Validators.minLength(4)]],
      link: ['', [Validators.required, Validators.minLength(5)]],
      lanzamiento: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      personaid: [this.numero],
      
    })
  }
 
}
