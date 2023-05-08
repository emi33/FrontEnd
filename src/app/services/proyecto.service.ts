import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proyecto } from '../entities/proyecto';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  //private baseUrl = 'http://localhost:8080/proyecto/';
  private baseUrl = 'https://portfolio-creator.onrender.com/proyecto/';
  constructor(private http: HttpClient) { }

  getProyectoList(id:number):Observable<any>{
    return this.http.get(this.baseUrl + `persona/${id}`);
  }
  getProyectos():Observable<any>{
    return this.http.get(this.baseUrl + 'traer');
  }
  getProyecto(id:number):Observable<any>{
    return this.http.get(this.baseUrl + `obtener/${id}`);
  }
  createProyecto(proyecto: Object): Observable<any>{
    return this.http.post(this.baseUrl+'crear', proyecto);
  }
  updateProyecto(personaid: number, id: number, data: Proyecto): Observable<any>{
    return this.http.put(`${this.baseUrl}editar/persona/${personaid}/proyecto/${id}`, data);
  }
  deleteProyecto(id:number):Observable<any>{
    return this.http.delete(`${this.baseUrl}borrar/${id}`);
  }
}
