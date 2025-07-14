import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/users-services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Nav2Component } from '../../navbar/nav2/nav2.component';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule,FormsModule,Nav2Component],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {

  user: any;  // Información del usuario logueado
  newPassword: string = '';  // Nueva contraseña a modificar
  passwordChanged: boolean = false;  // Indicador para mostrar mensaje de éxito
  userFavoritos: any[] = [];  // Lista de favoritos del usuario

  constructor(private userService: UserService) {}

  ngOnInit() {

    this.loadUserProfile();
    
  }
  

  loadUserProfile() {
    const userId = localStorage.getItem('userId');
    console.log('User ID:', userId);
  
    if (userId) {
      this.userService.getUserById(userId).subscribe(userData => {
        console.log('Usuario:', userData);
        this.user = userData;
  
        this.userService.getFavoritosByUserId(userId).subscribe(favoritos => {
          console.log('Favoritos recibidos:', favoritos);
  
          if (favoritos.length > 0 && favoritos[0].equipos) {
            this.userFavoritos = Object.values(favoritos[0].equipos);
            console.log('Equipos:', this.userFavoritos);
          } else {
            console.log('No hay equipos o favoritos vacíos');
          }
        });
      });
    }

  }



   // Cambiar la contraseña
   changePassword() {
    if (this.newPassword) {
      const userId = this.user.id;
      this.userService.updatePassword(userId, this.newPassword).subscribe(
        (response) => {
          console.log('Contraseña cambiada:', response);
          this.passwordChanged = true;  // Mostrar mensaje de éxito
          this.newPassword = '';  // Limpiar el campo de la contraseña
        },
        (error) => {
          console.error('Error al cambiar la contraseña:', error);
        }
      );
    } else {
      alert('Por favor, ingrese una nueva contraseña');
    }
  }
}
