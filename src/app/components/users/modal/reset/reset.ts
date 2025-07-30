import { Component, inject, Inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UserResetPassword } from '../../../../../interfaces/user';
import { showLoading, showLoadingError, showLoadingSuccess } from '../../../../../utils/popup';
import { UsersServices } from '../../../../services/users';

@Component({
  selector: 'app-reset-user-password',
  imports: [ReactiveFormsModule, MatCheckboxModule, MatInputModule, MatIconModule, MatDialogContent, MatButtonModule, MatFormFieldModule],
  templateUrl: './reset.html',
  styleUrl: './reset.css'
})
export class ResetUserPassword {

  formReset: FormGroup;
  private service = inject(UsersServices)


  constructor(
    @Inject(MAT_DIALOG_DATA) public userId: number, 
    private dialogRef: MatDialogRef<ResetUserPassword>) {

    this.formReset = new FormGroup({
      id: new FormControl<number>(userId, Validators.required),
      newPassword: new FormControl<string>('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl<string>('', [Validators.required, Validators.minLength(6)]),
      alteraNextLogon: new FormControl<boolean>(false)
    }, {validators: this.passwordMatchValidator})
  }


  onSubmit(){

    if (this.formReset.valid){
      showLoading()

      const body: UserResetPassword = {
        id: this.id?.value,
        senha: this.newPassword?.value,
        alteraNextLogon: this.alteraNextLogon?.value,
      }

      this.service.resetPassword(body).subscribe({
        next: (resp) => {
          console.log(resp)
          showLoadingSuccess("Senha resetada com sucesso.", this.onClose)
        },
        error: (err) => {
          console.error(err)
          showLoadingError("Erro ao resetar a senha")
        }
      })

    }
  }

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    const password = control.get('newPassword');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword){
      return null;
    }

    return password.value === confirmPassword.value ? null : {passwordMismatch: true}
  }

  onClose(){
    this.dialogRef.close()
  }

  get id (){
    return this.formReset.get('id')
  }

  get newPassword(){
    return this.formReset.get('newPassword')
  }

  get confirmPassword(){
    return this.formReset.get('confirmPassword')
  }

  get alteraNextLogon(){
    return this.formReset.get('alteraNextLogon')
  }
}
