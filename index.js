const apiKey = "57d652be38ac587c95d809ddee59306a"
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&appid="

const searchBox = document.querySelector(".search input")
const searchBtn = document.querySelector(".search button")
const weatherIcon = document.querySelector(".weather-icon")

async function checkWeather(city) { // ส่ง argument เป็น city เข้าไป
    const response = await fetch(`${apiURL}${apiKey}&q=${city}`)
    const data = await response.json()

    if(!data.name) { // ถ้าพิมพ์ชื่อ city ไม่ถูก ให้เอา error ขึ้นมาโชว์​และซ่อนกล่อง weather
        document.querySelector(".error").style.display = "block"
        document.querySelector(".weather").style.display = "none"
    } else { // ถ้าพิมพ์ชื่อ city ถูก ให้ทำด้านล่างนี้ทั้งหมด
        //  // ถ้าพิมพ์ชื่อ city ถูก ก็แสดงกล่อง weather ขึ้นมา และซ่อนกล่อง error
        document.querySelector(".weather").style.display = "block"
        document.querySelector(".error").style.display = "none"

        document.querySelector(".city").innerHTML = data.name
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + '°C'
        document.querySelector(".humidity").innerHTML = data.main.humidity + '%'
        document.querySelector(".wind").innerHTML = data.wind.speed + 'km/h'
    
        // ถ้าอากาศเปลี่ยน เราก็อยากให้ icon เปลี่ยนด้วย
        if(data.weather[0].main === "Clear") {
            weatherIcon.src = "./image/clear.svg"
        } else if(data.weather[0].main === "Clouds") {
            weatherIcon.src = "./image/clouds.svg"
        } else if(data.weather[0].main === "Rain") {
            weatherIcon.src = "./image/rain.svg"
        } else if(data.weather[0].main === "Drizzle") {
            weatherIcon.src = "./image/drizzle.svg"
        } else if(data.weather[0].main === "Mist") {
            weatherIcon.src = "./image/mist.svg"
        } else if(data.weather[0].main === "Snow") {
            weatherIcon.src = "./image/snow.svg"
        } else {
            weatherIcon.src = "./image/clear.svg"
        }
    }
}

// ถ้าคลิกปุ่ม ให้เอา value ใน input ใส่เป็น city
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value)
})
