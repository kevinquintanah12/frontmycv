import { Injectable } from '@angular/core';
import { Credential } from '../models/user/Credential'
import { User } from '../models/user/User'
import { Token } from '../models/user/Token'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  postLogin(myCredential: Credential): Token {

    console.log("email ... " + myCredential.email);
    console.log("password ... " + myCredential.password);

    var myToken = new Token();

    // call fake api
    if ( (myCredential.email == "adsoft@live.com.mx") &&
	 (myCredential.password == "123"))
    {
       myToken.id = "0001";
       myToken.user = "adsoft";
       myToken.token = "gcp747844sdjksdkjsdkjds895850vb3";
    }
    else {
       myToken.id = "0";
       myToken.user = "bad credentials";
       myToken.token = "";
    }  

    return myToken;
  }


  createUser(myUser: User): User {

    console.log("email ... " + myUser.email);
    console.log("password ... " + myUser.password);

    var myNewUser = new User();

    // call fake api - create user
    // Success
    myNewUser.id = 0;

    
    if ( myNewUser.id != 0 )
    {
       console.log("Success " + myNewUser.id);
       myNewUser.id = 1; // Success
       myNewUser.email = myUser.email;
       myNewUser.firstName = myUser.firstName;
       myNewUser.lastName = myUser.lastName;
       myNewUser.password = myUser.password;

    }
    else {
       console.log("Error" + myNewUser.id);

       myNewUser.id = 0; // Error
    } 

   return myNewUser;
 } 

}
