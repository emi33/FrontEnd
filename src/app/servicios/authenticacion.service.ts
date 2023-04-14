import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class AuthenticacionService {

  url="";
  currentUserSubject: BehaviorSubject<any>;


  constructor(private http: HttpClient) { 
    console.log('el servicio de autenticacion esta corriendo');
    this.currentUserSubject= new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser') || '{}'))
    
  }

  iniciarSesion(credenciales:any): Observable<any>{
    return this.http.post(this.url, credenciales).pipe(map(data =>{
      sessionStorage.setItem('currentUser', JSON.stringify(data));
      this.currentUserSubject.next(data);
      return data;
    }))
  }
  get UsuarioAuthenticado(){
    return this.currentUserSubject.value;
  }
}
