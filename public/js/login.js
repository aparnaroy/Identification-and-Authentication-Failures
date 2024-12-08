import { auth, database } from './init.js';

const loginButton = document.getElementById('loginButton');
const errorMessage = document.getElementById('errorMessage');
const passwordInput = document.getElementById('password');

loginButton.addEventListener('click', async (e) => {
    e.preventDefault();

    const password = passwordInput.value;

    // Ensure a password was entered
    if (!password) {
        errorMessage.textContent = 'Password is required';
        errorMessage.style.display = 'block';
        return;
    }

    // Attempt to sign in
    try {
        await auth.signInWithEmailAndPassword('me@secure.com', password);

        const flagSnapshot = await database.ref('flag').once('value');
        if (flagSnapshot.exists()) {
            const flag = flagSnapshot.val();
            passwordInput.value = '';
            errorMessage.style.display = 'block';
            errorMessage.textContent = `Access Granted! Flag: ${flag}`;
            errorMessage.style.color = 'green';
        } else {
            alert('Flag not found in the database.');
        }

    } catch (error) {
        errorMessage.textContent = 'Incorrect password. Please try again.';
        errorMessage.style.display = 'block';
    }
});