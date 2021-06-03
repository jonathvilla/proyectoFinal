import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Respuesta } from '../models/respuesta';
import { CD } from '../models/CD';
import { Observable } from 'rxjs';

const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class CdService {

  url: string = environment.baseUrl
  constructor(private _http: HttpClient) { }

  GetCd():Observable<Respuesta>{
    return this._http.get<Respuesta>(this.url + 'cd')
  }

  addCd(cd: CD):Observable<Respuesta>{
    return this._http.post<Respuesta>(this.url + 'cd', cd , httpOption)
  }
  updateCd(cd: CD):Observable<Respuesta>{
    return this._http.put<Respuesta>(this.url + 'cd', cd, httpOption)
  }

  desactivarcd(id: any):Observable<Respuesta>{
    return this._http.delete<Respuesta>(this.url + 'CD/'+id )
  }

}
