import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Nav2Component } from '../../navbar/nav2/nav2.component';
import { PartidoService } from '../../Services/Api/partidos.service';
import { BarraLateralComponent } from '../../Home-Page/barra-lateral/barra-lateral.component';

@Component({
  selector: 'app-ficha-dt',
  standalone: true,
  imports: [RouterModule, CommonModule, Nav2Component,BarraLateralComponent],
  templateUrl: './ficha-dt.component.html',
  styleUrl: './ficha-dt.component.css'
})
export class FichaDtComponent implements OnInit {

  dtName: string = ''; // Nombre del dt
  dtDetails: any = {}; // Detalles del dt
  loading: boolean = true; // Indicador de carga
  dtId: string = ''; // ID del dt
  dtCareer: any[] = []; // almacenar la carrera del DT


  // Constructor
  constructor(
    private route: ActivatedRoute, // Para acceder a los parámetros de la ruta
    private partidoService: PartidoService // Servicio para obtener los detalles del dt
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const dtId = params.get('id'); // Obtenemos el ID del parámetro de la URL
      console.log(dtId);  // Asegúrar de que se capture el ID
      if (dtId) {
        this.getDtDetails(dtId);  // Llamar a la API usando el ID
      }
    });
  }
  
  // Método para obtener los detalles del técnico por su ID
  getDtDetails(id: string): void {
    this.loading = true; // Inicia el estado de carga
  
    this.partidoService.getDtPorID(id).subscribe(
      (data) => {
        console.log('Respuesta completa de la API:', data); 
  
        if (data && data.response && data.response.length > 0) {
          const dtDetallado = data.response[0]; 
          console.log('Detalles del técnico encontrados:', dtDetallado);
  
          
          this.dtDetails = dtDetallado; 
          this.dtCareer = dtDetallado.career; 
        } else {
          console.warn('No se encontraron detalles para el técnico con ID:', id);
          this.dtDetails = null; // Reinicia detalles en caso de que no haya datos
          this.dtCareer = [];
        }
  
        this.loading = false; 
      },
      (error) => {
        console.error('Error al obtener los detalles del técnico:', error);
        this.loading = false; 
      }
    );
  }

  
}