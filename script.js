const API_KEY = import.meta.env.VITE_GEO_API;

const inputTextEl = document.querySelector(".input-box > input[type='text']");

const buttonEl = document.querySelector(".input-box > input[type='button']");

const IPaddressEl = document.getElementById("ip-address");

const locationEl = document.getElementById("location");

const timeZoneEl = document.getElementById("time-zone");

const ISPel = document.getElementById("isp");

let map;

fetch(`/.netlify/functions/fetch-map?domain=${inputTextEl.value}`)
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            map = L.map('map').setView([data.location.lat, data.location.lng], 13);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 10,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
            L.marker([data.location.lat, data.location.lng]).addTo(map);
            IPaddressEl.textContent =  data.ip;
            locationEl.textContent = data.location.city;
            timeZoneEl.textContent = `UTC ${data.location.timezone}`;
            ISPel.textContent = data.isp;
        })
        .catch(e=>alert(e));

buttonEl.addEventListener('click',function(){
    fetch(`/.netlify/functions/fetch-map?domain=${inputTextEl.value}`)
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            map.setView([data.location.lat, data.location.lng], 13);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
            L.marker([data.location.lat, data.location.lng]).addTo(map);
            IPaddressEl.textContent =  data.ip;
            locationEl.textContent = data.location.city;
            timeZoneEl.textContent = `UTC ${data.location.timezone}`;
            ISPel.textContent = data.isp;
        })
        .catch(e=>alert(e));
    }   
);

inputTextEl.addEventListener("keypress", (e)=>{
    if(e.key === "Enter"){
        e.preventDefault();
        buttonEl.click();
    }
});