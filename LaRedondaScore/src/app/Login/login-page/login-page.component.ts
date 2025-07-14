import { UserService } from '../../Services/users-services/user.service';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {AuthGoogleService} from '../../Services/Auth_google/auth-google.service';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterModule,FormsModule,CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  AuthGoogleService= inject(AuthGoogleService);


 // Variables para capturar el username y password del formulario
 username: string = '';
 password: string = '';
 errorMessage: string = '';  // Mensaje de error en caso de login fallido

 // Constructor
 constructor(private userService: UserService, private router: Router) { }

 // Método que se ejecuta al enviar el formulario
login() {
  this.userService.login(this.username, this.password).subscribe(
    (response) => {
      // Verificamos que la respuesta no esté vacía
      if (response && response.length > 0) {
        const user = response[0]; // Suponiendo que la respuesta es un arreglo con un único usuario

        // Guardamos el ID del usuario en localStorage

        localStorage.setItem('userId', user.id);
        localStorage.setItem('userName', user.username);
        localStorage.setItem('userEmail', user.useremail || '');
        localStorage.setItem('loginTipo', 'normal');

        this.router.navigate(['/PaginaPrincipal']);  // Redirige a la página principal o dashboard
      } else {
        // Si el login no es exitoso
        this.errorMessage = 'Usuario o contraseña incorrectos';
        console.log(this.errorMessage);
      }
    },
    (error) => {
      // En caso de error en la solicitud
      this.errorMessage = 'Hubo un problema al intentar iniciar sesión';
      console.error('Error en el login:', error);
    }
  );
}

  // Metodo que abre nueva ventana para que se registre el nuevo usuario
 openRegisterWindow() {
  window.open(
    '/register',  // La ruta donde tienes el componente de registro
    'Registro',   // Nombre de la ventana
    'width=400,height=500,left=100,top=100'  // Tamaño y posición
  );
}


logInConGoogleYRedirigir() {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

 
  // Se cierra cualquier sesión previa y se inicia la sesión con Google
  signOut(auth).then(() => {
    return signInWithPopup(auth, provider);  // Inicia el inicio de sesión
  }).then((result) => {
    const user = result.user;  // Usuario de Google

    if (user && user.uid) {
      const userId = user.uid;
      const userName = user.displayName || 'SinNombre';  // Usamos el nombre de Google si está disponible
      const userEmail = user.email || '';

      localStorage.setItem('userId', userId);  // Guardamos el ID en localStorage
      localStorage.setItem('userEmail', userEmail);  // Guardamos el email
      localStorage.setItem('userName', userName);  // Guardamos el nombre
      localStorage.setItem('loginTipo', 'google');  // Indicamos que es login con Google


      // Verificar si el usuario ya está en la base de datos (en el JSON)
      this.userService.getUsers().subscribe((usuarios: any[]) => {
        const yaExiste = usuarios.some(u => u.username === userName);  // Verificamos si ya existe
        console.log(yaExiste);

        if (yaExiste==false) {
          // Si el usuario no existe, lo agregamos
          const nuevoUsuario = {
            id: userId,  // Usamos el UID de Google como ID
            username: userName,  // El nombre del usuario
            useremail: userEmail,
            password: '',  // No aplicamos contraseña en Google
            loginTipo: 'google' 
          };
          

          // Agregamos el usuario al JSON
          this.userService.register(nuevoUsuario.username, nuevoUsuario.password,nuevoUsuario).subscribe(() => {
            console.log('Usuario de Google agregado');
            this.router.navigate(['/PaginaPrincipal']);  // Redirige a la página principal
          });
        } else {
          // Si el usuario ya existe, solo redirige
          this.router.navigate(['/PaginaPrincipal']);
        }
      });
    }
  }).catch((error) => {
    console.error('Error en login con Google:', error);
  });
}





}
