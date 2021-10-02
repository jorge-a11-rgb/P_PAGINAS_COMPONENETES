import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-certificaciones',
  templateUrl: './certificaciones.component.html',
  styleUrls: ['./certificaciones.component.scss'],
})
export class CertificacionesComponent implements OnInit {

  ngOnInit() {}
  usuario:String;
  respuesta:any[]=[
    {id:1,r:"Si"},
    {id:2,r:"No"}
  ]
  data:any={
    certificado:"",
    fechaObtencion:"",
    resp:"",
    fechaVencimiento:""
  };
  constructor(
    private activeroute: ActivatedRoute
    , private router: Router
    , private alertController: AlertController) {

  }
  /**
   * Metodo limpíar recorre un objeto y se define el 
   * valor de su propiedad en ""
   */
  limpiar(){
    for (var [key, value] of Object.entries(this.data)) {
      Object.defineProperty(this.data,key,{value:""})
    }
  }

  public mostrar(): void {

    // Mostrar un mensaje emergente con los datos de la persona
    const mensaje =
       '<br>Nombre certificado: ' + this.data.certificado
      + '<br>fecha de obtencion: ' + this.data.fechaObtencion
      + '<br>fecha de vencimiento: ' + this.data.fechaVencimiento;

    this.presentAlert('Datos Certificado', mensaje);
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

