# LaRedondaScore
LaRedondaScore  una plataforma de estadísticas deportivas en tiempo real

##Con LaRedondaScore, disfrutar del fútbol es más fácil que nunca. Nuestra interfaz intuitiva te permite acceder rápidamente a la información que necesitas, ya sea que quieras consultar los resultados de un partido, conocer las estadisticas de los equipos  o simplemente relajarte y disfrutar de resultados en directo. Personaliza tu experiencia y crea tu propio tablero de favoritos para seguir de cerca a tus equipos y ligas favoritas.


Requisitos Previos
Node.js (versión X.X o superior)
npm (versión X.X o superior)
json-server (para simular una API REST)

Instalación

Clona el repositorio:
git clone https://github.com/Etienne2021/LaRedondaScore
cd LaRedondaScore

Instala las dependencias:
npm install
Instala json-server globalmente si no lo tienes instalado:
npm install -g json-server
comando para correr bd:
json-server --watch db/user.json

En caso de que no funcione la api key:

1-Ingresar a https://www.api-football.com/
2-Registrarse
3-en la barra lateral entrar a apis(</>)
4-seleccionar footbal
5-seleccionar live demo
6-copiar api key
7-copiarla en C:\Users\Etienne\LaRedondaScore\LaRedondaScore\src\app\Services\Api\partidos.service
  en la constante private apiKey = 'Aqui adentro'; 

INTEGRANTES:
Mariano Ribas
Etienne Torres
Marcos Otalvares
