import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';

import { Usuario } from '../shared/Usuario';
import { ObjRetornoUsuario } from '../shared/ObjRetornoUsuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url = 'http://localhost/Api_exclusao/public_html/api/Usuario'; // api rest 
  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }


  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json' ,
      'responseType' : 'application/json; charset=UTF-8;'
    })
  }

  // Obtem todos os Usuario
  getUsuario(): Observable<ObjRetornoUsuario> {
    return this.httpClient.get<ObjRetornoUsuario>(this.url)
      .pipe(
        catchError(this.handleError))
  }

  // Obtem um Usuario pelo id
  getUsuarioById(id: number): Observable<ObjRetornoUsuario> {
    return this.httpClient.get<ObjRetornoUsuario>(this.url + '/' + id)
      .pipe(
        catchError(this.handleError)
      )

  } 
    
  // salva  Usuario
  saveUsuario(Usuario: Usuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>(this.url, JSON.stringify(Usuario), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  // utualiza  Usuario
  updateUsuario(Usuario: Usuario): Observable<Usuario> {
    return this.httpClient.put<Usuario>(this.url + '/' + Usuario.codigo, JSON.stringify(Usuario), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  // deleta Usuario
  deleteUsuario(Usuario: Usuario) {
    return this.httpClient.delete<Usuario>(this.url + '/' + Usuario.codigo, this.httpOptions)
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
