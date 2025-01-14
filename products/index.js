let state = {};

const init = async () => {
    paintProducts();
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
    const container = document.getElementById("cardContainer");
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
        card.style.border = "1px solid black";
        card.onclick = () => {
            window.location.href = "prompts/?id="+product.id;
        };
        container.appendChild(card);
    });
};

init();