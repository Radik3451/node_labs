const express = require('express')
const bodyParser = require('body-parser')

const app = express()

function maxConsecutiveNumbersCount(n) {
  let count = 1;
  for (let i = 1; i <= n / 2; i++) {
    let sum = i;
    let j = i + 1;

    while (sum < n) {
      sum += j;
      j++;
    }

    if (sum === n) {
      const currentCount = j - i;
      count = Math.max(count, currentCount);
    }
  }

  return count;
}


// Пример использования
const inputNumber = 25;
const result = maxConsecutiveNumbersCount(inputNumber);
console.log(`Максимальное количество чисел для разложения числа ${inputNumber}: ${result}`);


// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = bodyParser.urlencoded({
  extended: false,
})

app.get('/register', urlencodedParser, function (
  request,
  response
) {
  response.sendFile(__dirname + '/register.html')
})
app.post('/register', urlencodedParser, function (
  request,
  response
) {
  if (!request.body) return response.sendStatus(400)
  console.log(request.body)
  console.log(maxConsecutiveNumbersCount(parseInt(request.body.number)))
  response.send(
    `${maxConsecutiveNumbersCount(parseInt(request.body.number))}`
  )
})

app.get('/', function (request, response) {
  response.send('Главная страница')
})

app.listen(3000)
