import { Injectable } from '@angular/core';
import{getAuth, GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthGoogleService {

  constructor() { }

getAuth()
{
return getAuth();
}

logInGoogle()
{
  return signInWithPopup(getAuth(),new GoogleAuthProvider())
}


logLogout()
{
  return signOut(getAuth());
}


}
