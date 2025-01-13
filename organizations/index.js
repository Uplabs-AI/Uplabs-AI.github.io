var url;
var TOKEN;
let state = {};
let editingUserId = null;
let assistantId="694f9f41-56c0-456c-b233-07fd719dbcbb";
let vapiToken="291d8008-63de-4428-af4d-a0f9c4a9d125";

const init=()=>{
    //getOrganizations();
    paintProducts();
};

function updateTable() {
    const container = document.getElementById("cardContainer");
    //container.innerHTML = "";
    state.organizations.forEach(obj => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.textContent = obj.name;
        card.style.color = obj.color || "black";
        card.onclick = () => {
            alert(JSON.stringify(obj));
        };
        container.appendChild(card);
        
    });
}

const getProduct = async () => {
    await conect();
    return new Promise((resolve, reject) => {
        fetch(state.url+"/products", {
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

const paintProducts= async()=> {
    const container = document.getElementById("products");
    container.innerHTML = "<div style='display:flex; justify-content:center;'><img alt='' style='width:25px;' src='../images/load.gif'></div>";
    const products = await getProduct();
    container.innerHTML="";
    products.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("card");
        let html = `<div>${product.name}</div>`;
        if(product.type==="inbound"){
            html+=`<div style='color:blue;'>${product.type}</div>`;
        }else{
            html+=`<div style='color:green;'>${product.type}</div>`;
        }
        card.innerHTML = html;
        card.onclick = () => {
            var form = document.getElementById('organizationForm');
            if (form.checkValidity()) {
                state.product_selected = product;
                call();
            } else {
                alert('Please fill out all required fields.');
            }
            
        };
        container.appendChild(card);
    });
};

const updateAssistant=(prompt)=>{
    return new Promise((resolve, reject) => {
        fetch(`https://api.vapi.ai/assistant/${assistantId}`, {
            method:"PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${vapiToken}`
            },
            body: JSON.stringify({
                model: {
                    provider: "openai",
                    model: "gpt-4o-mini",
                    messages: [
                        {
                            role: "system",
                            content: prompt
                        }
                    ]
                }
            })
        })
        .then((response) => response.json())
        .then((data) => {
            if(data.error){
                alert("error!! "+data.error);
                return;
            }
            resolve(data);
        }).catch((error) => {
            reject(error);
        });
    });
};

const call=async()=>{

    let aux = document.getElementById("products").innerHTML;
    document.getElementById("products").innerHTML = "<div style='display:flex; justify-content:center;'><img alt='' style='width:25px;' src='../images/load.gif'></div>";

    
    let phone = document.getElementById("number").value;
    if(!phone || phone.length < 12) {
        document.getElementById("number").style.border = "1px solid red";
        return;
    }

    let company_name =document.getElementById("company_name").value;
    let service =document.getElementById("service").value;
    let agent_name =document.getElementById("agent_name").value;

    var prompt = state.product_selected.prompt
    .replaceAll("{{company_name}}", company_name)
    .replaceAll("{{service}}", service)
    .replaceAll("{{agent_name}}", agent_name);

    //console.log(state.product_selected?.prompt);

    await updateAssistant(prompt);


    fetch('https://api.vapi.ai/call', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${vapiToken}`,
        },
        body: JSON.stringify(
            {

                "assistantId": `${assistantId}`,
                "phoneNumberId": "8492b8ac-8bdc-4653-be87-68d006eb41d0",
                "customer": {
                  "number": phone
                }
              
              }
        )
    }).then(response => response.json())
    .then(data => {
        document.getElementById("products").innerHTML = aux;
        if(data.error){
            console.log(data);
            alert("error!! "+data.error);
            return;   
        }
        alert("Call made!");
    }).catch(error => {
        document.getElementById("products").innerHTML = aux;
        alert("Error: "+error);
    });
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

/*const getOrganizations = async () => {
    //const container = document.getElementById("cardContainer");
    //container.innerHTML = "<div style='display:flex; justify-content:center;'><img alt='' style='width:25px;' src='../images/load.gif'></div>";
    
    conect();
    const response = await fetch(url+"/organizations", {
        method:"GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${TOKEN}`
        }
    });
    
    const data = await response.json();
    state.organizations = data.data;
    updateTable();
};*/



init();
