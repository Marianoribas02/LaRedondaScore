import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PartidosComponent } from '../partidos/partidos.component';
import { BarraLateralComponent } from '../barra-lateral/barra-lateral.component';
import { NavComponent } from '../../navbar/nav/nav.component';
import { BuscarComponent } from '../../search/buscar/buscar.component';
import { LoginPageComponent } from "../../Login/login-page/login-page.component";
import { EquiposFavoritosComponent } from '../equipos-favoritos/equipos-favoritos.component';

@Component({
  selector: 'app-pagina-principal',
  standalone: true,
  imports: [RouterModule, CommonModule, PartidosComponent, BarraLateralComponent, NavComponent, BuscarComponent, LoginPageComponent,EquiposFavoritosComponent],
  templateUrl: './pagina-principal.component.html',
  styleUrl: './pagina-principal.component.css'
})
export class PaginaPrincipalComponent {

}
