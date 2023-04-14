import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import * as firebase from 'firebase/app';
import { Capacitor } from "@capacitor/core";
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { GoogleAuthProvider, Auth, getAuth,  provideAuth, signInWithPopup, signOut, signInWithRedirect, signInWithCredential, initializeAuth, FacebookAuthProvider, OAuthProvider } from '@angular/fire/auth';
// import {
//   getAuth,
//   GoogleAuthProvider,
//   OAuthProvider,
//   PhoneAuthProvider,
//   EmailAuthProvider,
//   signOut as 
// } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    // private auth: Auth,
    // private gplus: GooglePlus,
  ) {

  }

  

  public async loginWithFacebook  () {
    const result = await FirebaseAuthentication.signInWithFacebook();
    if (result.credential?.accessToken == null){
      throw new Error('No access token');
    }
    const credential = FacebookAuthProvider.credential(
          result.credential!.accessToken,
        );
    const auth = getAuth();
    await signInWithCredential(auth, credential);
  };
  

  public async signInWithApple ()  {
    // 1. Create credentials on the native layer
    const result = await FirebaseAuthentication.signInWithApple({ skipNativeAuth: true });
    // 2. Sign in on the web layer using the id token and nonce
    const provider = new OAuthProvider('apple.com');
    const credential = provider.credential({
      idToken: result.credential?.idToken,
      rawNonce: result.credential?.nonce,
    });
    const auth = getAuth();
    await signInWithCredential(auth, credential);
  };

  // const signInWithFacebook = async () => {
  //   // 1. Create credentials on the native layer
  //   const result = await FirebaseAuthentication.signInWithFacebook();
  //   // 2. Sign in on the web layer using the access token
  //   const credential = FacebookAuthProvider.credential(
  //     result.credential?.accessToken,
  //   );
  //   const auth = getAuth();
  //   await signInWithCredential(auth, credential);
  // };
  
  public async loginWithGoogle(){
    // 1. Create credentials on the native layer
    const result = await FirebaseAuthentication.signInWithGoogle();
    // 2. Sign in on the web layer using the id token
    const credential = GoogleAuthProvider.credential(result.credential?.idToken);
    const auth = getAuth();
    await signInWithCredential(auth, credential);
  };
  

  public async getCurrentUserCustom ()  {
    const auth = getAuth();
    const currentUser = auth.currentUser;
  };

  public async getIdTokenCustom () {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (!currentUser) {
      return null;
    }
    const token = await currentUser.getIdToken();
    return token;
  };





  public async getCurrentUserAngularFirebase ()  {
    const result = await FirebaseAuthentication.getCurrentUser();
    return result.user;
  };

  public async getIdTokenAngularFirebase () {
    const currentUser = await this.getCurrentUserAngularFirebase();
    if (!currentUser) {
       return null;
    }
    const result = await FirebaseAuthentication.getIdToken();
    return result.token;
  }




  // async loginWithGoogle() {
  //   // const params = {
  //   //   webClientId: '<add your string here>', //  webclientID 'string'
  //   //   offline: true
  //   // };
  //   // try {
  //   //   const gplusUser = await this.gplus.login(params);
  //   //   await signInWithCredential(this.auth, GoogleAuthProvider.credential(gplusUser.idToken));
  //   // } catch (err) {
  //   //   this.message += err;
  //   // }
  //   return signInWithRedirect(this.auth, new GoogleAuthProvider());
  // }

  // funciona en web
  // loginWithGoogle() {
  //   return signInWithPopup(this.auth, new GoogleAuthProvider());
  // }
  

  async logout() {
    // 1. Sign out on the native layer
    await FirebaseAuthentication.signOut();
    // 1. Sign out on the web layer
    const auth = getAuth();
    await signOut(auth);
  }

}