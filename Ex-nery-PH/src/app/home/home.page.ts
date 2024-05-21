import { Component, OnInit } from '@angular/core';
import { Aviso } from '../modelo/avisos';
import { AvisosService } from '../servicio/avisos.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AvisosComponent } from '../componente/avisos/avisos.component';
import { addIcons } from 'ionicons';
import { addOutline, trashOutline } from 'ionicons/icons';
import { RouterModule } from '@angular/router';
import { ListaAvisosComponent } from '../componente/lista-avisos/lista-avisos.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, AvisosComponent, RouterModule, ListaAvisosComponent],
})
export class HomePage implements OnInit {

  avisos: Aviso[] = [];
  listaAvisos: Aviso[] = [];

  constructor(private avisosService: AvisosService) {
    addIcons({ addOutline, trashOutline });
  }

  async ngOnInit() {
    await this.avisosService.iniciarPlugin();
    await this._actualizar();
  }

  async _actualizar() {
    try {
      this.listaAvisos = await this.avisosService.mostrarAvisos();
    } catch (error) {
      console.error('Error al actualizar la lista:', error);
    }
  }

  async ionViewWillEnter() {
    await this._actualizar();
  }
}