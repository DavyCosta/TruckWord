import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';

import { Fretes } from '../shared/Fretes';
import { ObjRetornoFretes } from '../shared/ObjRetornoFretes';

@Injectable({
  providedIn: 'root'
})
export class FretesService {

  url = 'http://localhost/Api_exclusao/public_html/api/Fretes'; // api rest 
  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }


  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json' ,
      'responseType' : 'application/json; charset=UTF-8;'
    })
  }

  // Obtem todos os Fretes
  getFretes(): Observable<ObjRetornoFretes> {
    return this.httpClient.get<ObjRetornoFretes>(this.url)
      .pipe(
        catchError(this.handleError))
  }

  // Obtem um Fretes pelo id
  getFretesById(id: number): Observable<ObjRetornoFretes> {
    return this.httpClient.get<ObjRetornoFretes>(this.url + '/' + id)
      .pipe(
        catchError(this.handleError)
      )

  } 
    
  // salva  Fretes
  saveFretes(Fretes: Fretes): Observable<Fretes> {
    return this.httpClient.post<Fretes>(this.url, JSON.stringify(Fretes), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  // utualiza  Fretes
  updateFretes(Fretes: Fretes): Observable<Fretes> {
    return this.httpClient.put<Fretes>(this.url + '/' + Fretes.codigo, JSON.stringify(Fretes), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  // deleta Fretes
  deleteFretes(Fretes: Fretes) {
    return this.httpClient.delete<Fretes>(this.url + '/' + Fretes.codigo, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = error.error.mensagem ;
      if(error.status == 0) {
        errorMessage = "Erro no servidor remoto" ;
      }
      // errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    
    return throwError(errorMessage);
  };


}
