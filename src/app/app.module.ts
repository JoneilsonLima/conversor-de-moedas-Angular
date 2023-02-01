import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/paginas/home/home.component';
import { ListagemMoedasComponent } from './components/paginas/listagem-moedas/listagem-moedas.component';
import { MatTableModule } from '@angular/material/table';
import { FooterComponent } from './components/footer/footer.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TabelaMoedasComponent } from './components/paginas/listagem-moedas/tabela-moedas/tabela-moedas.component';
import { ConverterMoedasComponent } from './components/paginas/converter-moedas/converter-moedas.component';

import { ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSortModule} from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { HistoricoComponent } from './components/paginas/historico/historico.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ListagemMoedasComponent,
    FooterComponent,
    TabelaMoedasComponent,
    ConverterMoedasComponent,
    HistoricoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatTooltipModule,
    MatSortModule,
    FormsModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
