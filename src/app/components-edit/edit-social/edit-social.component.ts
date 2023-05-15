import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Contacto } from 'src/app/entities/contacto';
import { ContactoService } from 'src/app/services/contacto.service';

@Component({
  selector: 'app-edit-social',
  templateUrl: './edit-social.component.html',
  styleUrls: ['./edit-social.component.css']
})
export class EditSocialComponent implements OnInit{
  opciones = ['facebook', 'github', 'instagram', 'twitter', 'youtube', 'linkedin'];
  socialForm!: FormGroup;
  numero!: number;
  
  currentContacto: Contacto = {
    id:0,
    social: '',
    user: '',
    personaid:0
  };

  constructor(private contactoService: ContactoService, private route: ActivatedRoute, private router: Router, private readonly fb: FormBuilder) { }
  
  ngOnInit(): void {
    this.socialForm = this.initForm();
    this.numero = +this.route.snapshot.params['id'];//conversor a number
    this.getContacto(this.numero);
  }

  getContacto(id: number): void {
    this.contactoService.getContacto(id)
      .subscribe({
        next: (data) => {
          this.currentContacto = data;
          console.log(data);
          this.socialForm.patchValue({
            id:this.currentContacto.id,
            social: this.currentContacto.social,
            user: this.currentContacto.user,
            personaid: this.currentContacto.personaid
          })
          }, error: (e) => console.error(e)});
  }

  //Editar Contacto
  updateContacto(): void {
    if (this.currentContacto.id != null) {
      const social= this.socialForm.value;
      this.contactoService.updateContacto(this.currentContacto.personaid, this.currentContacto.id, social)
        .subscribe(
          () => {
            alert('exito al editar contacto ' );
            console.log(this.currentContacto);
            
            this.router.navigate(['/portfolio/' + this.currentContacto.personaid]);
          }, () => {
            alert("Error al cargar contacto ");
          }
        );
    } else{
      console.log('error');
      
    }
  }
  
  //inicializar FormGroup
  initForm(): FormGroup{
    return this.fb.group({ 
      social:['', Validators.required],
      user:['', [Validators.required, Validators.minLength(3)]],
      })
    }

  
}
