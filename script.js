const iconMap={
    0:'☀️',1:'🌤️',2:'⛅',3:'☁️',
    45:'🌫️',48:'🌫️',
    51:'🌦️',53:'🌦️',55:'🌦️',
    61:'🌧️',63:'🌧️',65:'🌧️',
    71:'🌨️',73:'🌨️',75:'🌨️',
    80:'🌦️',81:'☁️',82:'☁️',
    95:'⛈️'
}
const textMap={
    0:'Clear sky',1:'Mainly clear',2:'Partly cloudy',3:'Overcast',
    45:'Foggy',48:'Foggy',
    51:'Drizzle',53:'Drizzle',55:'HeavyDrizzle',
    61:'Rain',63:'Rain',65:'Heavy rain',
    71:'Snow',73:'Snow',75:'Heavy snow',
    80:'Rain showers',81:'Rain showers',82:'violent',
    95:'Thunderstorm'
}

const getIcon=c=>iconMap[c]||'☁️';
const getText=c=>textMap[c]||'Unknown';

async function getCoords(city){
    const r=await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code,pressure_msl&timezone=auto`.then(r=>r.json());
    );
    const d=await r.json();

    if(!d.results || d.results.length===0){
        throw new Error('City not found');
    }
    return d.results[0];
}
function updateCurrentWeather(loc,w){
    const c=w.current;
    document.getElementById('locationName').textContent=`${loc.name}, ${loc.country}`;
    data.textContent=new Date().toDateString();
currentIcon.textContent=getIcon(c.weather_code);
temperature.textContent=Math.round(c.temperature_2m)+'°C';
description.textContent=getText(c.weather_code);
feelsLike.textContent=Math.round(c.apparent_temperature)+'°C';
humidity.textContent=c.relative_humidity_2m+ '%';
windSpeed.textContent=Math.round(c.wind_speed_10m)+ 'km/h';
pressure.textContent=Math.round(c.pressure_msl)+'hPa';

}
function updateDailyWeather(w){
    const daily=w.daily;
    const dailyContainer=document.getElementById('dailyContainer');
    dailyContainer.innerHTML='';
    for(let i=0;i<7;i++){
        const d=daily.time[i];
        const maxTemp=Math.round(daily.temperature_2m_max[i]);
        const minTemp=Math.round(daily.temperature_2m_min[i]);
        const code=daily.weather_code[i];
        const dailyItem=document.createElement('div');
        dailyItem.className='daily-item';
        dailyItem.innerHTML=`
        <div>${new Date(d).toLocaleDateString('en-US',{weekday:'long'})}</div>
        <div>${getIcon(code)}</div>
        <div>${maxTemp}°C/${minTemp}°C</div>
        `;
        dailyContainer.appendChild(dailyItem);
    }
}