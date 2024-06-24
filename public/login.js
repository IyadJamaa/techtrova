const e = require("express");


const login = (email, password) => {
    alert(email, password);
};

document.querySelector('.form').addEventListener('submite', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
});