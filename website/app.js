/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'/'+ d.getDate()+'/'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
const baseURL= 'https://api.openweathermap.org/data/2.5/forecast?zip=';
const apiKey='&appid=6c8d54ed4eb942717fead23106b998d9&units=imperial';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performOnAction);

/* Function called by event listener */
function performOnAction(e){
    e.preventDefault();
    //debugger
    const newZip =  document.querySelector('#zip').value;
    console.log('new zip code ', newZip);
    const feeling = document.getElementById("feelings").value;
    getWeather(baseURL, newZip, apiKey)
    .then(function(data){
        console.log(data)
        //add data to POST request
        postData('/add', {date:newDate, temp:data.list[0].main.temp, content:feeling})
        updateUI();
    })
}

/* Function to GET Web API Data*/
const getWeather= async (base,zipcode, key)=>{
    
    const response = await fetch(base+zipcode+key)
    try {
        const data = response.json();
        console.log(data)
        return data;
    } catch (error) {
        console.log("GET web API error", error);
    }
}

/* Function to POST data */
const postData = async (url ='',data= {})=> {
    console.log(data);
    const response =await fetch (url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    try {
        const newD = await response.json();
        console.log(newData)
        return newD;
    } catch (error) {
        console.log("POST error", error);
    }
}

/* Function to GET Project Data */
const updateUI = async()=>{
    const request= await fetch('/all');
    try {
        const allD = await request.json();
        document.querySelector('#date').innerHTML=`Date: ${allD.date}`;
        document.querySelector('#temp').innerHTML=`Temp: ${allD.temp}`;
        document.querySelector('#content').innerHTML=`I feel: ${allD.content}`
    } catch (error) {
        console.log("error in get project data" ,error);
    }
}

