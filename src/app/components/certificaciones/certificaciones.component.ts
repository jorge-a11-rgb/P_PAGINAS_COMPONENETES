import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AnimationController } from '@ionic/angular'
import { AfterViewInit } from '@angular/core';

import { createAnimation } from '@ionic/angular';
@Component({
  selector: 'app-certificaciones',
  templateUrl: './certificaciones.component.html',
  styleUrls: ['./certificaciones.component.scss'],
})
export class CertificacionesComponent implements OnInit, AfterViewInit 
{

  @ViewChild('t', { read: ElementRef, static: true}) t: ElementRef;
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
    private animationController: AnimationController
    ,private activeroute: ActivatedRoute
    , private router: Router
    , private alertController: AlertController) {

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

