const testGoHigLevel= async()=>{
    var url = document.getElementById('webHookGoHigLevel').value;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    });
    const data = await response.json();
    document.getElementById('test').innerHTML = JSON.stringify(data);
}