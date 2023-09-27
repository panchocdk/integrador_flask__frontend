window.addEventListener('load', function () {
    getProfile();
    getServersXUsers();
});

document.getElementById("logout").addEventListener("click", function () {
    logout();
});

document.getElementById("explorer").addEventListener("click", function () {
    getServers();
})

function getProfile() {
    fetch("http://127.0.0.1:5000/user/profile", {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => {
        if (response.status === 200) {
            return response.json().then(data => {

                console.log(data)
                document.getElementById("name").innerText = data.user_name;
                document.getElementById("avatar").src = data.profile_image;

            })
        } else {
            return response.json().then(data => {
                document.getElementById("message").innerHTML = data.message;
            });
        }
    })
    .catch(error => {
        document.getElementById("message").innerHTML = "An error occurred.";
    })
}

function getServersXUsers() {
    fetch("http://127.0.0.1:5000/server/uxs", {
        method: "GET",
        credentials: 'include'
    })
    .then(response => {
        if (response.status === 200) {
            return response.json().then(data1 => {
                console.log(data1);
                if (data1.length > 0) {
                    console.log(data1[0])
                    for (const server of data1) {
                        console.log(server);
                        const servElement = document.createElement('div');
                        servElement.classList.add('sxuc');
                        const imgElement = document.createElement('img');
                        imgElement.src = "icons\\icon server.png";
                        imgElement.title = server.description;
                        imgElement.classList.add('icon');
                        const spanElement = document.createElement('span');
                        spanElement.textContent = server.server_name;
                        spanElement.classList.add('servername');
                        servElement.appendChild(imgElement);
                        servElement.appendChild(spanElement);
                        document.getElementById("sxu").appendChild(servElement);
                    }
                } else {
                    document.getElementById("general").classList.add('active');
                    const spanElement = document.createElement('span');
                    spanElement.classList.add('message');
                    spanElement.textContent = 'Aun no te has unido a un servidor';
                    const brElement = document.createElement('br');
                    const spanElement2 = document.createElement('span');
                    spanElement2.classList.add('message');
                    spanElement2.textContent = 'Intenta buscar uno o crea uno propio';
                    document.getElementById("general").appendChild(spanElement);
                    document.getElementById("general").appendChild(brElement);
                    document.getElementById("general").appendChild(spanElement2);
                }
            })
        } else {
            return response.json().then(data1 => {
                console.log(data1.message);
            })
        }
    })
    .catch(error => {
        console.log("An error occurred.")
    })
}

const wrapperAdd = document.querySelector('.wrapper.add');
const btnCancelAdd = document.querySelector('.btn.csa');
let serverName = '';
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('servname')) {
        console.log(event.target.textContent);
        serverName = event.target.textContent
        document.getElementById("message1").innerText = '¿Quieres unirte a '+serverName+'?';
        wrapperAdd.classList.add('active');
    }
});

btnCancelAdd.addEventListener('click', () => {
    wrapperAdd.classList.remove('active')
})

document.getElementById("accept").addEventListener('click',() => {
    fetch("http://127.0.0.1:5000/server/uxs", {
        method: "GET",
        credentials: 'include'
    })
    .then(response => {
        if (response.status === 200) {
            return response.json().then(data3 => {
                console.log(data3)
                const exist = registered(data3, serverName);
                if (data3.length === 0 || exist === false) {
                    registeruxs();
                    wrapperAdd.classList.remove('active');
                } else {
                    document.getElementById("message").innerHTML = 'Ya esta unido a este servidor';
                }
            })
        } else {
            return response.json().then(data3 => {
                document.getElementById("message").innerHTML = data3.message;
            });
        }
    })
    .catch(error => {
        document.getElementById("message").innerHTML = "An error occurred."+error;
    })
})

function registered(list, name) {
    for (datum of list) {
        if (datum.server_name === name) {
            return true
        }
    }
    return false
}

