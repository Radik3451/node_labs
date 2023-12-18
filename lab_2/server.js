const http = require('http');
const url = require('url');
const querystring = require('querystring');
const fs = require('fs');

function calculateFactorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    } else {
        return n * calculateFactorial(n - 1);
    }
}

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        const parsedUrl = url.parse(req.url, true);

        if (parsedUrl.pathname === '/') {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

            // Отправляем форму для ввода данных
            res.write('<html><head><title>Факториал</title></head><body>');
            res.write('<h2>Вычисление факториала</h2>');
            res.write('<form action="/" method="post">');
            res.write('Основание факториала: <input type="text" name="base" />');
            res.write('<input type="submit" value="Вычислить" />');
            res.write('</form>');
            res.write('</body></html>');

            res.end();
        } else if (parsedUrl.pathname === '/page2') {
          // Метод fs.createReadStream()
          const stream = fs.createReadStream('./page2.html');
          stream.pipe(res);
        } else if (parsedUrl.pathname === '/page3') {
          // Метод fs.readFile() и response.end()
          fs.readFile('./page3.html', 'utf8', (err, data) => {
            if (err) {
              console.error(err);
              res.writeHead(500, { 'Content-Type': 'text/plain' });
              res.end('Internal Server Error');
              return;
            }
      
            res.end(data);
          });
        } else {
          // Страница по умолчанию
          res.write('<h1>Welcome to the default page</h1>');
          res.end();
        }
    } else if (req.method === 'POST') {
        let data = '';

        req.on('data', chunk => {
            data += chunk;
        });

        req.on('end', () => {
            const formData = querystring.parse(data);
            const base = parseInt(formData.base) || 0;
            const result = calculateFactorial(base);

            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.write('<html><head><title>Факториал</title></head><body>');
            res.write('<h2>Вычисление факториала</h2>');
            res.write(`<p>Основание факториала: ${base}</p>`);
            res.write(`<p>Результат вычислений: ${result}</p>`);
            res.write('</body></html>');
            res.end();
        });
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
