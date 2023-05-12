import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Experiencia } from '../entities/experiencia';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {
  private baseUrl = 'https://portfolio-creator.onrender.com/experiencias/';
  constructor(private http: HttpClient) { }

  getExperienciaList(id:number):Observable<any>{
    return this.http.get(this.baseUrl + `persona/${id}`);
  }
  getExperiencias():Observable<any>{
    return this.http.get(this.baseUrl + 'traer');
  }
  getExperiencia(id:number):Observable<any>{
    return this.http.get(this.baseUrl + `experiencia/${id}`);
  }
  createExperiencia(experiencia: any): Observable<any>{
    return this.http.post(this.baseUrl+'crear', experiencia);
  }
  updateExperiencia(personaid: number, id: number, data: Experiencia): Observable<any>{
    return this.http.put(`${this.baseUrl}editar/persona/${personaid}/experiencia/${id}`, data);
  }
  deleteExperiencia(id:number):Observable<any>{
    return this.http.delete(`${this.baseUrl}borrar/${id}`);
  }
}
