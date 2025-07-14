import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PartidoService } from '../../Services/Api/partidos.service';
import { CommonModule } from '@angular/common';
import { Nav2Component } from '../../navbar/nav2/nav2.component';
import { BarraLateralComponent } from '../../Home-Page/barra-lateral/barra-lateral.component';

@Component({
  selector: 'app-ficha-player',
  standalone: true,
  imports: [RouterModule,CommonModule,Nav2Component,BarraLateralComponent],
  templateUrl: './ficha-player.component.html',
  styleUrl: './ficha-player.component.css'
})
export class FichaPlayerComponent implements OnInit {

  jugadorName: string = ''; // Nombre del jugador
  jugadorDetails: any = {}; // Detalles del jugador
  loading: boolean = true; // Indicador de carga
  jugadorId: string = ''; // ID del jugador


  // Constructor
  constructor(
    private route: ActivatedRoute, // Para acceder a los parámetros de la ruta
    private partidoService: PartidoService // Servicio para obtener los detalles del jugador
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const jugadorId = params.get('id'); // Obtenemos el ID del parámetro de la URL
      console.log(jugadorId);  // Asegúrate de que se capture el ID
      if (jugadorId) {
        this.getJugadorDetails(jugadorId);  // Llama a la API usando el ID
      }
    });
  }

  // Metodo que obtiene los detalles del jugador a traves de su ID
  getJugadorDetails(id: string): void {
    this.loading = true;
    this.partidoService.getJugadoresPorID(id).subscribe(data => {
        if (data && data.response && data.response.length > 0) {
            const jugadorDetallado = data.response[0].player;
            this.jugadorDetails = jugadorDetallado;  // Muestra los detalles del jugador
        }
        this.loading = false;
    }, error => {
        console.error('Error al obtener los detalles del jugador', error);
        this.loading = false;
    });
  }

  
}
