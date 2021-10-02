import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DatosBacicos } from 'src/app/model/DatosBacicos';
import { Educacion } from 'src/app/model/Educacion';
import { Usuario } from 'src/app/model/Usuario';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { getAttrsForDirectiveMatching } from '@angular/compiler/src/render3/view/util';
import { AnimationController } from '@ionic/angular'
@Component({
  selector: 'app-mis-datos',
  templateUrl: './mis-datos.component.html',
  styleUrls: ['./mis-datos.component.scss'],
})
export class MisDatosComponent implements OnInit, AfterViewInit  {
  @ViewChild('tit', { read: ElementRef, static: true}) tit: ElementRef; 

  public usuario: Usuario;
  public datosBasicos: DatosBacicos = new DatosBacicos();
  public educacion: Educacion[] = [
    {id: 1, nombre: 'Básica Incompleta'},
    {id: 2, nombre: 'Básica Completa'},
    {id: 3, nombre: 'Media Incompleta'},
    {id: 4, nombre: 'Media Completa'},
    {id: 5, nombre: 'Superior Incompleta'},
    {id: 6, nombre: 'Superior Completa'}
  ];


  constructor(
    private animationController: AnimationController
    ,private activeroute: ActivatedRoute
    , private router: Router
    , private alertController: AlertController) {

// Se llama a la ruta activa y se obtienen sus parámetros mediante una subscripcion
this.activeroute.queryParams.subscribe(params => {       // Utilizamos expresión lambda
  if (this.router.getCurrentNavigation().extras.state) { // Validar que tenga datos extras

    // Si tiene datos extra, se rescatan y se asignan a una propiedad
    this.usuario = this.router.getCurrentNavigation().extras.state.usuario;

  } else {
    /*
      Si no vienen datos extra desde la página anterior, quiere decir que el usuario
      intentó entrar directamente a la página home sin pasar por el login,
      de modo que el sistema debe enviarlo al login para que inicie sesión.
    */
  
  }
});
}
public ngAfterViewInit(): void {
  let animation = this.animationController.create()
    .addElement(this.tit.nativeElement)

    .duration(1500)
    .iterations(Infinity)

    .fromTo('transform', 'translate(0px)', 'translate(100px)')

    .fromTo('opacity', 1, 0.2);

  animation.play();
}

public ngOnInit() {
this.datosBasicos.nombre = '';
this.datosBasicos.apellido = '';
this.datosBasicos.educacion.id = 6;
this.datosBasicos.fechaNacimiento = '';
}

public limpiarFormulario(): void {
/*
El método limpiar recorre cada uno de los campos de la propiedad persona,
de modo que la variable "key" va tomando el nombre de dichos campos (nombre,
apellido, etc.) y "value" adopta el valor que tiene en ese momento el
campo asociado a key.
*/
for (const [key, value] of Object.entries(this.datosBasicos)) {
/*
  Con la siguiente instrucción se cambia el valor de cada campo
  de la propiedad persona, y como los controles gráficos están
  asociados a dichos nombres de campos a través de ngModel, entonces
  al limpiar el valor del campo, también se limpia el control gráfico.
*/
  Object.defineProperty(this.datosBasicos, key, {value: ''});
}
}

public mostrarDatosPersona(): void {

// Si el usuario no ingresa al menos el nombre o el apellido, se mostrará un error
if (this.datosBasicos.nombre.trim() === '' && this.datosBasicos.apellido === '') {
  this.presentAlert('Datos basicos', 'Para mostrar los datos basicos, '
    + 'al menos debe tener un valor para el nombre o el apellido.');
  return;
}

// Mostrar un mensaje emergente con los datos de la persona
const mensaje =
    '<br>Usuario: ' + this.usuario.nombreUsuario
  + '<br>Nombre: ' + this.datosBasicos.nombre
  + '<br>Apellido: ' + this.datosBasicos.apellido
  + '<br>Educación: ' + this.datosBasicos.educacion.id + ' - '
  + this.educacion.find(
      n => n.id === this.datosBasicos.educacion.id).nombre
  + '<br>Nacimiento: ' + this.datosBasicos.fechaNacimiento;

this.presentAlert('Datos personales', mensaje);
}

// Este método sirve para mostrar el mensaje emergente
public async presentAlert(titulo: string, mensaje: string) {
const alert = await this.alertController.create({
  header: titulo,
  message: mensaje,
  buttons: ['OK']
});

await alert.present();
}
}
