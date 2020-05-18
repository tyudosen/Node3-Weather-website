const cout = console.log




const weatherForm = document.querySelector('form')
const searhElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')
const messageFive = document.querySelector('#message-5')
const messageSix = document.querySelector('#message-6')


weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = searhElement.value
    messageOne.textContent = 'Loading...'
    fetch('/weather?address=' + location)
    .then((res)=>{
    res.json().then((data)=>{
        if(data.error){
            return messageOne.textContent = error
        }
        messageOne.textContent = data.loc
        messageTwo.textContent = 'Tempreture: ' + data.temp
        messageThree.textContent = 'Feelslike: ' + data.feelslike
        messageFour.textContent = 'Visibility: ' + data.visibility
        if(data.wind_dir === null){cout('')}
        else{messageFive.textContent = 'Wind Direction: ' + data.wind_dir}
        
        messageSix.textContent = 'Wind Speed: ' + data.wind_speed


    })
})

})