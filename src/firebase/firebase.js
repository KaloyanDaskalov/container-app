import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
	apiKey: "AIzaSyBQJOtnwAXv0VowoDH_0Fh3ePMll9hHMc4",
	authDomain: "containers-app.firebaseapp.com",
	projectId: "containers-app",
	storageBucket: "containers-app.appspot.com",
	messagingSenderId: "937072925910",
	appId: "1:937072925910:web:a73261d7b9dd21fa1ffd77",
	measurementId: "G-Q43YW2J1GS"
});

export const auth = app.auth();
export default app;