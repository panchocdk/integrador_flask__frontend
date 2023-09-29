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

let usName = '';
let usImg = '';
let usID = '';

function getProfile() {
    fetch("http://127.0.0.1:5000/user/profile", {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => {
        if (response.status === 200) {
            return response.json().then(data => {
                document.getElementById("name").innerText = data.user_name;
                usName = data.user_name;
                document.getElementById("avatar").src = data.profile_image;
                usImg = data.profile_image;
                usID = data.user_id;

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
                if (data1.length > 0) {
                    for (const server of data1) {
                        const servElement = document.createElement('div');
                        servElement.classList.add('sxuc');
                        const imgElement = document.createElement('img');
                        imgElement.src = "icons\\icon server.png";
                        imgElement.alt = server.server_name;
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
        serverName = event.target.textContent;
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
            imgElement.alt = data4.server_name;
            imgElement.title = data4.description;
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
const createServer = document.querySelector('.sicon#add');
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
            imgElement.alt = data5.server_name;
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
        document.getElementById("message").innerHTML = "An error occurred." + error;
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
                if (data2.length > 0) {
                    const exp = document.getElementById("explor");
                    while (exp.firstChild) {
                        exp.removeChild(exp.firstChild);
                    }
                    document.getElementById("general").classList.remove('active');
                    document.getElementById("chat").classList.remove('active');
                    document.getElementById("explore").classList.add('active');
                    for (const server of data2) {
                        const servElement = document.createElement('div');
                        servElement.classList.add('sxuc');
                        const imgElement = document.createElement('img');
                        imgElement.src = "icons\\icon server.png";
                        imgElement.title = server.description;
                        imgElement.classList.add('icons');
                        const spanElement = document.createElement('span');
                        spanElement.textContent = server.server_name;
                        spanElement.classList.add('servname');
                        servElement.appendChild(imgElement);
                        servElement.appendChild(spanElement);
                        document.getElementById("explor").appendChild(servElement);
                    }
                } else {
                    const gral = document.getElementById("general");
                    while (gral.firstChild) {
                        gral.removeChild(gral.firstChild);
                    }
                    document.getElementById("chat").classList.remove('active');
                    document.getElementById("explore").classList.remove('active');
                    document.getElementById("general").classList.add('active');
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

document.getElementById("search").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        searchServer();
    }
});

function searchServer() {
    const s_name = document.getElementById("search").value;
    fetch(`http://127.0.0.1:5000/server/${s_name}`, {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => {
        if (response.status === 200) {
            return response.json().then(data6 => {
                if (data6.length > 0) {
                    const exp = document.getElementById("explor");
                    while (exp.firstChild) {
                        exp.removeChild(exp.firstChild);
                    }
                    /*document.getElementById("general").classList.remove('active');
                    document.getElementById("chat").classList.remove('active');
                    document.getElementById("explore").classList.add('active');*/
                    for (const server of data6) {
                        const servElement = document.createElement('div');
                        servElement.classList.add('sxuc');
                        const imgElement = document.createElement('img');
                        imgElement.src = "icons\\icon server.png";
                        imgElement.title = server.description;
                        imgElement.classList.add('icons');
                        const spanElement = document.createElement('span');
                        spanElement.textContent = server.server_name;
                        spanElement.classList.add('servname');
                        servElement.appendChild(imgElement);
                        servElement.appendChild(spanElement);
                        document.getElementById("explor").appendChild(servElement);
                    }
                } else {
                    const exp = document.getElementById("explor");
                    while (exp.firstChild) {
                        exp.removeChild(exp.firstChild);
                    }
                    const spanElement = document.createElement('span');
                    spanElement.classList.add('message');
                    spanElement.textContent = 'No se encontraron coincidencias de busqueda';
                    document.getElementById("explor").appendChild(spanElement);
                }
            })
        } else {
            return response.json().then(data6 => {
                console.log(data6.message);
            })
        }
    })
}

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('icon')) {
        const serv_name = event.target.alt;
        fetch(`http://127.0.0.1:5000/channel/all/${serv_name}`, {
            method: 'GET',
            credentials: 'include',
        })
        .then(response => {
            if (response.status === 200) {
                return response.json().then(data7 => {
                    document.getElementById("chat").classList.remove('active');
                    document.getElementById("explore").classList.remove('active');
                    document.getElementById("general").classList.remove('active');
                    const chann = document.getElementById("channels");
                    while (chann.firstChild) {
                        chann.removeChild(chann.firstChild);
                    }
                    const channelElement = document.createElement('div');
                    channelElement.classList.add("channel");
                    channelElement.id = "channel";
                    const navElement = document.createElement('nav');
                    navElement.classList.add("navigater");
                    navElement.id = "navigater";
                    const c_channElement = document.createElement('div');
                    c_channElement.classList.add("c_chann");
                    c_channElement.id = "c_chann";
                    const btnElement = document.createElement('button');
                    btnElement.type = "button";
                    btnElement.classList.add("btnc");
                    btnElement.id = "btnChannel";
                    btnElement.textContent = "Añadir un canal";
                    btnElement.addEventListener('click', function(event) {
                        event.preventDefault();
                        activeBtn(serv_name, navElement);
                    })
                    channelElement.appendChild(navElement);
                    c_channElement.appendChild(btnElement);
                    document.getElementById("channels").appendChild(channelElement);
                    document.getElementById("channels").appendChild(c_channElement);
                    if (data7.length > 0) {
                        for (const channel of data7) {
                            const aElement = document.createElement('a');
                            aElement.textContent = channel.channel_name;
                            aElement.title = channel.description;
                            aElement.id = channel.channel_name;
                            aElement.addEventListener('click', function(event) {
                                event.preventDefault();
                                activeChat(channel.channel_name);
                            })
                            document.getElementById("navigater").appendChild(aElement);
                        }
                    } else {
                    const gral = document.getElementById("general");
                    while (gral.firstChild) {
                        gral.removeChild(gral.firstChild);
                    }
                    document.getElementById("chat").classList.remove('active');
                    document.getElementById("explore").classList.remove('active');
                    document.getElementById("general").classList.add('active');
                    const span2Element = document.createElement('span');
                    span2Element.classList.add('message');
                    span2Element.textContent = 'Este servidor aun no tiene canales';
                    document.getElementById("general").appendChild(span2Element);
                    }
                })
            } else {
                return response.json().then(data7 => {
                    console.log(data7.message);
                })
            }
        })
    }
})

const wrapperChannel = document.querySelector('.wrapper.addChannel');
const btnCancelCChannel = document.querySelector('.btn.cca');
                    
btnCancelCChannel.addEventListener('click', () => {
    wrapperChannel.classList.remove('active');
})

function activeBtn(servername, element) {
    wrapperChannel.classList.add('active');
    console.log(servername);
    document.getElementById("channelForm").addEventListener("submit", function (event) {
        event.preventDefault();
        registerChannel(servername, element);
        wrapperChannel.classList.remove('active');
    });
}

function registerChannel(servername, element) {
    const data = {
        channel_name: document.getElementById("channel_name").value,
        server_name: servername,
        description: document.getElementById("description").value,
    };
    fetch("http://127.0.0.1:5000/channel/create", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include'
    })
    .then(response => {
        if (response.status === 201) {
            const aCElement = document.createElement('a');
            aCElement.textContent = data.channel_name;
            aCElement.title = data.description;
            aCElement.id = data.channel_name;
            aCElement.addEventListener('click', function(event) {
                event.preventDefault();
                activeChat(channel.channel_name);
            })
            element.appendChild(aCElement);
        } else {
            return response.json().then(data => {
                console.log(data.message);
                document.getElementById("message").innerHTML = data.message;
            });
        }
    })
    .catch(error => {
        console.log("An error occurred." + error);
        document.getElementById("message").innerHTML = "An error occurred." + error;
    });
}

let channelName = '';

function activeChat(channel) {
    document.getElementById("chat").classList.add('active');
    document.getElementById("explore").classList.remove('active');
    document.getElementById("general").classList.remove('active');
    channelName = channel;
    const msgArea = document.getElementById("messageArea");
    while (msgArea.firstChild) {
        msgArea.removeChild(msgArea.firstChild);
    }
    fetch(`http://127.0.0.1:5000/chat/all/${channel}`, {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => {
        if (response.status === 200) {
            return response.json().then(data8 => {
                if (data8.length > 0) {
                    for (messageChat of data8) {
                        const divElement = document.createElement('div');
                        divElement.classList.add('containerChat');
                        const div2Element = document.createElement('div');
                        div2Element.classList.add('profile');
                        console.log(messageChat.user_id)
                        getChatProfile(messageChat.user_id, messageChat.chat_date, div2Element)
                        const div3Element = document.createElement('div');
                        div3Element.classList.add('chatmessage');
                        div3Element.textContent = messageChat.message;
                        /* aqui deberia controlar los mensajes del usuario para permitir edicion */
                        
                        divElement.appendChild(div2Element);
                        divElement.appendChild(div3Element);
                        document.getElementById("messageArea").appendChild(divElement);
                    }
                } else {
                    const ch = document.getElementById("messageArea");
                    while (ch.firstChild) {
                        ch.removeChild(ch.firstChild);
                    }
                    const spElement = document.createElement('span');
                    spElement.classList.add('message');
                    spElement.textContent = 'Aun no hay mensajes en este canal';
                    document.getElementById("messageArea").appendChild(spElement);
                }
            })
        }
    })
    .catch(error => {
        console.log("An error occurred." + error);
    })
}

document.getElementById("send").addEventListener('click', () => {
    const userMessage = document.getElementById("messageInput").value;
    if (userMessage.trim() !== '') {
        const data9 = {
            channel_name: channelName,
            message: userMessage,
        }
        fetch("http://127.0.0.1:5000/chat/create", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data9),
            credentials: 'include'
        })
        .then(response => {
            if (response.status === 201) {
                const divElement = document.createElement('div');
                divElement.classList.add('containerChat');
                const div2Element = document.createElement('div');
                div2Element.classList.add('profile');
                const usDivElement = document.createElement('div');
                usDivElement.classList.add('user')
                const uIElement = document.createElement('img');
                uIElement.classList.add('avatar');
                uIElement.src = usImg;
                const uSElement = document.createElement('span');
                uSElement.classList.add('usernameChat');
                uSElement.textContent = usName;
                const spanElement = document.createElement('span');
                spanElement.classList.add('date');
                const now = new Date();
                const date = now.toLocaleDateString();
                const hour = now.toLocaleTimeString();
                spanElement.textContent = date + ' ' + hour;
                const div3Element = document.createElement('div');
                div3Element.classList.add('chatmessage');
                div3Element.textContent = data9.message;
                /* aqui deberia controlar los mensajes del usuario para permitir edicion */
                usDivElement.appendChild(uIElement);
                usDivElement.appendChild(uSElement);
                div2Element.appendChild(usDivElement);
                div2Element.appendChild(spanElement);
                divElement.appendChild(div2Element);
                divElement.appendChild(div3Element);
                document.getElementById("messageArea").appendChild(divElement);
                document.getElementById("messageInput").value = "";
            } else {
                return response.json().then(data9 => {
                    console.log(data9.message);
                });
            }
        })
        .catch(error => {
            console.log("An error occurred." + error);
        })
    }
})

function getChatProfile(id, date, element) {
    const uId = {
        user_id: id,
    }
    fetch(`http://127.0.0.1:5000/user/${id}`, {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => {
        if (response.status === 200) {
            return response.json().then(data => {
                const usDivElement = document.createElement('div');
                usDivElement.classList.add('user')
                const uIElement = document.createElement('img');
                uIElement.classList.add('avatar');
                uIElement.src = data.profile_image;
                const uSElement = document.createElement('span');
                uSElement.classList.add('usernameChat');
                uSElement.textContent = data.user_name;
                const spanElement = document.createElement('span');
                spanElement.classList.add('date');
                spanElement.textContent = messageChat.chat_date;
                usDivElement.appendChild(uIElement);
                usDivElement.appendChild(uSElement);
                element.appendChild(usDivElement);
                element.appendChild(spanElement);
            })
        }
    })
}