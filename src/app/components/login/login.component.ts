import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  log!: FormGroup;
  constructor(public authService:AuthService, private fb:FormBuilder){
   
  }
 
  ngOnInit(): void {
    this.log = this.fb.group({
      
      userName: ['', [Validators.required,Validators.minLength(5), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  
}
