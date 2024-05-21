import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Aviso } from 'src/app/modelo/avisos';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { cameraOutline } from 'ionicons/icons';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-formulario-aviso',
  templateUrl: './formulario-aviso.component.html',
  styleUrls: ['./formulario-aviso.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class FormularioAvisoComponent implements OnInit {

  tituloStr: string = "";
  fotoStr: string = "";
  descripcionStr: string = "";
  picture: string | undefined;
  @Output() onCreate = new EventEmitter<Aviso>();

  tituloCompletado: boolean = false;
  fotoCompletada: boolean = false;
  descripcionCompletada: boolean = false;

  constructor(private router: Router) {
    addIcons({ cameraOutline });
  }

  ngOnInit() {
    this.picture = "assets/aviso.jpg";
  }

  onTituloChange() {
    this.tituloCompletado = !!this.tituloStr && this.tituloStr.length >= 5;
  }

  onDescripcionChange() {
    this.descripcionCompletada = !!this.descripcionStr && this.descripcionStr.length >= 20;
  }

  async sacarFoto() {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl
    });

    this.picture = image.dataUrl;
    this.fotoCompletada = !!this.picture;
  }

  onClick() {
    const aviso: Aviso = {
      ID: 1,
      titulo: this.tituloStr,
      foto: this.picture,
      descripcion: this.descripcionStr
    };
    this.onCreate.emit(aviso);
    this.router.navigate(['home']);
  }
}