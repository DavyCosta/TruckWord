import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioService } from 'src/app/services/Usuario.service';
import { Usuario } from '../Usuario';

import { ObjRetornoUsuario } from '../ObjRetornoUsuario';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  //cliente: Cliente;
  usuario: Usuario ;
  todosUsuario: Usuario[];
  textoBotao:string = "Salvar";
  erroMensagem:string ='' ;
  
  constructor( private usuarioService: UsuarioService ) {       }
  
  ngOnInit(): void {
    //this.cliente = new Cliente();
    this.usuario = new Usuario();
    this.buscarTodosUsuario() ;
  }
  
  buscarTodosUsuario(){
    this.usuarioService.getUsuario().subscribe((r: ObjRetornoUsuario) => {
      if( r.sucesso){
       this.todosUsuario = r.dados ; 
       console.log(this.todosUsuario);
      }
    },
    (erro: any) => {
      this.erroMensagem= erro  ;
    }
    );
  }


  buscar(){
    this.usuarioService.getUsuarioById(this.usuario.codigo).subscribe(
      (resp: ObjRetornoUsuario) => {
      if( resp.sucesso){
        this.usuario.cpf = resp.dados["cpf"] ;
        this.usuario.nome = resp.dados["nome"] ;
        this.usuario.usuario = resp.dados["usuario"] ;
        this.usuario.cep = resp.dados["cep"] ;
        this.usuario.celular = resp.dados["celular"] ;
        this.usuario.telefone = resp.dados["telefone"] ;
        this.usuario.cnh = resp.dados["cnh"] ;
        this.usuario.categoria = resp.dados["categoria"] ;
        this.usuario.marca = resp.dados["marca"] ;
        this.usuario.modelo = resp.dados["modelo"] ;
        this.usuario.carroceria = resp.dados["carroceria"] ;
        this.usuario.placa = resp.dados["placa"] ;
        this.usuario.media = resp.dados["media"] ;
        this.usuario.senha = resp.dados["senha"] ;
        this.erroMensagem= "Buscado com sucesso"  ;
      }
    },
      (erro: any) => {
        this.erroMensagem= erro  ;
      }
    );
  }
//ERRO ESTÁ AQUI DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD
  onSubmit(f) {

    if(this.textoBotao === "Salvar"){
      this.usuario.codigo =  0 ;
     
      this.usuarioService.saveUsuario(this.usuario).subscribe(( resp) => {
        console.log(resp) ;
        this.buscarTodosUsuario() ;
        this.erroMensagem= ""  ;
      });
      this.usuario = new Usuario();
    }
    if(this.textoBotao === "Alterar"){
           
      this.usuarioService.updateUsuario(this.usuario).subscribe(( resp) => {
        console.log(resp) ;
        this.buscarTodosUsuario() ;
      });
      this.usuario = new Usuario();
    }
    if(this.textoBotao === "Excluir"){
           
      this.usuarioService.deleteUsuario(this.usuario).subscribe(( resp) => {
        console.log(resp) ;
        this.buscarTodosUsuario() ;
      });
      this.usuario = new Usuario();
    }
    this.textoBotao= "Salvar" ;
    f.resetForm();
  }

  selecionarEdicao(codigo){
    this.textoBotao = "Alterar" ;
    this.usuario = this.todosUsuario.find(a => a.codigo == codigo) ;
    this.erroMensagem= ""  ;
  }

  excluir(codigo){
    this.textoBotao = "Excluir" ;
    this.usuario = this.todosUsuario.find(a => a.codigo == codigo) ;
    this.erroMensagem= ""  ;
  }
  cancelar(f){
    this.usuario.codigo = 0 ;
    this.usuario.cpf = '' ;
    this.usuario.nome = '' ;
    this.usuario.usuario = '' ;
    this.usuario.cep = '' ;
    this.usuario.celular = '' ;
    this.usuario.telefone = '' ;
    this.usuario.cnh = '' ;
    this.usuario.categoria = '' ;
    this.usuario.marca = '' ;
    this.usuario.modelo = '' ;
    this.usuario.carroceria = '' ;
    this.usuario.placa = '' ;
    this.usuario.media = 0 ;
    this.usuario.senha = '' ;
    this.textoBotao= "Salvar" ;
    this.buscarTodosUsuario();
    this.erroMensagem= ""  ;;
    f.resetForm();
  }

}
