import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DatosExperienciaLaboral } from 'src/app/model/DatosExperienciaLaboral';
import { RespExp } from 'src/app/model/RespExp';
import { Usuario } from 'src/app/model/Usuario';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AnimationController } from '@ionic/angular'
@Component({
  selector: 'app-experiencia-laboral',
  templateUrl: './experiencia-laboral.component.html',
  styleUrls: ['./experiencia-laboral.component.scss'],
})
export class ExperienciaLaboralComponent implements OnInit, AfterViewInit 
{

  @ViewChild('ti', { read: ElementRef, static: true}) t: ElementRef; 

 
  public usuario: Usuario;
  public datosExperienciaLaboral: DatosExperienciaLaboral = new DatosExperienciaLaboral();
  public respExp: RespExp[] = [
    {id: 1, respuesta: 'Si'},
    {id: 2, respuesta: 'No'}
  ];


  constructor(private animationController: AnimationController
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
    .addElement(this.t.nativeElement)

    .duration(1500)
    .iterations(Infinity)

    .fromTo('transform', 'translate(0px)', 'translate(100px)')

    .fromTo('opacity', 1, 0.2);

  animation.play();
}
public ngOnInit() {
this.datosExperienciaLaboral.empresa = '';
this.datosExperienciaLaboral.annoInicio = 0;
this.datosExperienciaLaboral.respExp.id = 2;
this.datosExperienciaLaboral.annoTermino = 0;
this.datosExperienciaLaboral.cargo = '';
}

public limpiarFormulario(): void {
/*
El método limpiar recorre cada uno de los campos de la propiedad persona,
de modo que la variable "key" va tomando el nombre de dichos campos (nombre,
apellido, etc.) y "value" adopta el valor que tiene en ese momento el
campo asociado a key.
*/
for (const [key, value] of Object.entries(this.datosExperienciaLaboral)) {
/*
  Con la siguiente instrucción se cambia el valor de cada campo
  de la propiedad persona, y como los controles gráficos están
  asociados a dichos nombres de campos a través de ngModel, entonces
  al limpiar el valor del campo, también se limpia el control gráfico.
*/
  Object.defineProperty(this.datosExperienciaLaboral, key, {value: ''});
}
}

public mostrarDatosPersona(): void {


// Mostrar un mensaje emergente con los datos de la persona
const mensaje =
    '<br>Usuario: ' + this.usuario.nombreUsuario
  + '<br>Nombre empresa: ' + this.datosExperienciaLaboral.empresa
  + '<br>Año inicio: ' + this.datosExperienciaLaboral.annoInicio
  + '<br>Aun trabaja ahi?: ' + this.datosExperienciaLaboral.respExp.id + ' - '
  + this.respExp.find(
      n => n.id === this.datosExperienciaLaboral.respExp.id).respuesta
  + '<br>: Año termino ' + this.datosExperienciaLaboral.annoTermino
  + '<br> Cargo: ' + this.datosExperienciaLaboral.cargo;

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
