import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../entities/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  //private baseUrl = 'http://localhost:8080/personas/';
  private baseUrl = 'https://portfolio-creator.onrender.com/personas/';
  constructor(private http: HttpClient) { }

  getPersonaList():Observable<any>{
    return this.http.get(this.baseUrl + 'traer');
  }

  createPersona(persona: Object): Observable<any>{
    return this.http.post(this.baseUrl+'crear', persona);
  }

  deletePersona(id:number):Observable<any>{
    return this.http.delete(`${this.baseUrl}borrar/${id}`);
  }

  getPersona(id:number):Observable<Persona>{
    return this.http.get<Persona>(`${this.baseUrl}traer/${id}`);
  }

  updatePersona(id: number, data: Persona): Observable<any>{
    return this.http.put(`${this.baseUrl}editar/${id}`, data);
  }



}
