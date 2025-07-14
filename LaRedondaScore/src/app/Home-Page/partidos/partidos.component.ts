import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {OnInit } from '@angular/core';
import { PartidoService } from '../../Services/Api/partidos.service';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-partidos',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './partidos.component.html',
  styleUrl: './partidos.component.css'
})
 export class PartidosComponent  implements OnInit {

// Array de ligas que deseas mostrar, incluyendo el país
ligasDeseadas: { name: string; country: string }[] = [
  { name: "Premier League", country: "England" },
  { name: "Serie A", country: "Italy" },
  { name: "Liga Profesional Argentina", country: "Argentina" },
  { name: "La Liga", country: "Spain" },
  { name: "Bundesliga", country: "Germany" },
  { name: "Ligue 1", country: "France" },
  { name: "CONMEBOL Sudamericana", country: "World" },
  { name: "CONMEBOL Libertadores", country: "World" },
  { name: "Eredivisie", country: "Netherlands" },
  { name: "Primeira Liga", country: "Portugal" },
  { name: "World Cup", country: "International" },
  { name: "Ligue 2", country: "France" },
  { name: "UEFA Champions League", country: "World" },
  { name: "Primera B Metropolitana", country: "Argentina" },
  { name: "Copa De La Liga Profesional", country: "Argentina" },
  { name: "Copa Argentina", country: "Argentina" },
  { name: "Torneo Federal A", country: "Argentina" },
  { name: "Primera D", country: "Argentina" },
  { name: "Primera C", country: "Argentina" },
  { name: "Primera Nacional", country: "Argentina" },
  { name: "Primera B Metropolitana", country: "Argentina" },
  { name: "Süper Lig", country: "Turkey"},
  { name: "Premier League", country: "Singapore" },
  { name: "Prva Liga", country: "Serbia" },
  { name: "Liga de Primera(Chile)", country: "Chile" }

];


 partidosPorLiga: { [liga: string]: any[] } = {};  // Propiedad para almacenar los partidos organizados por liga

fechaSeleccionada: string;

constructor(private partidoService: PartidoService, private router: Router) {
let fechaActual = new Date();
  fechaActual.setHours(fechaActual.getHours() - 3); // Ajuste de 3 horas para horario de Argentina
  this.fechaSeleccionada = fechaActual.toISOString().split('T')[0]; // Fecha actual en formato YYYY-MM-DD

}



ngOnInit(): void {
  this.cargarPartidosDelDia(this.fechaSeleccionada); // Cargar los partidos del día actual
}



cargarPartidosDelDia(fecha: string): void {
  this.partidoService.getPartidosDelDia(fecha).subscribe((data) => {
    const partidos = data.response;
   console.log('Partidos recibidos:', partidos);
    this.partidosPorLiga = partidos.reduce((acc: any, partido: any) => {
      const ligaNombre = partido.league.name;
      const paisNombre = partido.league.country;
      const ligaClave = `${ligaNombre} (${paisNombre})`;


       const ligaDeseada = this.ligasDeseadas.find((liga) => 
          liga.name === ligaNombre && liga.country === paisNombre)|| paisNombre === "World";

         if (ligaDeseada) {
      if (!acc[ligaClave]) acc[ligaClave] = [];
      acc[ligaClave].push(partido);
         }
      return acc;
    }, {});
  });
}



// Metodo para ir hacia el día siguiente
siguienteDia(): void {
  const nuevaFecha = new Date(this.fechaSeleccionada);
  nuevaFecha.setDate(nuevaFecha.getDate() + 1);
  this.fechaSeleccionada = nuevaFecha.toISOString().split('T')[0];
  this.cargarPartidosDelDia(this.fechaSeleccionada); // Recargar los partidos del día siguiente
}

// Metodo para ir hacia el día anterior


anteriorDia(): void {
  const nuevaFecha = new Date(this.fechaSeleccionada);
  nuevaFecha.setDate(nuevaFecha.getDate() - 1);
  this.fechaSeleccionada = nuevaFecha.toISOString().split('T')[0];
  this.cargarPartidosDelDia(this.fechaSeleccionada); // Recargar los partidos del día anterior
}





// Metodo para obtener el estado del partido
getEstadoPartido(fechaPartido: string, golesHome: number, golesAway: number, status: { long: string, short: string, elapsed: number, extra?: number }): string {
  const fechaPartidoDate = new Date(fechaPartido);
  const fechaActual = new Date();

  // Si el partido no ha comenzado
  if (fechaPartidoDate > fechaActual) {
      return fechaPartidoDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  // Mostrar el estado del partido según las propiedades del objeto status
  switch (status.short) {
    case 'HT': // Medio tiempo
      return `Entretiempo`;
    case '1H': // Primera mitad
      return ` ${status.elapsed}'`;
    case '2H': // Segunda mitad
      return ` ${status.elapsed}'`;
    case 'ET': // Tiempo extra
    return `${status.elapsed}' ${status.extra ? `(+${status.extra})` : ''} (Tiempo Extra)`;
    case 'PEN': // Penales
      return "Penales";
    case 'FT': // Finalizado
      return "Finalizado";
    default:
      return "Estado desconocido";
  }
}

// Método para redirigir a otro componente
irAEquipo(id: string) {
  // Redirigir a la ruta del equipo usando su nombre o cualquier otro identificador
  this.router.navigate([`/ficha-equipo/${id}`]);
}

}
 
