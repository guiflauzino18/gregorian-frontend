import { Component, inject, output, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatCheckboxModule, MatCheckbox } from '@angular/material/checkbox';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UsersServices } from '../../../../services/users';
import { UserDTO } from '../../../../../interfaces/user';
import { showLoading, showLoadingError, showLoadingSuccess } from '../../../../../utils/popup';
import { reload } from '../../../../../utils/loader';


@Component({
  selector: 'app-create-user',
  imports: [ReactiveFormsModule, MatCheckboxModule, MatInputModule, MatIconModule, MatDialogContent, MatButtonModule, MatFormFieldModule],
  templateUrl: './create.html',
  styleUrl: './create.css'
})
export class CreateUser {

  constructor(
    private dialogRef: MatDialogRef<CreateUser>
  
  ){}

  userService = inject(UsersServices)
  createForm = new FormGroup({

    nome: new FormControl('', Validators.required),
    sobrenome: new FormControl('', Validators.required),
    nascimento: new FormControl('', Validators.required),
    telefone: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    login: new FormControl('', Validators.required),
    senha: new FormControl('', [Validators.required, Validators.minLength(6)]),
    endereco: new FormControl('', Validators.required),
    role: new FormControl('', [Validators.required]),
    alteraNextLogon: new FormControl(false),
  })


  onSubmit(){

    if (this.createForm.valid){

      showLoading()

      const user: UserDTO = {

        nome: this.nome?.value ?? '',
        sobrenome: this.sobrenome?.value ?? '',
        nascimento: this.nascimento?.value ?? '',
        telefone: this.telefone?.value ?? '',
        email: this.email?.value ?? '',
        login: this.login?.value ?? '',
        senha: this.senha?.value ?? '',
        role: this.role?.value ?? '',
        alteraNextLogon: this.alteraNextLogon?.value ?? false,
        endereco: this.endereco?.value ?? '',

      }

      this.userService.createUser(user).subscribe({
        next: (resp) => {
          showLoadingSuccess("Usuário cadastrado com sucesso",  reload)
        },
        error: (err) => {
          console.error("Erro da Request: ", err)
          let msg = ""
          err.status == 409 ? msg = "Já existe um usuário com este login" : "Erro no cadastro do usuário"
          
          showLoadingError(msg)
        }
      })
      
    }
  }

  onClose(){
    this.dialogRef.close()
  }


  get nome (){
    return this.createForm.get('nome')
  }
  get sobrenome (){
    return this.createForm.get('sobrenome')
  }

  get nascimento(){
    return this.createForm.get('nascimento')
  }

  get telefone(){
    return this.createForm.get('telefone')
  }

  get email(){
    return this.createForm.get('email')
  }

  get login(){
    return this.createForm.get('login')
  }

  get senha(){
    return this.createForm.get('senha')
  }

  get role(){
    return this.createForm.get('role')
  }

  get endereco(){
    return this.createForm.get('endereco')
  }

  get alteraNextLogon(){
    return this.createForm.get('alteraNextLogon')
  }

}
