const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nick");
const messageFrom = document.querySelector("form ");

const socket = new WebSocket(`ws://${window.location.host}`);

function makeMessage(type, payload){
    const msg = {type, payload};
    return JSON.stringify(msg);
}

function handleOpen(){
    console.log("Connected to Server");
};

socket.addEventListener("open", handleOpen);

socket.addEventListener("message", async(message) => {
    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.append(li);
    
});

socket.addEventListener("close", () => {
    console.log("Disconnected from Server");
});


function handleSubmit(event){
    event.preventDefault();
    const input = messageFrom.querySelector("input");
    socket.send(makeMessage("new_message",input.value));
    input.value = "";
}

function handleNickSubmit(event){
    event.preventDefault();
    const input = nickForm.querySelector("input");

    socket.send(makeMessage("nickName", input.value));

}

messageFrom.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);