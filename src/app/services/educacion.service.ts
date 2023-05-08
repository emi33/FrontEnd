import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Educacion } from '../entities/educacion';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {
  //private baseUrl = 'http://localhost:8080/educacion/';
  private baseUrl = 'https://portfolio-creator.onrender.com/educacion/';
  constructor(private http: HttpClient) { }

  getEducacionList(id:number):Observable<any>{
    return this.http.get(this.baseUrl + `persona/${id}`);
  }
  getEstudios():Observable<any>{
    return this.http.get(this.baseUrl + 'traer');
  }
  getEducacion(id:number):Observable<any>{
    return this.http.get(this.baseUrl + `obtener/${id}`);
  }
  createEducacion(educacion: Object): Observable<any>{
    return this.http.post(this.baseUrl+'crear', educacion);
  }
  updateEducacion(personaid: number, id: number, data: Educacion): Observable<any>{
    return this.http.put(`${this.baseUrl}editar/persona/${personaid}/educacion/${id}`, data);
  }
  deleteEducacion(id:number):Observable<any>{
    return this.http.delete(`${this.baseUrl}borrar/${id}`);
  }
}
