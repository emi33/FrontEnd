import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactoService } from 'src/app/services/contacto.service';

@Component({
  selector: 'app-add-social',
  templateUrl: './add-social.component.html',
  styleUrls: ['./add-social.component.css']
})
export class AddSocialComponent implements OnInit{
  opciones = ['facebook', 'github', 'instagram', 'twitter', 'youtube', 'linkedin'];


  numero:number=this.route.snapshot.params['id'];
  socialForm!: FormGroup;

  socials = {
    social: '',
    user: '',
    personaid: 0
  };

  constructor(private socialService: ContactoService, private readonly fb: FormBuilder, private route: ActivatedRoute) { }

  submitted = false;

  ngOnInit(): void {
    this.numero= +this.route.snapshot.params['personaid'];
    this.socialForm = this.initForm();
   
  }

  saveRedSocial(): void {
    const socials = this.socialForm.value;
    this.socialService.createContacto(socials)
      .subscribe(
        () => {
          console.log('exito al crear nueva red social');
          this.submitted = true;
        }, () => {
          alert('error al crear red social');
        });
  }

  newRedSocial(): void {
    this.submitted = false;
    this.socialForm = this.initForm();
    this.socials = {
      social: '',
      user: '',
      personaid: 0
    };
  }


  initForm(): FormGroup {
    return this.fb.group({
      social: ['', Validators.required],
      user: ['', [Validators.required, Validators.minLength(3)]],
      
      personaid: [this.numero],
      
    })
  }
  /*
  socials = {
    social: '',
    user: '',
    personaid: 0
  };

  constructor(private contactoService: ContactoService, private router: Router, private route: ActivatedRoute) { }
  submitted = false;
  ngOnInit(): void {

  }
  saveContacto(): void {
    const data = {
      social: this.socials.social,
      user: this.socials.user,
      personaid: this.route.snapshot.params['personaid']
    };
    this.contactoService.createContacto(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        }, error => {
          console.log(error);
        });
  }
  newContacto(): void {
    this.submitted = false;
    this.socials = {
      social: '',
      user: '',
      personaid: 0
    };
  }*/
}
