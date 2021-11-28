import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FretesService } from 'src/app/services/Fretes.service';
import { Fretes } from '../Fretes';
import { AppModule } from 'src/app/app.module';
import { ObjRetornoFretes } from '../ObjRetornoFretes';

@Component({
  selector: 'app-formularioFretes',
  templateUrl: './formularioFretes.component.html',
  styleUrls: ['./formularioFretes.component.css']
})
export class FormularioFretesComponent implements OnInit {

  //cliente: Cliente;
  frete: Fretes ;
  todosFretes: Fretes[];
  textoBotao:string = "Salvar";
  erroMensagem:string ='' ;
  
  constructor( private fretesService: FretesService ) {       }
  
  ngOnInit(): void {
    //this.cliente = new Cliente();
    this.frete = new Fretes();
    this.buscarTodosFretes() ;
  }
  
  buscarTodosFretes(){
    this.fretesService.getFretes().subscribe((r: ObjRetornoFretes) => {
      if( r.sucesso){
       this.todosFretes = r.dados ; 
       console.log(this.todosFretes);
      }
    },
    (erro: any) => {
      this.erroMensagem= erro  ;
    }
    );
  }


  buscar(){
    this.fretesService.getFretesById(this.frete.codigo).subscribe(
      (resp: ObjRetornoFretes) => {
      if( resp.sucesso){
        this.frete.descricao = resp.dados["descricao"] ;
        this.frete.empresa = resp.dados["empresa"] ;
        this.frete.valor = resp.dados["valor"] ;
        this.frete.peso = resp.dados["peso"] ;
        this.frete.distancia = resp.dados["distancia"] ;
        this.frete.combustivelGasto = resp.dados["combustivelGasto"] ;
        this.frete.localColeta = resp.dados["localColeta"] ;
        this.frete.dataColeta = resp.dados["dataColeta"] ;
        this.frete.localEntrega = resp.dados["localEntrega"] ;
        this.frete.dataEntrega = resp.dados["dataEntrega"] ;
        
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
      this.frete.codigo =  0 ;
     
      this.fretesService.saveFretes(this.frete).subscribe(( resp) => {
        console.log(resp) ;
        this.buscarTodosFretes() ;
        this.erroMensagem= ""  ;
      });
      this.frete = new Fretes();
    }
    if(this.textoBotao === "Alterar"){
           
      this.fretesService.updateFretes(this.frete).subscribe(( resp) => {
        console.log(resp) ;
        this.buscarTodosFretes() ;
      });
      this.frete = new Fretes();
    }
    if(this.textoBotao === "Excluir"){
           
      this.fretesService.deleteFretes(this.frete).subscribe(( resp) => {
        console.log(resp) ;
        this.buscarTodosFretes() ;
      });
      this.frete = new Fretes();
    }
    this.textoBotao= "Salvar" ;
    f.resetForm();
  }

  selecionarEdicao(codigo){
    this.textoBotao = "Alterar" ;
    this.frete = this.todosFretes.find(a => a.codigo == codigo) ;
    this.erroMensagem= ""  ;
  }

  excluir(codigo){
    this.textoBotao = "Excluir" ;
    this.frete = this.todosFretes.find(a => a.codigo == codigo) ;
    this.erroMensagem= ""  ;
  }
  cancelar(f){
    this.frete.codigo = 0 ;
    this.frete.descricao = '' ;
    this.frete.empresa = '' ;
    this.frete.valor = 0 ;
    this.frete.peso = 0 ;
    this.frete.distancia = 0 ;
    this.frete.combustivelGasto = 0 ;
    this.frete.localColeta = '' ;
    this.frete.dataColeta = '' ;
    this.frete.localEntrega = '' ;
    this.frete.dataEntrega = '' ;
    this.textoBotao= "Salvar" ;
    this.buscarTodosFretes();
    this.erroMensagem= ""  ;;
    f.resetForm();
  }

}

