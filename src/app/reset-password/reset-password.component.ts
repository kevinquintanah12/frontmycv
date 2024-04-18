import { Component } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

   password : String = "";
   confirmpassword : String = "";

   callResetPassword() {
     console.log(this.password);
     console.log(this.confirmpassword);
   }
}
