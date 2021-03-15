import React, { useState, useContext, useEffect } from 'react';
import { auth } from '../firebase/firebase';

import Loader from '../components/UI/Loader/Loader';

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState(null);

	function signup(email, password) {
		// return promise 
		return auth.createUserWithEmailAndPassword(email, password);
	}

	function signIn(email, password) {
		return auth.signInWithEmailAndPassword(email, password);
	}

	function signOut() {
		return auth.signOut();
	}

	function resetPassword(email) {
		return auth.sendPasswordResetEmail(email);
	}

	function updateEmail(email) {
		user.updateEmail(email);
	}

	function updatePassword(password) {
		user.updatePassword(password);
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			setUser(user);
			setLoading(false);
		});
		return unsubscribe;
	}, []);

	const context = {
		user,
		signup,
		signIn,
		signOut,
		resetPassword,
		updateEmail,
		updatePassword
	};

	// render children after user Authorization check

	return (
		<AuthContext.Provider value={context} >
			{loading ? <Loader /> : children}
		</AuthContext.Provider>
	);
}
