import { observable , action ,makeAutoObservable } from 'mobx';
import jwt_decode  from 'jwt-decode';
import CryptoJS from 'crypto-js';
import sign from 'jwt-encode';

import React from 'react'


class AuthStore{
    appState = null;

    constructor(){
        makeAutoObservable(this,{
            appState:observable,
            saveToken:action,
            getToken:action
        });
    }

    saveToken = (appState) => {
        try 
        {
            localStorage.setItem('appState',CryptoJS.AES.encrypt(sign(appState,"secret"),"kripto").toString());
            //localStorage.setItem('appState',appState);
            this.getToken();
        }
        catch (e) {
            console.log(e);
        }
    }

    getToken = () => {
        try {
            const appStateData = localStorage.getItem("appState");
            if(appStateData){
                var bytes = CryptoJS.AES.decrypt(appStateData, 'kripto');
                var originalText = bytes.toString(CryptoJS.enc.Utf8);
                this.appState = jwt_decode(originalText);
                //this.appState = appStateData;
            }
            else 
            {
                this.appState = null;
            }
        }
        catch(e) {
            console.log(e);
        }
    }

   removeToken = () => {
        localStorage.removeItem("appState");
        this.appState = null;
    }
}

export default new AuthStore();