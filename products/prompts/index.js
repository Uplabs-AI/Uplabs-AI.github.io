let state = {};

const init = async () => {
    const params = new URLSearchParams(window.location.search);
    state.id_product = params.get('id');
    paint();
};

const conect = async () => {
    if(!state.url) {
        state.url = await fetch("../../config.json").then(response => response.json()).then(data => data.urlreplit);
    }
    if(!state.token) {
        const response = await fetch(state.url+"/login?user=admin&password=admin", {
            method:"POST"
        });        
        const data = await response.json();
        state.token = data.access_token;
    }
};

const getPrompts = async () => {
    await conect();
    return new Promise((resolve, reject) => {
        fetch(state.url+"/prompts/id_product/"+state.id_product, {
            method:"GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${state.token}`
            }
        })  
        .then((response) => response.json())
        .then((data) => {
            resolve(data.data);
        }).catch((error) => {
            reject(error);
        });
    });
};
const save=()=>{
    if(!state.obj) state.obj = {id_product:state.id_product};
    state.obj.prompt = document.getElementById("ta-grande").value;
    if(state.actions === "insert"){
        savePrompt().then(() => {
            alert("Prompt saved!");
        }).catch((error) => {
            alert("Error: "+error);
        });
    } else {
        updatePrompt().then(() => {
            alert("Prompt updated!");
        }).catch((error) => {
            alert("Error: "+error);
        });
    }

};
const savePrompt = async () => {
    await conect();
    return new Promise((resolve, reject) => {
        fetch(state.url+"/prompts/", {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${state.token}`
            },
            body: JSON.stringify(state.obj)
        })  
        .then((response) => response.json())
        .then((data) => {
            resolve(data.data);
        }).catch((error) => {
            reject(error);
        });
    })
};
const updatePrompt = async () => {
    await conect();
    return new Promise((resolve, reject) => {
        fetch(state.url+"/prompts/"+state.obj.id, {
            method:"PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${state.token}`
            },
            body: JSON.stringify(state.obj)
        })  
        .then((response) => response.json())
        .then((data) => {
            resolve(data.data);
        }).catch((error) => {
            reject(error);
        });
    })
};

const paint= async()=> {
    const container = document.getElementById("cardContainer");
    container.innerHTML = "<div style='display:flex; justify-content:center;'><img alt='' style='width:25px;' src='../../images/load.gif'></div>";
    state.obj = await getPrompts();
    container.innerHTML="";
    const card = document.createElement("textarea");
    card.classList.add("ta-grande");
    card.id = "ta-grande";
    
    state.actions = "insert";    
    if(state.obj?.prompt){
        card.textContent = state.obj?.prompt;
        state.actions = "update";
    }
    
    container.appendChild(card);
};

const testWtspp=async()=>{
    let phone = document.getElementById("phone").value;
    if(!phone || phone.length < 12) {
        document.getElementById("phone").style.border = "1px solid red";
        return;
    }

};

const testVapi=async()=>{
    let phone = document.getElementById("phone").value;
    if(!phone || phone.length < 12) {
        document.getElementById("phone").style.border = "1px solid red";
        return;
    }
    fetch('https://api.vapi.ai/call', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 291d8008-63de-4428-af4d-a0f9c4a9d125',
        },
        body: JSON.stringify(
            {
                assistant:{
                    firstMessage: "Hola como estas, estas ahi?",
                    model: {
                        provider: "openai",
                        model: "gpt-3.5-turbo",
                        messages: [
                            {
                                role: "system",
                                content: state.obj?.prompt
                            }
                        ]
                    },
                    voice: {
                        provider: "11labs",
                        voiceId: "3Fx71T889APcHRu4VtQf"
                    }
                },
                phoneNumberId: "f5ab361a-3bf6-4780-8ee1-3e0eaf6cab4b",
                customer: {
                    number: phone
                }
            }
        )
    }).then(response => response.json())
    .then(data => {
        alert("Call made!");
    }).catch(error => {
        alert("Error: "+error);
    });
};


init();