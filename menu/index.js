document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById("cardContainer");
    const cardsData = [
        {title:"Users", url:"../users"},
        {title:"Organizations", url:"../organizations"},
        {title:"Products", url:"../products"},
        {title:"Options", url:"../options"},
        {title:"Exit", url:"../", color:"#f00"},
    ];

    cardsData.forEach(obj => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.textContent = obj.title;
        card.style.color = obj.color || "black";
        card.style.border = "1px solid black";
        card.onclick = () => {
            if (!obj.url) return;
            window.location.href = obj.url;
        };
        container.appendChild(card);
    });
});