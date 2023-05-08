import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Habilidad } from '../entities/habilidad';

@Injectable({
  providedIn: 'root'
})
export class HabilidadService {
  //private baseUrl = 'http://localhost:8080/habilidad/';
  private baseUrl = 'https://portfolio-creator.onrender.com/habilidad/';
  constructor(private http: HttpClient) { }

  getHabilidadList(id:number):Observable<any>{
    return this.http.get(this.baseUrl + `persona/${id}`);
  }
  getHabilidades():Observable<any>{
    return this.http.get(this.baseUrl + 'traer');
  }
  getHabilidad(id:number):Observable<any>{
    return this.http.get(this.baseUrl + `obtener/${id}`);
  }
  createHabilidad(habilidad: Object): Observable<any>{
    return this.http.post(this.baseUrl+'crear', habilidad);
  }
  updateHabilidad(personaid: number, id: number, data: Habilidad): Observable<any>{
    return this.http.put(`${this.baseUrl}editar/persona/${personaid}/habilidad/${id}`, data);
  }
  deleteHabilidad(id:number):Observable<any>{
    return this.http.delete(`${this.baseUrl}borrar/${id}`);
  }
}
