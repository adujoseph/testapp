import { Component } from '@angular/core';
import { Plugins, AppState } from '@capacitor/core';

const { Browser,  LocalNotifications, App } = Plugins;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  REDIRECT_URL = "fitreflect://"
  url = "https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=22DC76&redirect_uri=" +
  this.REDIRECT_URL + "%2Ffitbit_auth&code_challenge=6bc9f2382abfccdd17cc627ba2bef3bc&code_challenge_method=S256&scope=activity%20nutrition%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight";
 newUrl = 'https://www.fitbit.com/';
  
 constructor() {
    this.notificationTrigger();

    Browser.addListener('browserPageLoaded', (info: any) => {
      console.log('browserPageLoaded event called: ' + JSON.stringify(info));
    });

    Browser.addListener('browserFinished', (info: any) => {
      console.log('browserFinished event called: ' + JSON.stringify(info));
    });
    // Browser.prefetch({
    //   urls: [this.url]
    // });
  }

   async openUrl(){
    App.addListener('appUrlOpen', (data) => {
      console.log('Data: '+JSON.stringify(data));
     });
     
     this.addRedirectListener();


    await Browser.open({toolbarColor: '#f4dc41', url:this.url});
    // App.addListener('appUrlOpen', async (data) => {
    //   await Browser.open({toolbarColor: '#f4dc41', url:this.url});
    // });
  }
   async addRedirectListener() {
    App.addListener('appUrlOpen', async (data: any) => {
      console.log('appUrlOpen: '+data.url);
      console.debug('AppComponent - constructor - appUrlOpen');
      if(data.url.indexOf('callback#')!=-1) {
        let regEx = /(callback#access_token=)(.*)/g;
        let code = regEx.exec(data.url)[2];
        console.log(code);
      }
      Browser.close();
    });
  }
notificationTrigger(){
  LocalNotifications.schedule({
    notifications: [
      {
        title: "Title",
        body: "Body",
        id: 1,
        schedule: { at: new Date(Date.now() + 1000 * 5) },
        sound: null,
        attachments: null,
        actionTypeId: "",
        extra: null
      }
    ]
  });
}

}
