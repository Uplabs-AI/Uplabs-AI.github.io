var state = {};


const init = async () => {
    paintEnviroments();
};

const conect = async () => {
    if(!state.url) {
        state.url = await fetch("../config.json").then(response => response.json()).then(data => data.urlreplit);
    }
    if(!state.token) {
        const response = await fetch(state.url+"/login?user=admin&password=admin", {
            method:"POST"
        });
        const data = await response.json();
        state.token = data.access_token;
    }
};

const paintEnviroments = async () => {
    let env = await getEnviroments();
    document.getElementById("vapi_url").value = env.vapi_url;
    document.getElementById("vapi_token").value = env.vapi_token;
    document.getElementById("vapi_assistant_id").value = env.vapi_assistant_id;
    document.getElementById("vapi_phone_number_id").value = env.vapi_phone_number_id;
};

const getEnviroments = async () => {
    await conect();
    return new Promise((resolve, reject) => {
        fetch(state.url+"/enviroments", {
            method:"GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${state.token}`
            }
        })  
        .then((response) => response.json())
        .then((data) => {
            resolve(data.data[0]);
        }).catch((error) => {
            reject(error);
        });
    });
};

const saveEnviroments = async () => {
    let vapi_url = document.getElementById("vapi_url").value;
    let vapi_token = document.getElementById("vapi_token").value;
    let vapi_assistant_id = document.getElementById("vapi_assistant_id").value;
    let vapi_phone_number_id = document.getElementById("vapi_phone_number_id").value;
    

    let aux = document.getElementById("botonsave").innerHTML;
    document.getElementById("botonsave").innerHTML = "Saving...";
    
    await conect();
    let save = await new Promise((resolve, reject) => {
        fetch(state.url+"/enviroments/1", {
            method:"PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${state.token}`
            },
            body: JSON.stringify({
                vapi_url,
                vapi_token,
                vapi_assistant_id,
                vapi_phone_number_id
                })
            })  
        .then((response) => response.json())
        .then((data) => {
            resolve(data.data[0]);
        }).catch((error) => {
            reject(error);
        });
    });
    document.getElementById("botonsave").innerHTML = aux;
    alert("saveEnviroments");

};

init();