import { Injectable } from '@angular/core';
import { Credential } from '../models/user/Credential'
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
  
    return myToken;
  }

}
