import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore'
import { Router } from '@angular/router';
import { User } from '../services/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    
  ) {/*guardar datos de usuario en localstorage cuando se ingresa; configura en nulo al cerrar sesion*/
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  SignIn(email: string, password: string){
    return this.afAuth
    .signInWithEmailAndPassword(email, password)
    .then((result)=> {
      this.SetUserData(result.user);
      this.afAuth.authState.subscribe((user)=>{
        if (user){
          this.router.navigate(['portfolio']);
        }
      });
    })
    .catch((error)=>{
      window.alert(error.messaje);
    });
  }

  SignUp(email: string, password: string){
    return this.afAuth
    .createUserWithEmailAndPassword(email, password)
    .then((result)=>{
      //llamada a metodo de verificacion cuando un usuario se registra
      
        this.SendVerificationMail();
    
      
      this.SetUserData(result.user);
    })
    .catch((error)=>{
      window.alert(error.message);
    })
  }

  //enviar correo de verificacion cuando se registra un nuevo usuario
  SendVerificationMail(){
    return this.afAuth.currentUser
    .then((u:any)=> u.sendEmailVerification())
    .then(()=> {
      this.router.navigate(['verificarcorreo']);
    });
  }

  //resetear contraseña
  ForgotPassword(passwordResetEmail: string){
    return this.afAuth
    .sendPasswordResetEmail(passwordResetEmail)
    .then(()=>{
      window.alert('Se reseteo tu contraseña, revisa tu correo');
    })
    .catch((error)=>{
      window.alert(error);
    })
  }

  //retorna un true cuando un usuario ingresa y su email fue verificado, SI EL USUARIO ES usuario@portfolioweb.com, retorna true sin importar el email verified
  get isLoggedIn(): boolean{
    const user = JSON.parse(localStorage.getItem('user')!);
    if(user!=null){
      if (user.email=="usuario@portfolio.com"){
        return true;
      }else{
        return (user !== null && user.emailVerified !== false) ? true: false;
      }
    }
    return false;
   
    
  }

  //set user data metodo 
  SetUserData(user:any){
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {merge: true,});
  }


  //cerrar sesion
  SignOut(){
    return this.afAuth.signOut().then(()=>{
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }
}
