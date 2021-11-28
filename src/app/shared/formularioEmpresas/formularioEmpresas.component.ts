import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EmpresasService } from 'src/app/services/Empresas.service';
import { Empresas } from '../Empresas';

import { ObjRetornoEmpresas } from '../ObjRetornoEmpresas';

@Component({
  selector: 'app-formularioEmpresas',
  templateUrl: './formularioEmpresas.component.html',
  styleUrls: ['./formularioEmpresas.component.css']
})
export class FormularioEmpresasComponent implements OnInit {

  //cliente: Cliente;
  empresa: Empresas ;
  todosEmpresas: Empresas[];
  textoBotao:string = "Salvar";
  erroMensagem:string ='' ;
  
  constructor( private empresasService: EmpresasService ) {       }
  
  ngOnInit(): void {
    //this.cliente = new Cliente();
    this.empresa = new Empresas();
    this.buscarTodosEmpresas() ;
  }
  
  buscarTodosEmpresas(){
    this.empresasService.getEmpresas().subscribe((r: ObjRetornoEmpresas) => {
      if( r.sucesso){
       this.todosEmpresas = r.dados ; 
       console.log(this.todosEmpresas);
      }
    },
    (erro: any) => {
      this.erroMensagem= erro  ;
    }
    );
  }


  buscar(){
    this.empresasService.getEmpresasById(this.empresa.codigo).subscribe(
      (resp: ObjRetornoEmpresas) => {
      if( resp.sucesso){
        this.empresa.cnpj = resp.dados["cnpj"] ;
        this.empresa.nome = resp.dados["nome"] ;
        this.empresa.usuario = resp.dados["usuario"] ;
        this.empresa.cep = resp.dados["cep"] ;
        this.empresa.celular = resp.dados["celular"] ;
        this.empresa.telefone = resp.dados["telefone"] ;
        this.empresa.senha = resp.dados["senha"] ;
        this.erroMensagem= "Buscado com sucesso"  ;
      }
    },
      (erro: any) => {
        this.erroMensagem= erro  ;
      }
    );
  }
  onSubmit(f) {

    if(this.textoBotao === "Salvar"){
      this.empresa.codigo =  0 ;
     
      this.empresasService.saveEmpresas(this.empresa).subscribe(( resp) => {
        console.log(resp) ;
        this.buscarTodosEmpresas() ;
        this.erroMensagem= ""  ;
      });
      this.empresa = new Empresas();
    }
    if(this.textoBotao === "Alterar"){
           
      this.empresasService.updateEmpresas(this.empresa).subscribe(( resp) => {
        console.log(resp) ;
        this.buscarTodosEmpresas() ;
      });
      this.empresa = new Empresas();
    }
    if(this.textoBotao === "Excluir"){
           
      this.empresasService.deleteEmpresas(this.empresa).subscribe(( resp) => {
        console.log(resp) ;
        this.buscarTodosEmpresas() ;
      });
      this.empresa = new Empresas();
    }
    this.textoBotao= "Salvar" ;
    f.resetForm();
  }

  selecionarEdicao(codigo){
    this.textoBotao = "Alterar" ;
    this.empresa = this.todosEmpresas.find(a => a.codigo == codigo) ;
    this.erroMensagem= ""  ;
  }

  excluir(codigo){
    this.textoBotao = "Excluir" ;
    this.empresa = this.todosEmpresas.find(a => a.codigo == codigo) ;
    this.erroMensagem= ""  ;
  }
  cancelar(f){
    this.empresa.codigo = 0 ;
    this.empresa.cnpj = '' ;
    this.empresa.nome = '' ;
    this.empresa.usuario = '' ;
    this.empresa.cep = '' ;
    this.empresa.celular = '' ;
    this.empresa.telefone = '' ;
    this.empresa.senha = '' ;
    this.textoBotao= "Salvar" ;
    this.buscarTodosEmpresas();
    this.erroMensagem= ""  ;;
    f.resetForm();
  }

}
