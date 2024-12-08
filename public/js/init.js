// Check if Firebase app is already initialized
if (!firebase.apps.length) {
    const firebaseConfig = {
        apiKey: "AIzaSyBE-pMwuyijg0VhxchKIfUUZBb7J_ydzDY",
        authDomain: "password--please.firebaseapp.com",
        databaseURL: "https://password--please-default-rtdb.firebaseio.com",
        projectId: "password--please",
        storageBucket: "password--please.firebasestorage.app",
        messagingSenderId: "923532330815",
        appId: "1:923532330815:web:e835ba760f17e65d8d358a",
        measurementId: "G-9434CRTXFP"
    };

    // Initialize Firebase only if it's not already initialized
    firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const database = firebase.database();
