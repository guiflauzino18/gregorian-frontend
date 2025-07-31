import { FocusMonitor } from '@angular/cdk/a11y';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogContent, MatDialogRef } from "@angular/material/dialog";
import { ProfissionalDTO } from '../../../../../interfaces/profissional';
import { ProfissionalServices } from '../../../../services/profissional';
import { showLoading, showLoadingError, showLoadingSuccess } from '../../../../../utils/popup';
import { reload } from '../../../../../utils/loader';

@Component({
  selector: 'app-create-profissional',
  imports: [MatDialogContent, ReactiveFormsModule],
  templateUrl: './create.html',
  styleUrl: './create.css'
})
export class CreateProfissional {

  constructor(
    private dialogRef: MatDialogRef<CreateProfissional>

  ){
  }

  private service = inject(ProfissionalServices)
  protected createForm = new FormGroup({
    titulo: new FormControl('', [Validators.required]),
    registro: new FormControl('', [Validators.required]),
    login: new FormControl('', [Validators.required])
  })


  onSubmit(){
    if (this.createForm.valid){
      showLoading()

      const profissional: ProfissionalDTO= {
        titulo: this.titulo?.value ?? '',
        registro: this.registro?.value ?? '',
        login: this.login?.value ?? ''
      }

      this.service.createProfissional(profissional).subscribe({
        next: (resp) => {
          showLoadingSuccess("Profissional cadastrado", reload)
        },
        error: (err) => {
          console.error(err)
          let titulo: string
          if (err.status == 404) 
            titulo = "Login de usuário não encontrado"
          else if (err.status == 409) 
            titulo = "Este login já está vinculado a outro profissional"
          else 
            titulo= "Erro no cadastro do profisssional";

          showLoadingError(titulo)
        }
      })
    }
  }

  onClose(){
    this.dialogRef.close()
  }

  get titulo(){
    return this.createForm.get("titulo")
  }

  get registro(){
    return this.createForm.get("registro")
  }

  get login(){
    return this.createForm.get("login")
  }

}
