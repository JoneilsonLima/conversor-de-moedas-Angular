import { ConverterMoedasComponent } from './components/paginas/converter-moedas/converter-moedas.component';
import { ListagemMoedasComponent } from './components/paginas/listagem-moedas/listagem-moedas.component';
import { HomeComponent } from './components/paginas/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'listagem-moedas', component: ListagemMoedasComponent},
  {path: 'converter-moedas', component: ConverterMoedasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
