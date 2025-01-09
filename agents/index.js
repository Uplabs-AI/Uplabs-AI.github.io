var url;
var TOKEN;
let users = [];
let editingUserId = null;

function openModal(userId = null) {
    document.getElementById("userModal").style.display = "block";

    if (userId !== null) {
        const user = users.find(u => u.id === userId);
        document.getElementById("modal-title").textContent = "Editar Usuario";
        document.getElementById("user-id").value = user.id;
        document.getElementById("user-username").value = user.username;
        document.getElementById("user-password").value = user.password;
        document.getElementById("user-name").value = user.name;
        document.getElementById("user-email").value = user.email;
        document.getElementById("user-phone").value = user.phone;
        editingUserId = userId;
    } else {
        document.getElementById("modal-title").textContent = "Agregar Usuario";
        document.getElementById("user-id").value = "";
        document.getElementById("user-username").value = "";
        document.getElementById("user-password").value = "";
        document.getElementById("user-name").value = "";
        document.getElementById("user-email").value = "";
        document.getElementById("user-phone").value = "";
        editingUserId = null;
    }

    document.getElementById("user-name").focus();
}

function closeModal() {
    document.getElementById("userModal").style.display = "none";
}

const saveUser=async()=> {
    
    const username = document.getElementById("user-username").value;
    if(username.length < 3) {
        document.getElementById("user-username").style.border = "1px solid red";
        return;
    }

    const name = document.getElementById("user-name").value;
    if(name.length < 3) {
        document.getElementById("user-name").style.border = "1px solid red";
        return;
    }

    const email = document.getElementById("user-email").value;
    if(name.length < 3) {
        document.getElementById("user-email").style.border = "1px solid red";
        return;
    }
    
    const phone = document.getElementById("user-phone").value;
    if(name.length < 3) {
        document.getElementById("user-phone").style.border = "1px solid red";
        return;
    }
    
    const password = document.getElementById("user-password").value;
    if(password.length < 3) {
        document.getElementById("user-password").style.border = "1px solid red";
        return;
    }

    if (editingUserId !== null) {
        users = users.map(user =>
            user.id === editingUserId ? { id: user.id, name, email, phone } : user
        );
    } else {
        user=await addUser({ username, name, email, phone, password });
        users.push(user);
    }

    updateTable();
    closeModal();
}

function updateTable() {
    const tbody = document.getElementById("user-list");
    tbody.innerHTML = "";
    users.forEach(user => {
        tbody.innerHTML += `
            <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.description}</td>
                <td>${user.product_id}</td>
                <td>${user.user_id}</td>
                <td>
                    <button class="action-btn delete-btn" onclick="go('${user.id}')">--></button>
                    <button class="action-btn delete-btn" onclick="callUser('${user.id}', '${user.phone}')">📞</button>
                    <button class="action-btn edit-btn" onclick="openModal('${user.id}')">✏️</button>
                    <button class="action-btn delete-btn" onclick="deleteUser('${user.id}')">🗑️</button>
                </td>
            </tr>
        `;
    });
}

const go = async (userId) => {
    
};

const callUser = async (user, phone) => {
    let resp = await fetch(`https://api.vapi.ai/call`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 291d8008-63de-4428-af4d-a0f9c4a9d125' 
        },
        body: JSON.stringify({
            "phoneNumberId": "f5ab361a-3bf6-4780-8ee1-3e0eaf6cab4b",
            "customer": {
              "number": phone
            },
            "squadId": "d0632e48-0043-4d20-af26-8f2fea8f9888"
          })
    });

    console.log(resp);
};

const deleteUser = async (userId) => {
    if(!TOKEN) return;
    
    const response = await fetch(url+"/users/"+userId, {
        method:"DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${TOKEN}`
        }
    });
    
    const data = await response.json();
    //if(data.status==="success"){
        users = users.filter(user => user.id !== userId);
        updateTable();
    //}
}

const getToken= async () => {
    const response = await fetch(url+"/login?user=admin&password=admin", {
        method:"POST"
    });
    
    const data = await response.json();
    return data.access_token;
};

const getAgents = async () => {

    url = await fetch("../config.json").then(response => response.json()).then(data => data.urlreplit);

    TOKEN = await getToken();

    const response = await fetch(url+"/agents", {
        method:"GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${TOKEN}`
        }
    });
    
    const data = await response.json();
    users = data.data;
    updateTable();
};

const addUser = async (user) => {
    if(!TOKEN) return;
    
    const response = await fetch(url+"/users", {
        method:"POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${TOKEN}`
        },
        body: JSON.stringify(user)
    });
    const data = await response.json();
    return data.data;
};


const test = async () => {
    const hook = "https://services.leadconnectorhq.com/hooks/G1s1LLNAoX58MC0ZjJta/webhook-trigger/af8653ff-81ca-4846-b5ec-3cd12fdfcbd7";

    const response = await fetch(hook, {
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name:"test"})
    });
    const data = await response.json();
    document.getElementById("test").textContent = JSON.stringify(data);
    console.log(data);
};


getAgents();
