let state = {};

const init=()=>{};


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

const uploadFile=()=>{
    alert("subiendo")
}

const testCall= async()=>{
    conect();

    let company_name =document.getElementById("company_name").value;
    let service =document.getElementById("service").value;
    let agent_name =document.getElementById("agent_name").value;
    let phone = document.getElementById("number").value;

    let aux = document.getElementById("buttonTest").innerHTML;
    
    state.resp = await new Promise((resolve, reject) => {
        fetch(state.url+"/v1/call", {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${state.token}`
            },
            body: JSON.stringify({product_id:"887de5a2-0352-4d53-8cee-b7b8e25c2f53", company_name, service, agent_name, phone})
        })  
        .then((response) => response.json())
        .then((data) => {
            resolve(data.data);
        }).catch((error) => {
            reject(error);
        });
    });

    alert(JSON.stringify(state.resp));
    
};

init();
