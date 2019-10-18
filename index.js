async function Animal() {
  let input = document.querySelector('#inAnimal').value
  let display = document.querySelector('#aniResult')
  let result = await axios.get(`http://localhost:8080/animal?search=${input}`)
  display.innerText = JSON.stringify(result.data)
}

async function Random() {
  let floor = document.querySelector("#floor").value
  let ceil = document.querySelector("#ceil").value
  let display = document.querySelector("#numResult")
  let result = await axios.get(`http://localhost:8080/random?floor=${floor}&ceil=${ceil}`)
  display.innerText = JSON.stringify(result.data)

}

async function Queue(action) {
  let input = document.querySelector("#queue").value
  let display = document.querySelector('#queueResult')
  let result
  if (action === "enqueue") {
    result = await axios.get(`http://localhost:8080/queue/${action}?name=${input}`)
  }
  else {
    result = await axios.get(`http://localhost:8080/queue/${action}`)
  }
  display.innerText = JSON.stringify(result.data)

}
