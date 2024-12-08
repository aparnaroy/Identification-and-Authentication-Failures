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

    let val = '';
    for (let i = 0; i < 5; i++) {
        val = val + (i * 2 + 1);
    }

    if (!password.startsWith(val)) {
        errorMessage.innerHTML = `Incorrect! Password should start with the value of val at the end of:
        <pre><code>
            let val = '';
            for (let i = 0; i < 5; i++) {
                val = val + (i * 2 + 1);
            }
        </code></pre>`;
        errorMessage.style.display = 'block';
        return;
    }

    if (!password.includes(document.title)) {
        errorMessage.textContent = `Incorrect! Password should contain the title of this page`;
        errorMessage.style.display = 'block';
        return;
    }

    let result = 0;
    for (let i = 0; i < 4; i++) {
        result = result * 10 + (i + 1);
    }
    result += '*';

    if (!password.endsWith(result)) {
        errorMessage.innerHTML = `Close, but incorrect! Password should end with the result of doing:
        <pre><code>
            let result = 0;
            for (let i = 0; i < 4; i++) {
                result = result * 10 + (i + 1);
            }
            result += '*';
        </code></pre>`;
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
        console.error(error);
        errorMessage.textContent = 'Incorrect password. Please try again.';
        errorMessage.style.display = 'block';
    }
});