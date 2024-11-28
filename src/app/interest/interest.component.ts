import { Component, OnInit } from '@angular/core';
import { GraphqlInterestService } from '../services/interest.services';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-interest',
  templateUrl: './interest.component.html',
  styleUrls: ['./interest.component.css'],
})
export class InterestComponent implements OnInit {
  name: string = '';
  description: string = '';
  token: string = '';
  interests: any[] = [];

  constructor(
    private interestService: GraphqlInterestService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.token = this.storageService.getSession('token');
    if (!this.token) {
      console.error('Token no encontrado. El usuario debe iniciar sesión.');
    } else {
      this.fetchInterests();
    }
  }

  /**
   * Cargar la lista de intereses desde el servidor.
   */
  fetchInterests(): void {
    if (!this.token) return;

    this.interestService.getInterests(this.token).subscribe(
      (response: any) => {
        this.interests = response.data.interests;
        console.log('Intereses cargados:', this.interests);
      },
      (error) => {
        console.error('Error al cargar intereses:', error);
      }
    );
  }

  /**
   * Guardar un nuevo interés.
   */
  saveInterest(): void {
    if (!this.token) {
      alert('Token no encontrado. Inicia sesión nuevamente.');
      return;
    }

    const newInterest = {
      name: this.name,
      description: this.description,
    };

    this.interestService.createInterest(newInterest, this.token).subscribe(
      (response: any) => {
        console.log('Interés creado:', response.data.createInterest);
        alert('Interés creado exitosamente');
        this.resetForm();
        this.fetchInterests();
        this.router.navigate(['/language']);
      },
      (error) => {
        console.error('Error al crear interés:', error);
        alert('Hubo un error al crear el interés.');
      }
    );
  }

  /**
   * Eliminar un interés.
   * @param id ID del interés a eliminar.
   */
  deleteInterest(id: number): void {
    if (!this.token) return;

    this.interestService.deleteInterest(id, this.token).subscribe(
      (response: any) => {
        console.log('Interés eliminado:', response.data.deleteInterest);
        alert('Interés eliminado exitosamente');
        this.fetchInterests();
      },
      (error) => {
        console.error('Error al eliminar interés:', error);
        alert('Hubo un error al eliminar el interés.');
      }
    );
  }

  /**
   * Restablecer los campos del formulario.
   */
  resetForm(): void {
    this.name = '';
    this.description = '';
  }
}
