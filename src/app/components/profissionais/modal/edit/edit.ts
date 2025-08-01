import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent } from '@angular/material/dialog';
import { ProfissionalDTO } from '../../../../../interfaces/profissional';
import { Form, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfissionalServices } from '../../../../services/profissional';
import { showLoading, showLoadingError, showLoadingSuccess } from '../../../../../utils/popup';
import { reload } from '../../../../../utils/loader';

@Component({
  selector: 'app-edit-profissional',
  imports: [MatDialogContent, ReactiveFormsModule],
  templateUrl: './edit.html',
  styleUrl: './edit.css'
})
export class EditProfissional {


  editForm: FormGroup
  service = inject(ProfissionalServices)

  constructor(
    @Inject(MAT_DIALOG_DATA) public profissional: ProfissionalDTO,
    private dialogRef: MatDialogRef<EditProfissional>

  ){
    this.editForm = new FormGroup({
      id: new FormControl(profissional.id, [Validators.required]),
      titulo: new FormControl(profissional.titulo, [Validators.required]),
      registro: new FormControl(profissional.registro, [Validators.required]),
      login: new FormControl(profissional.login, [Validators.required])
    })
  }

  onSubmit(){
    if (this.editForm.valid){
      showLoading()

      const prifissional: ProfissionalDTO = {
        id: this.id?.value ?? 0,
        titulo: this.titulo?.value ?? '',
        registro: this.registro?.value ?? 11,
        login: this.login?.value ?? ''
      }

      this.service.editProfissional(prifissional).subscribe({
        next: (resp) => {
          showLoadingSuccess("Profissional atualizado", reload)
        },
        error: (err) => {
          console.error(err)
          let mensagem: string
          if (err.status == 404)
            mensagem = "Profissional não encontrado para edição"
          else 
            mensagem = "Erro ao atualizar cadsatro do profissional"
          showLoadingError(mensagem)
        }
      })
    }
  }

  onClose(){
    this.dialogRef.close()
  }

  get id(){
    return this.editForm.get('id')
  }

  get titulo(){
    return this.editForm.get('titulo')
  }

  get registro(){
    return this.editForm.get('registro')
  }

  get login(){
    return this.editForm.get('login')
  }


}
