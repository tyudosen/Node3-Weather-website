const cout = console.log




const weatherForm = document.querySelector('form')
const searhElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = searhElement.value
    messageOne.textContent = 'Loading...'
    fetch('http://localhost:3000/weather?search=' + location)
    .then((res)=>{
    res.json().then((data)=>{
        if(data.error){
            return messageOne.textContent = error
        }
        messageOne.textContent = data.loc
        messageTwo.textContent = 'Tempreture: ' + data.temp
        messageThree.textContent = 'Feelslike: ' + data.feelslike

    })
})

})