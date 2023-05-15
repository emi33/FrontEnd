# Proyectofinal

ReadmeFile!!

Mayo de 2023

© 2023

Desarrollado por Emiliano Choque

# Descripción del Proyecto

    Plataforma online de creación de multiples portfolios, muy útil para cualquier persona que quiera mostrar su trabajo en línea, desde cualquier dispositivo o lugar.
    No solo podemos agregar informacion basica nuestra, sino tambien nuestros titulos academicos, experiencias laborales, habilidades, proyectos realizados y redes sociales, todo aquello que usualmente se agrega en un portfolio, pero de manera mas intuitiva y facil. 

    Los usuarios nuevos podran ver los portfolios ya diseñados por otros usuarios de la plataforma, y aquellos que decidan registrarse, podran crear sus propios portfolios, con la posibilidad de agregar, editar, quitar y solicitar toda la informacion que deseen.

    Si bien la idea de una pagina web de creacion de portfolios es crear solo un portfolio, en este proyecto decidi expandirme un poco mas y dar la posibilidad de que el cliente pueda crear varios portfolios y navegar entre ellos. De esa forma, el cliente Nro. 1 puede crear el portfolio 1 y el cliente Nro. 2 crear el portfolio 2, por ejemplo; y todos los clientes podran acceder a todos los portfolios. Esto hace que la pagina sea mas sociable e ideal para trabajos en equipo.

## Servicios Utilizados

    Firebase Authentication: para registro de usuarios a traves de correo electronico y contraseña
    Firebase Storage: utilizado para almacenar imagenes que usaremos para diseñar nuestro portfolio, como fotos de perfil, banners y fotos de nuestros proyectos.
    Spring Boot: para el diseño del Back-End 
    MySQL: creacion de la base de datos
    Angular: diseño de Front-End

# Como ejecutar el Proyecto
    1- Debemos ingresar al link https://portfolio-creator.onrender.com/ y esperar a que cargue. Esto suele tardar varios minutos. Debe mostrar una pagina en blanco que diga whitelabel page
    2- Una vez cargado vamos a la pagina del frontend: https://portfolio-maker-98538.web.app/. Debe mostrar un portfolio ya prediseñado
    3- Si la pagina cargó, y muestra informacion toda la informacion de la base de datos, listo, todo funciona.

# Cuenta de invitado

    usuario: usuario@portfolio.com  
    contraseña: invitado

# Como usar el proyecto

## Pasos para crear un portfolio

    1- INGRESAR (https://portfolio-maker-98538.web.app/login)
    Debemos tener un usuario autentificado si queremos que se habiliten la creacion, edicion y eliminacion de tablas.
    una vez en la pagina principal, podemos ver un portfolio creado correctamente, pero mas que eso no podremos hacer.
    Si el cliente desea crear su propio portfolio, debera registrarse, o si ya tiene una cuenta, debera ingresar con su usuario y contraseña.

    2- CREAR PERFIL (https://portfolio-maker-98538.web.app/add?persona)

    Una vez ingresados, en la esquina superior derecha hacemos click y elegimos la opcion crear perfil, que nos enviara a un formulario que debemos llenar con informacion basica sobre nosotros. Una vez lleno, el metodo 'crear perfil' se habilitara y enviaremos el formulario al backend, que guardara la informacion en la base de datos.

    3- VER PERFIL (https://portfolio-maker-98538.web.app/personas)
   El el componente 'ver perfiles',  elegimos un perfil y al hacer click en 'ir', nos enviara de vuelta a la pagina principal, pero esta vez mostrara la informacion del perfil seleccionado.

   4-DISEÑAR PORTFOLIO (https://portfolio-maker-98538.web.app/portfolio)
   Tenemos 3 tipos de peticiones: Post para crear una tabla, Put para editar una tabla y Delete para borrar una tabla.
   Los modales de crear tablas se encuentran en la carpeta (componentes-add)
   Los modales de editar tablas se encuentran en la carpeta (componentes-edit)
   Para asegurarse que la base de datos reciba y ejecute apropiadamente cada peticion, el cliente podra ver un mensaje de alerta que muestre el estado de la ejecucion: 'Exito' si la peticion se cumplio o 'Error' si fallo en alguna parte. ES IMPORTANTE QUE AL HACER UN REQUEST ESPEREMOS LA RESPUESTA.

   5-VER NUESTRO DISEÑO (https://portfolio-maker-98538.web.app/portfolio)
   


# ERRORES

    Al editar una tabla persona o un proyecto debemos subir las imagenes, ya que si no, no se realiza la peticion put.
    La pagina no deberia mostrar ningun error si funciona bien, ni siquiera en la consola. Pero de haber algun error, lo ideal seria chequear que el proyecto este ejecutado correctamente.

# Algunos Problemas a solucionar

Mejorar el servicio de authenticacion de firebase, ya que para registrarse solo se le pide al cliente un usuario y contraseña

Mejorar el servicio de almacenamiento de imagenes de Firebase, solo se usan dos metodos y este servicio no fue usado de forma efectiva.

Implementar la logica en el backend, ya que es lo ideal si en el futuro queremos cambiar de lenguaje de programacion.

# GRACIAS!!

si llegaste hasta aca, no me queda mas que decir gracias, y espero que mi proyecto sea de tu agrado y le saques provecho...


















# Proyectofinal

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
