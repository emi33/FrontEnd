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
        response => {
          console.log(response);
          this.submitted = true;
        }, error => {
          console.log(error);
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
      link: ['', [Validators.required, Validators.minLength(4)]],
      lanzamiento: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      personaid: [this.numero],
      
    })
  }
 /*
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
}*/
}
