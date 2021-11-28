import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';

import { Empresas } from '../shared/Empresas';
import { ObjRetornoEmpresas } from '../shared/ObjRetornoEmpresas';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {

  url = 'http://localhost/Api_exclusao/public_html/api/Empresas'; // api rest 
  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }


  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json' ,
      'responseType' : 'application/json; charset=UTF-8;'
    })
  }

  // Obtem todos os Empresas
  getEmpresas(): Observable<ObjRetornoEmpresas> {
    return this.httpClient.get<ObjRetornoEmpresas>(this.url)
      .pipe(
        catchError(this.handleError))
  }

  // Obtem um Empresas pelo id
  getEmpresasById(id: number): Observable<ObjRetornoEmpresas> {
    return this.httpClient.get<ObjRetornoEmpresas>(this.url + '/' + id)
      .pipe(
        catchError(this.handleError)
      )

  } 
    
  // salva  Empresas
  saveEmpresas(Empresas: Empresas): Observable<Empresas> {
    return this.httpClient.post<Empresas>(this.url, JSON.stringify(Empresas), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  // utualiza  Empresas
  updateEmpresas(Empresas: Empresas): Observable<Empresas> {
    return this.httpClient.put<Empresas>(this.url + '/' + Empresas.codigo, JSON.stringify(Empresas), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  // deleta Empresas
  deleteEmpresas(Empresas: Empresas) {
    return this.httpClient.delete<Empresas>(this.url + '/' + Empresas.codigo, this.httpOptions)
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
