
const container = document.getElementById("cardContainer");
const cardsData = [
    {title:"Whatsapp", url:"../whatsapp", description:"Dashboard interactivo para visualizar métricas de negocio en tiempo real, con gráficos y filtros avanzados."},
    {title:"Nps", url:"../organizations", description:"Dashboard para medir la satisfacción del cliente y obtener retroalimentación."},
    {title:"Autos_x_km", url:"../products", description:"Análisis de ventas de autos por kilómetro recorrido."}
];

var card = "";
cardsData.forEach(obj => {

    card+="<div class='project-card' style='background: #050505; border-radius: 16px; box-shadow: 1px 1px 10px #fff; width: 340px; overflow: hidden; display: flex; flex-direction: column; align-items: stretch;'>";
    card+="<img src='https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80' alt='Proyecto IA y Código' style='width: 100%; height: 180px; object-fit: cover;'>";
    card+="<div style='padding: 20px; flex: 1;'>";
    card+="<h3 style='margin: 0 0 12px 0; color: #ffffff; font-size: 1.3rem;'>"+obj.title+"</h3>";
    card+="<p style='color: #36344d; margin-bottom: 18px;'>";
    card+=obj.description;
    card+="</p>";
    card+="<a href='"+obj.url+"' style='display: inline-block; background: #673de6; color: #fff; padding: 10px 22px; border-radius: 8px; text-decoration: none; font-weight: 500;'>Ver Proyecto</a>";
    card+="</div>";
    card+="</div>";
            
});

container.innerHTML=card;
