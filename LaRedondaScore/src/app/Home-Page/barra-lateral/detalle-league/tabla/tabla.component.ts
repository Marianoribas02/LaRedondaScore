import { PartidoService } from './../../../../Services/Api/partidos.service';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.css'
})
export class TablaComponent implements OnInit{


  @Input() leagueId: string | null = null;  // Recibe el ID de la liga
  @Input() currentSeason: number = 2022;  // Recibe la temporada actual
  tabla: any[] = [];  // Guardará la tabla de posiciones

  constructor(private partidoService: PartidoService) {}

  ngOnInit() {
    if (this.leagueId) {
      this.loadTablaPosiciones();
    }
  }

 // Detecta cambios en los Inputs
 ngOnChanges(changes: SimpleChanges) {
  if (changes['currentSeason'] || changes['leagueId']) {
    this.loadTablaPosiciones(); // Recarga la tabla cuando cambian la temporada o el ID de la liga
  }
 }



  loadTablaPosiciones() {
    const season = this.currentSeason.toString();
    const validLeagueId = this.leagueId ? Number(this.leagueId) : null;

    if (validLeagueId && season) {
      this.partidoService.getStandings(validLeagueId, season).subscribe(
        (data: any) => {
          console.log('Tabla de posiciones:', data);
          // Accede correctamente a la tabla de posiciones
          this.tabla = data.response[0]?.league?.standings || [];
        },
        error => {
          console.error('Error al cargar la tabla de posiciones:', error);
        }
      );
    }
  }



}
