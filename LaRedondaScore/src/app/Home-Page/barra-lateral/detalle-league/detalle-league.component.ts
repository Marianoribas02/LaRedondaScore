import { PartidoService } from './../../../Services/Api/partidos.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TablaComponent } from "./tabla/tabla.component"; // Ajusta la ruta a tu servicio
import { Nav2Component } from '../../../navbar/nav2/nav2.component';

@Component({
  selector: 'app-detalle-league',
  standalone: true,
  templateUrl: './detalle-league.component.html',
  imports: [RouterModule, CommonModule, TablaComponent,Nav2Component],
  styleUrls: ['./detalle-league.component.css']
})
export class DetallesLeagueComponent implements OnInit {

  league: any = {}; // Guarda los detalles de la liga
  seasonStats: any = {}; // Guarda las estadísticas de la temporada, inicialmente null
  leagueId: string | null = null;
  matches: any[] = []; // Declara la propiedad matches como un array
  partidos: any[] = [];
  currentSeason: number = 2025; // Temporada inicial, puedes ajustarlo si es necesario
  minSeason: number = 2000; // Temporada mínima
  maxSeason: number = 2025; // Temporada máxima
  currentRound: string = 'Regular Season - 1';  // Inicia en la primera ronda
  rounds: string[] = []; // Almacena las rondas disponibles



  constructor(
    private partidoService: PartidoService, // Servicio para interactuar con la API
    private route: ActivatedRoute // Para obtener el id de la liga desde la ruta
  ) {}

  ngOnInit() {
    this.leagueId = this.route.snapshot.paramMap.get('id');
    if (this.leagueId) {
      console.log(this.leagueId);
      this.loadLeagueDetails(this.leagueId);
      this.loadSeasonStats(this.leagueId);
      this.loadRounds(); // Cargar las rondas al iniciar el componente
    }
  }

  // Método para cargar los detalles de la liga
  loadLeagueDetails(id: string) {
    this.partidoService.getLeagueDetails(id).subscribe((data: any) => {
      this.league = data.response[0]; // Asegúrate de acceder al dato correctamente
      console.log('Datos de la liga load:', this.league);
    }, error => {
      console.error('Error al cargar los detalles de la liga:', error);
    });
  }

  
  loadSeasonStats(id: string) {
    this.partidoService.getSeasonStats(id).subscribe((data: any) => {
      if (data.response && data.response.length > 0) {
        this.seasonStats = data.response[0];  // Asignar la respuesta
        console.log('Datos de la liga:', this.seasonStats);
      } else {
        console.log('No se encontraron datos para esta liga');
      }
    }, error => {
      console.error('Error al cargar las estadísticas de la temporada:', error);
    });
  }
  loadMatches(): void {
  const validLeagueId = this.leagueId ? Number(this.leagueId) : null;
  const season = this.currentSeason.toString();
  if (validLeagueId && season) {
    this.partidoService.getPartidosPorRonda(validLeagueId, season, this.currentRound).subscribe(
      data => {
        console.log('Respuesta de la API de partidos:', data);
        if (data && data.response && data.response.length > 0) {
          this.partidos = data.response;
        } else {
          console.warn('No hay partidos disponibles para esta liga.');
          this.partidos = [];
        }
      },
      error => {
        console.error('Error al cargar los partidos:', error);
      }
    );
  } else {
    console.error('El id de la liga o la temporada no es válido.');
  }
}

  
 changeSeason(direction: number) {
  const newSeason = this.currentSeason + direction;
  if (newSeason >= this.minSeason && newSeason <= this.maxSeason) {
    this.currentSeason = newSeason;
    this.currentRound  = '';   // limpias la ronda actual
    this.rounds        = [];   // limpias la lista de rondas
    this.loadRounds();        // ← pedís las rondas del nuevo año
  }
}




  loadRounds(): void {
    const validLeagueId = this.leagueId ? Number(this.leagueId) : null;
    const season = this.currentSeason.toString();
    if (validLeagueId && season) {
      this.partidoService.getRounds(validLeagueId, season).subscribe(
        data => {
          if (data.response && data.response.length > 0) {
            this.rounds = data.response; // Rondas disponibles
            console.log('Rondas disponibles:', this.rounds);
            this.currentRound = this.rounds[0]; // Establece la primera ronda como predeterminada al cargar nuevas rondas
            this.loadMatches(); // Cargar los partidos de la primera ronda
          }
        },
        error => {
          console.error('Error al cargar las rondas:', error);
        }
      );
    }
  }

  selectRound(round: string): void {
    this.currentRound = round; // Actualiza la ronda seleccionada
    this.loadMatches(); // Recargar los partidos para la nueva ronda
  }


   // Funciones para cambiar de round
   goToPreviousRound(): void {
    const currentIndex = this.rounds.indexOf(this.currentRound);
    if (currentIndex > 0) {
      this.currentRound = this.rounds[currentIndex - 1];
      this.loadMatches(); // Recargar los partidos para la nueva ronda
    }
  }

  goToNextRound(): void {
    const currentIndex = this.rounds.indexOf(this.currentRound);
    if (currentIndex < this.rounds.length - 1) {
      this.currentRound = this.rounds[currentIndex + 1];
      this.loadMatches(); // Recargar los partidos para la nueva ronda
    }
  }


}
