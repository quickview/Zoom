const messageList = document.querySelector("ul");
const messageFrom = document.querySelector("form ");

const socket = new WebSocket(`ws://${window.location.host}`);

function handleOpen(){
    console.log("Connected to Server");
};

socket.addEventListener("open", handleOpen);

socket.addEventListener("message", async(message) => {
    if(typeof message.data === 'string'){
        console.log('New message :', message.data);
    }else{
        const messageText = await message.data.text();
        console.log(messageText);
    }
    console.log("Just gor this: ", message.data, "from the Server");
});

socket.addEventListener("close", () => {
    console.log("Disconnected from Server");
});


function handleSubmit(event){
    event.preventDefault();
    const input = messageFrom.querySelector("input");
    socket.send(input.value);
    input.value = "";
}


messageFrom.addEventListener("submit", handleSubmit);