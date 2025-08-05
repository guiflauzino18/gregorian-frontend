import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { UserDTO } from '../../../../../interfaces/user';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UsersServices } from '../../../../services/users';
import { showLoading, showLoadingError, showLoadingSuccess } from '../../../../../utils/popup';
import { reload } from '../../../../../utils/loader';

@Component({
  selector: 'app-edit-user',
  imports: [ReactiveFormsModule, MatCheckboxModule, MatInputModule, MatIconModule, MatDialogContent, MatButtonModule, MatFormFieldModule],
  templateUrl: './edit.html',
  styleUrl: './edit.css'
})
export class EditUser {

  editForm: FormGroup;
  service = inject(UsersServices)

  constructor(
    @Inject(MAT_DIALOG_DATA) public user: UserDTO, 
    private dialogRef: MatDialogRef<EditUser>
  ){

    this.editForm = new FormGroup({
      id: new FormControl(user.id, Validators.required),
      nome: new FormControl(user.nome, Validators.required),
      sobrenome: new FormControl(user.sobrenome, Validators.required),
      nascimento: new FormControl(user.nascimento.split("T")[0], Validators.required),
      telefone: new FormControl(user.telefone, Validators.required),
      email: new FormControl(user.email, Validators.required),
      endereco: new FormControl(user.endereco, Validators.required),
      role: new FormControl(user.role, [Validators.required]),
      status: new FormControl(user.status, [Validators.required]),
      alteraNextLogon: new FormControl(user.alteraNextLogon ?? false)
    });
  }


  onClose(){
    this.dialogRef.close()
  }

  onSubmit(){

    showLoading();

    if (this.editForm.valid) {
      const user: UserDTO = {
        id: this.id?.value,
        nome: this.nome?.value,
        sobrenome: this.sobrenome?.value,
        nascimento: this.nascimento?.value,
        telefone: this.telefone?.value,
        email: this.email?.value,
        endereco: this.endereco?.value,
        role: this.role?.value,
        status: this.status?.value,
        alteraNextLogon: this.alteraNextLogon?.value
      }

      this.service.editUser(user).subscribe({
        next: (resp) => {
          console.info(resp)
          showLoadingSuccess("Usuário atualizado com sucesso", reload)
        
        },
        error: (err) => {
          console.error("Erro ao atualizar usuário: "+err)
          showLoadingError("Erro ao atualizar usuário")
        }
      })

    }

  }

  get id(){
    return this.editForm.get('id')
  }

  get nome (){
    return this.editForm.get('nome')
  }
  get sobrenome (){
    return this.editForm.get('sobrenome')
  }

  get nascimento(){
    return this.editForm.get('nascimento')
  }

  get telefone(){
    return this.editForm.get('telefone')
  }

  get email(){
    return this.editForm.get('email')
  }

  get role(){
    return this.editForm.get('role')
  }

  get endereco(){
    return this.editForm.get('endereco')
  }

  get alteraNextLogon(){
    return this.editForm.get('alteraNextLogon')
  }

  get status(){
    return this.editForm.get('status')
  }

}