function registeruxs() {
    const data4 = {
        server_name: serverName,
    }
    fetch("http://127.0.0.1:5000/server/uxs", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data4),
        credentials: 'include'
    })
    .then(response => {
        if (response.status === 201) {
            const servElement = document.createElement('div');
            servElement.classList.add('sxuc');
            const imgElement = document.createElement('img');
            imgElement.src = "icons\\icon server.png";
            imgElement.classList.add('icon');
            const spanElement = document.createElement('span');
            spanElement.textContent = data4.server_name;
            spanElement.classList.add('servername');
            servElement.appendChild(imgElement);
            servElement.appendChild(spanElement);
            document.getElementById("sxu").appendChild(servElement);
        } else {
            return response.json().then(data4 => {
                console.log(data4.message);
            });
        }
    })
    .catch(error => {
        console.log("An error occurred." + error);
    });
}

const wrapperCreate = document.querySelector('.wrapper.create');
const createServer = document.querySelector('.icon#add');
const btnCancelCreate = document.querySelector('.btn.csc');

createServer.addEventListener('click', () => {
    wrapperCreate.classList.add('active');
})

btnCancelCreate.addEventListener('click', () => {
    wrapperCreate.classList.remove('active');
})

document.getElementById("serverForm").addEventListener("submit", function (event) {
    event.preventDefault();
    register();
    wrapperCreate.classList.remove('active');
});

function register() {
    const data5 = {
        server_name: document.getElementById("server_name").value,
        description: document.getElementById("description").value,
    };

    fetch("http://127.0.0.1:5000/server/create", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data5),
        credentials: 'include'
    })
    .then(response => {
        if (response.status === 201) {
            const servElement = document.createElement('div');
            servElement.classList.add('sxuc');
            const imgElement = document.createElement('img');
            imgElement.src = "icons\\icon server.png";
            imgElement.title = data5.description;
            imgElement.classList.add('icon');
            const spanElement = document.createElement('span');
            spanElement.textContent = data5.server_name;
            spanElement.classList.add('servername');
            servElement.appendChild(imgElement);
            servElement.appendChild(spanElement);
            document.getElementById("sxu").appendChild(servElement);
        } else {
            return response.json().then(data5 => {
                console.log(data5.message);
                document.getElementById("message").innerHTML = data5.message;
            });
        }
    })
    .catch(error => {
        console.log("An error occurred." + error);
        document.getElementById("message").innerHTML = data5.message;
    });

}

function logout() {
    fetch("http://127.0.0.1:5000/user/logout", {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => {
        if (response.status === 200) {
            window.location.href = "index.html";
        }
    })
}

function getServers() {
    fetch("http://127.0.0.1:5000/server", {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => {
        if (response.status === 200) {
            return response.json().then(data2 => {
                console.log(data2);
                if (data2.length > 0) {
                    console.log(data2[0])
                    for (const server of data2) {
                        console.log(server);
                        document.getElementById("general").classList.remove('active');
                        document.getElementById("chat").classList.remove('active');
                        document.getElementById("explore").classList.add('active');
                        const servElement = document.createElement('div');
                        servElement.classList.add('sxuc');
                        const imgElement = document.createElement('img');
                        imgElement.src = "icons\\icon server.png";
                        imgElement.title = server.description;
                        imgElement.classList.add('icon');
                        const spanElement = document.createElement('span');
                        spanElement.textContent = server.server_name;
                        spanElement.classList.add('servname');
                        servElement.appendChild(imgElement);
                        servElement.appendChild(spanElement);
                        document.getElementById("explore").appendChild(servElement);
                    }
                } else {
                    document.getElementById("general").classList.add('active');
                    document.getElementById("chat").classList.remove('active');
                    document.getElementById("explore").classList.remove('active');
                    const spanElement = document.createElement('span');
                    spanElement.classList.add('message');
                    spanElement.textContent = 'Aun no hay servidores creados';
                    const brElement = document.createElement('br');
                    const spanElement2 = document.createElement('span');
                    spanElement2.classList.add('message');
                    spanElement2.textContent = 'Crea uno propio';
                    document.getElementById("general").appendChild(spanElement);
                    document.getElementById("general").appendChild(brElement);
                    document.getElementById("general").appendChild(spanElement2);
                }
            })
        } else {
            return response.json().then(data2 => {
                console.log(data2.message);
            })
        }
    })
}