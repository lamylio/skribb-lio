
socket.on('user_joined', (message) => {
    playAudio(AUDIO.USER_JOIN);
    createChatMessage({ console: true, content: `<b class="green-text text-darken-3"><i class='skicon-plus-squared'></i> ${message.username} a rejoint.</b>` });
});

socket.on('user_left', (message) => {
    createChatMessage({ console: true, content: `<b class="red-text text-darken-3"><i class='skicon-minus-squared'></i> ${message.username} a quitté.</b>` });
})

/* Game-users related listeners */

socket.on('host_changed', (message) => {
    createChatMessage({ console: true, content: `<b class="teal-text"><i class='skicon-star'></i> ${message.username} devient l'hôte</b>` });
    for (let s of document.querySelectorAll('.setting')) {
        for (let e of s.children) {
            if (localStorage.username != message.username) e.setAttribute('disabled', '');
            else e.removeAttribute('disabled');
        }
    }
    document.querySelector("#input_setting_talk").removeAttribute('disabled');
    document.querySelector("#button_start_game").removeAttribute('disabled');
});

socket.on('drawer_changed', (message) => {
    if (message.username == localStorage.username) {
        setTimeout(() => {
            drawCursor();
            drawzone.removeAttribute('disabled');
        }, 1100);
    }
    else {
        drawzone.style.cursor = 'not-allowed';
        drawzone.setAttribute('disabled', '');
    }
    createChatMessage({ console: true, content: `<b class="blue-text text-darken-3"><i class='skicon-palette'></i> ${message.username} dessine.</b>` });
});

/* --- */

socket.on('list_users', (message) => {
    let usb = document.querySelector('.userbox');
    usb.textContent = '';
    for(user of message.users){
        let li = createCustomElement('li', usb, { class: ['user', 'card'], content: `${user.username} : ${user.score} ${user.score > 0 ? 'points' : 'point'}`, username: user.username});
        if (user.drawer) li.classList.add('blue-text', 'text-darken-3');
    }
})

function addUserToList(username) {
    createCustomElement('i',
        createCustomElement('li', document.querySelector('.userbox'), { class: ['user', 'card'], content: username, username: username }),
    { class: ['skicon-user-circle'] });
}