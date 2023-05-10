import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contacto } from '../entities/contacto';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  //private baseUrl = 'http://localhost:8080/contacto/';
 
  private baseUrl = 'https://portfolio-creator.onrender.com/contacto/';
  constructor(private http: HttpClient) { }

  getContactoList(id:number):Observable<any>{
    return this.http.get(this.baseUrl + `persona/${id}`);
  }
  getContactos():Observable<any>{
    return this.http.get(this.baseUrl + 'traer');
  }
  getContacto(id:number):Observable<any>{
    return this.http.get(this.baseUrl + `obtener/${id}`);
  }
  createContacto(contacto: Object): Observable<any>{
    return this.http.post(this.baseUrl+'crear', contacto);
  }
  updateContacto(personaid: number, id: number, data: Contacto): Observable<any>{
    return this.http.put(`${this.baseUrl}editar/persona/${personaid}/contacto/${id}`, data);
  }
  deleteContacto(id:number):Observable<any>{
    return this.http.delete(`${this.baseUrl}borrar/${id}`);
  }
}
