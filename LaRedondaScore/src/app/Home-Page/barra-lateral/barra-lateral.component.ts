import { Component, Injectable, OnInit } from '@angular/core';
import { PartidoService } from '../../Services/Api/partidos.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';


@Component({
  selector: 'app-barra-lateral',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule,RouterLink],
  templateUrl: './barra-lateral.component.html',
  styleUrl: './barra-lateral.component.css'
})

export class BarraLateralComponent implements OnInit {

 // Array de ligas que deseas mostrar, incluyendo el país
 PaisesDeseados: {country: string }[] = [
  {country: "England" },
  {country: "Italy" },
  {country: "Argentina" },
  {country: "Spain" },
  {country: "Germany" },
  {country: "France" },
  {country: "South-America" },
  {country: "Netherlands" },
  {country: "Portugal" },
  {country: "International" },
  {country: "World" }
];

 countries: any[] = []; // Variable para almacenar los paises
  leagues: any[] = []; // Variable para almacenar las ligas

  visibleCountry: string | null = null; // Controla qué país tiene ligas visibles

  // Constructor
  constructor(private partido: PartidoService) {}





  ngOnInit() {
    this.loadCountries();
  }

  // Metodo para obtener y cargar los paises
  loadCountries() { 
    this.partido.getCountries().subscribe(data => {
      console.log(data);
      const allCountries = data.response; // Asegúrate de que esto contenga el formato correcto
      this.countries = allCountries.filter((country: any) => 
        this.PaisesDeseados.some(p => p.country === country.name) // Asegúrate de que `country.name` sea la propiedad correcta
      );
    }, error => {
      console.error('Error al cargar los países:', error);
    });
}

// Metodos para ovtener y cargar las ligas filtradas por los equipos
loadleagues(country: string) {
  console.log(`Cargando ligas para el país: ${country}`);
  
  this.partido.getleagues().subscribe(data => {
    console.log('Datos de ligas recibidos:', data);
    
    const allleagues = data.response;
    this.leagues = allleagues.filter((league: any) => league.country.name === country);
    
    
    console.log('Ligas filtradas:', this.leagues);
    
    // Verifica si las ligas están vacías
    if (this.leagues.length === 0) {
      console.warn(`No se encontraron ligas para el país: ${country}`);
    }

    if (this.visibleCountry === country) {
      this.visibleCountry = null; // Oculta ligas si se vuelve a hacer clic
      this.leagues = []; // Limpia las ligas
    } else {
      this.visibleCountry = country; // Establece el país visible
    }
  }, error => {
    console.error('Error al cargar las ligas:', error);
  });
}
}