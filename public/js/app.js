const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
// messageOne.textContent ='from java script'


weatherForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  const location = search.value;

  messageOne.textContent ='Loading...'
  messageTwo.textContent =''

  fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
      if (data.error) {
        messageOne.textContent = data.error
      } else {
        messageOne.textContent = data.forecastData+' in '+ data.address
        messageTwo.textContent = 'The current temperature here is: '+data.currentTeperature
        +'F with maximum and minimum temperature : '
        +data.maximumTeperature+'F '+data.minimumTeperature+'F respectively.'

      }
    })
  })

})
