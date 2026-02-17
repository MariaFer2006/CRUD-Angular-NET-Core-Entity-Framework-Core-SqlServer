import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {
  private myAppUrl = 'https://127.0.0.1:7273/';
  private myApiUrl = 'api/Tarjeta/';
  //devuelve un observable con la lista de tarjetas
  constructor(private http: HttpClient) { }

  //metodo para obtener las tarjetas
  getListTarjetas(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl);
  }
  //metodo para eliminar una tarjeta
  deleteTarjeta(id: number): Observable<any> {
    return this.http.delete(this.myAppUrl + this.myApiUrl + id);
  }

  //metodo para guardar una tarjeta
  saveTarjeta(tarjeta: any): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiUrl, tarjeta);
  }
  //metodo para actualizar una tarjeta
  updateTarjeta(tarjeta: any): Observable<any> {
    return this.http.put(this.myAppUrl + this.myApiUrl + tarjeta.id, tarjeta);
  }
}
