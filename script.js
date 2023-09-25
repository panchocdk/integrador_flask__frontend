const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const regiskterLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');

regiskterLink.addEventListener('click', ()=> {
    wrapper.classList.add('active');
})

loginLink.addEventListener('click', ()=> {
    wrapper.classList.remove('active');
})

btnPopup.addEventListener('click', ()=> {
    wrapper.classList.add('active-popup');
})

iconClose.addEventListener('click', ()=> {
    wrapper.classList.remove('active-popup');
})

document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
    login();
});

function login() {
    const data = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
    };

    fetch("http://127.0.0.1:5000/user/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include'
    })
    .then(response => {
        if (response.status === 200) {
            // Redirect to profile page if login is successful
            return response.json().then(data => {
                window.location.href = "pagina2.html";
            });
        } else {
            return response.json().then(data => {
                document.getElementById("message").innerHTML = data.message;
            });
        }
    })
    .catch(error => {
        document.getElementById("message").innerHTML = "An error occurred.";
    });
}

document.getElementById("registerForm").addEventListener("submit", function (event) {
    event.preventDefault();
    register();
});

function register() {
    const data = {
        user_name: document.getElementById("r_username").value,
        email: document.getElementById("r_email").value,
        first_name: document.getElementById("r_first_name").value,
        last_name: document.getElementById("r_last_name").value,
        password: document.getElementById("r_password").value,
        date_of_birth: document.getElementById("r_date_of_birth").value,
    };

    fetch("http://127.0.0.1:5000/user/create", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include'
    })
    .then(response => {
        if (response.status === 201) {
            window.location.reload();
        } else {
            return response.json().then(data => {
                document.getElementById("r_message").innerHTML = data.message;
            });
        }
    })
    .catch(error => {
        document.getElementById("r_message").innerHTML = "An error occurred." + error;
    });
}