const express = require('express')
const cors = require('cors')
const app = express()



app.use(cors())

const port = 8080

let queue = ['mark', 'jerry', 'lisa']

let obj = {
  status: "success",
  message: true
}




function isAnimal(req, res, next) {
  const animals = ['tiger', 'zebra', 'rabbit', 'dog', 'cat']
  if (animals.includes(req.query.search)) {
    obj.status = "success"
    obj.message = true
  } else {
    obj.status = "failure"
    obj.message = false
  }
  next()
}

function validateNum(req, res, next) {
  let floor = parseInt(req.query.floor)
  let ceil = parseInt(req.query.ceil)


  if (isNaN(floor) || isNaN(ceil)) {
    res.json({
      status: "err: not a number"
    })
  }
  else if (floor > ceil) {
    res.json({
      status: "err: floor is greater than ceiling"
    })
  }


  next()

}
function generateSpread(req, res) {
  let floor = parseInt(req.query.floor)
  let ceil = parseInt(req.query.ceil)
  let numbers = []
  for (let i = floor; i <= ceil; i++) {
    numbers.push(i)
  }
  let randomIndex = Math.floor(Math.random() * numbers.length)
  let obj1 = {
    status: "success",
    range: [floor, ceil],
    randPick: numbers[randomIndex]
  }
  res.json(obj1)
}

let name

function handleQueue(req, res, next) {
  switch (req.params.action) {
    case "peek":
      if (!queue.length) {
        res.json({ status: "err: queue is empty" })
      }
      else {
        res.json({
          status: "success",
          data: queue[queue.length - 1]
        })
      }
      break;
    case "enqueue": queue.unshift(req.query.name)
      break;
    case "dequeue":
      if (!queue.length) {
        res.json({ status: "err: queue is empty" })
      }
      else {
        name = queue[queue.length - 1]; queue.pop()
      }
      break;
    default: res.json("url is not valid")
  }
  console.log(queue)
  next()
}


app.get('/animal', isAnimal, (req, res) => {
  res.send(obj)
})

app.get('/random', validateNum, generateSpread)

app.get('/queue/:action', handleQueue, (req, res) => {
  switch (req.params.action) {
    case "enqueue": res.json({
      status: "success",
      enqueued: req.query.name
    })
      break;
    case "dequeue": res.json({
      status: "success",
      dequeued: name
    })
      break;
  }
})


app.listen(port, () => {

})