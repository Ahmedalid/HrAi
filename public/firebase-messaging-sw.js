
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');


firebase.initializeApp({
  apiKey: "AIzaSyB1FHYC1PnJpnQ_YS-8R3o6ulBNlJD13Ak",
  authDomain: "haha-10bcc.firebaseapp.com",
  projectId: "haha-10bcc",
  storageBucket: "haha-10bcc.appspot.com",
  messagingSenderId: "257470577005",
  appId: "1:257470577005:web:e6e13270a13064c9368264",
  measurementId: "G-Y6RWCJ4WGR"
});


const messaging = firebase.messaging();


messaging.onBackgroundMessage((payload) => {
  console.log( payload);
   

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});