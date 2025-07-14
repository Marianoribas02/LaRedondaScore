import { UserService } from './../../Services/users-services/user.service';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { BuscarComponent } from '../../search/buscar/buscar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterModule, BuscarComponent,CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  constructor(private userService: UserService) {} // Inyecta UserService

  // Método para cerrar sesión
  logout() {
    this.userService.logout(); // Llama al método logout del servicio
  }


 // Variable para controlar la visibilidad del menú
 isMenuVisible: boolean = false;

 // Función para alternar la visibilidad del menú
 toggleMenu() {
   this.isMenuVisible = !this.isMenuVisible;
 }


}
