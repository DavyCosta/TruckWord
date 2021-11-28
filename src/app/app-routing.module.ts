import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioComponent } from './shared/formulario/formulario.component';
import { FormularioEmpresasComponent } from './shared/formularioEmpresas/formularioEmpresas.component';
import { FormularioFretesComponent } from './shared/formularioFretes/formularioFretes.component';

import { HomeComponent } from './views/home/home.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', component: HomeComponent }, // Caso a rota seja 'www.seusite.com.br/'
    { path: 'Usuario', component: FormularioComponent },
    { path: 'Empresas', component: FormularioEmpresasComponent },
    { path: 'Fretes', component: FormularioFretesComponent }, // Caso a rota seja 'www.seusite.com.br/About'
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
