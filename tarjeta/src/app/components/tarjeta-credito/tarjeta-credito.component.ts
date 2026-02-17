import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TarjetaService } from '../../services/tarjeta.service';

@Component({
  selector: 'app-tarjeta-credito',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tarjeta-credito.component.html',
  styleUrl: './tarjeta-credito.component.css'
})
export class TarjetaCreditoComponent {
  listaTarjetas: any[] = [


  ];
  accion = "Agregar";
  id: number | undefined;
  form: FormGroup;
  constructor(private fb: FormBuilder, private toastr: ToastrService, private _tarjetasServices: TarjetaService) {
    this.form = this.fb.group({
      titular: ['', Validators.required],
      numero: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      fecha: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      cvv: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]]
    });
  }
  ngOnInit(): void {
    this.obtenerTarjetas();
  }
  //metodo para obtener las tarjetas
  obtenerTarjetas() {
    this._tarjetasServices.getListTarjetas().subscribe({
      next: (data) => {
        this.listaTarjetas = data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
  guardarTarjeta() {
    const tarjeta: any = {
      titular: this.form.get('titular')?.value,
      numeroTarjeta: this.form.get('numero')?.value,
      fechaExpiracion: this.form.get('fecha')?.value,
      cvv: this.form.get('cvv')?.value,
    }

    if (this.id == undefined) {
      // Agregamos una nueva tarjeta
      this._tarjetasServices.saveTarjeta(tarjeta).subscribe({
        next: (data: any) => {
          this.toastr.success('¡Tarjeta registrada exitosamente!', 'Éxito');
          this.obtenerTarjetas();
          this.form.reset();
        },
        error: (error: any) => {
          this.toastr.error('Ocurrió un error al registrar la tarjeta', 'Error');
          console.log(error);
        }
      });
    } else {
      // Editamos una tarjeta existente
      tarjeta.id = this.id;
      this._tarjetasServices.updateTarjeta(tarjeta).subscribe({
        next: (data: any) => {
          this.form.reset();
          this.accion = 'Agregar';
          this.id = undefined;
          this.toastr.info('La tarjeta fue actualizada con éxito!', 'Tarjeta Actualizada');
          this.obtenerTarjetas();
        },
        error: (error: any) => {
          console.log(error);
          this.toastr.error('Ocurrió un error al actualizar la tarjeta', 'Error');
        }
      });
    }
  }

  // Metodo para eliminar una tarjeta
  eliminarTarjeta(id: number) {
    this._tarjetasServices.deleteTarjeta(id).subscribe({
      next: (data: any) => {
        this.obtenerTarjetas();
        this.toastr.error('La tarjeta fue eliminada con éxito!', 'Tarjeta Eliminada');
      },
      error: (error: any) => {
        console.log(error);
        this.toastr.error('Ocurrió un error al eliminar la tarjeta', 'Error');
      }
    });
  }

  editarTarjeta(tarjeta: any) {
    this.accion = "Editar";
    this.id = tarjeta.id;
    this.form.patchValue({
      titular: tarjeta.titular,
      numero: tarjeta.numeroTarjeta,
      fecha: tarjeta.fechaExpiracion,
      cvv: tarjeta.cvv
    });
  }
}

