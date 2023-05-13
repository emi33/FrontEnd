import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  reg!: FormGroup;
  constructor(public authService: AuthService, private fb:FormBuilder){}

  ngOnInit(): void {
    this.reg = this.fb.group({
      
      userName: ['', [Validators.required,Validators.minLength(5), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
}
