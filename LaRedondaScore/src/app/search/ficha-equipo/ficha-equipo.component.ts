import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PartidoService } from '../../Services/Api/partidos.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../Services/users-services/user.service';
import { EquiposService } from '../../Services/lista-favoritos/equipos.service';
import { Nav2Component } from '../../navbar/nav2/nav2.component';
import { BarraLateralComponent } from '../../Home-Page/barra-lateral/barra-lateral.component';

@Component({
  selector: 'app-ficha-equipo',
  standalone: true,
  imports: [RouterModule,CommonModule,Nav2Component,BarraLateralComponent],
  templateUrl: './ficha-equipo.component.html',
  styleUrl: './ficha-equipo.component.css'
})
export class FichaEquipoComponent implements OnInit {


  teamName: string = ''; // Nombre del equipo a mostrar
  idTeam: string = ''; // ID del equipo a mostrar
  equipoDetails: any = {}; // Detalles del equipo que obtendremos de la API
  userId: string | null = null; // ID del usuario logueado
  message:string=''; 
  equiposFavoritos: { [key: string]: { nombre: string; imagen: string, } } = {};
  mensaje: string = ''; // Para mostrar mensajes de feedback
  isFavorite: boolean = false; // Indica si el equipo ya es favorito


  // Constructor
  constructor(
    private route: ActivatedRoute,
    private partidoService: PartidoService ,
    private user:UserService,
    private equipo:EquiposService
  ) {}
  

  ngOnInit(): void {

    this.userId = localStorage.getItem('userId');
    console.log( this.userId);
    // Obtener el nombre del equipo desde la URL
    this.route.paramMap.subscribe(params => {
      this.idTeam = params.get('id') || ''; // Obtiene el parámetro 'teamName' de la URL
      console.log(this.idTeam);

      if (this.idTeam) {
        // Llama a la API para obtener los detalles del equipo
        this.getEquipoDetails(this.idTeam);
        console.log(this.idTeam);
      }
    });

    if (this.userId) {
      this.cargarEquiposFavoritos(this.userId);
    }

  }


  // Metodo para obtener los detalles del equipo
  getEquipoDetails(id: string): void {
    this.partidoService.getEquiposPorID(id).subscribe(
      data => {
        if (data && data.response && data.response.length > 0) {
          this.equipoDetails = data.response[0];
          this.checkIfFavorite();
        }
      },
      error => {
        console.error('Error al obtener detalles del equipo', error);
      }
    );
  }


  // Metodo para cargar los equipos favoritos de la sesion activa
  cargarEquiposFavoritos(userId: string) {
    this.equipo.getFavoriteTeams(userId).subscribe(
      (favoritos) => {
        this.equiposFavoritos = favoritos;
        // Después de cargar favoritos, chequear si el equipo actual ya está favorito
      this.checkIfFavorite();
      },
      (error) => {
        this.mensaje = 'Error al cargar los equipos favoritos';
        console.error(error);
      }
    );
  }

  // Metodo para agregar equipo a la lista de favoritos de la sesion activa.
  agregarEquipoAFavoritos(teamName: string, teamImage: string, teamId:string) {
    const userId = (localStorage.getItem('userId'));
    console.log(userId);
    if (userId) {
      this.equipo.addFavoriteTeam(userId, teamName, teamImage, teamId).subscribe(
        (response) => {
          this.mensaje = response.message || 'Equipo añadido a favoritos';
          this.isFavorite = true;
          this.cargarEquiposFavoritos(userId);
        },
        (error) => this.mensaje = 'Error al añadir el equipo a favoritos'
      );
    } else {
      this.mensaje = 'Usuario no encontrado';
    }
    
  }

  // Meodo para mostrar la lista de favoritos de la sesion activa
  mostrarFavoritos(): void {
    const userId = (localStorage.getItem('userId'));
    
    if (userId) {
      this.equipo.getFavoriteTeams(userId).subscribe(
        (favoritos) => {
          if (Object.keys(favoritos).length > 0) { // Verifica si hay equipos favoritos
            console.log('Equipos favoritos:', favoritos);
          } else {
            console.log('No tiene equipos favoritos');
          }
        },
        (error) => {
          console.error('Error al obtener los favoritos', error);
        }
      );
    } else {
      console.warn('Usuario no autenticado');
    }
  }

  // Metodo que verifica si el equipo es favorito
  checkIfFavorite() {
    if (this.equipoDetails?.team?.name && this.equiposFavoritos) {
      const equipoName = this.equipoDetails.team.name;
      this.isFavorite = Object.values(this.equiposFavoritos).some(
        fav => fav.nombre.toLowerCase() === equipoName.toLowerCase()
      );
      console.log(`¿Es favorito?: ${this.isFavorite}`);
    }
  }

}