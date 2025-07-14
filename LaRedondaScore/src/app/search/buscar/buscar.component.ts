import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PartidoService } from '../../Services/Api/partidos.service';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-buscar',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule,RouterLink],
  templateUrl: './buscar.component.html',
  styleUrl: './buscar.component.css'
})
export class BuscarComponent {

  equipos: any[] = []; // Array para almacenar los equipos
  filteredEquipos: any[] = []; // Equipos filtrados basados en la búsqueda
  jugadores: any[] = []; // Array para almacenar los jugadores
  filteredJugadores: any[] = []; // Jugadores filtrados basados en la búsqueda
  searchTerm: string = ''; // Término de búsqueda
  filteredDts: any[] = []; // Jugadores filtrados basados en la búsqueda
  dts: any[] = []; // Array para almacenar los dts
  loading: boolean = false; // Indicador de carga
  
  // Constructor
  constructor(private equipoService: PartidoService ) {}

  // Metodo para buscar equipos y jugadores, y luego acceder a la ficha correspondiente
  onInputChange() {   
    if (this.searchTerm.length > 2) { // Solo realiza la búsqueda si el término tiene más de 2 caracteres
      console.log("Buscando jugadores con término:", this.searchTerm);
        this.loading = true;  // Inicia el indicador de carga
            // Buscar equipos
        this.equipoService.getEquiposPorNombre(this.searchTerm).subscribe(data => {
          // Asegúrar de que la respuesta tenga la propiedad 'response' y contiene los equipos
          if (data && data.response && data.response.length > 0) {
            // Accede al equipo desde 'data.response[0].team'
            this.filteredEquipos = data.response.map((item: any) => item.team); // Extrae solo los equipos
          } else {
            this.filteredEquipos = []; // Si no se encuentran equipos, limpia la lista
          }
          this.loading = false; // Detiene el indicador de carga
        },
        error => {
          console.error('Error al buscar equipos', error);
          this.loading = false;
        }
      );
      

      
      this.equipoService.getDtPorNombre(this.searchTerm).subscribe(data => {
        if (data && data.response && data.response.length > 0) {
            // Muestra los tecnicos encontrados
            this.filteredDts = data.response.map((item: any) => item);
        } else {
            this.filteredDts = [];  // Si no se encuentran tecnicos, limpia la lista
        } 
        
    }, error => {
        console.error('Error al buscar tecnicos', error);
        this.filteredDts = []; // Si no se encuentran tecnicos, limpia la lista
        this.loading = false; // Detiene el indicador de carga
    });


      // Buscar jugadores
      this.equipoService.getJugadoresPorNombre(this.searchTerm).subscribe(data => {
        if (data && data.response && data.response.length > 0) {
            // Muestra los jugadores encontrados
            this.filteredJugadores = data.response.map((item: any) => item.player);
        } else {
            this.filteredJugadores = [];  // Si no se encuentran jugadores, limpia la lista
        } 
        this.loading = false; // Detiene el indicador de carga
    }, error => {
        console.error('Error al buscar jugadores', error);
        this.filteredJugadores = []; // Si no se encuentran jugadores, limpia la lista
        this.loading = false; // Detiene el indicador de carga
    });
}
  }
}

