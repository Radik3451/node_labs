const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  // Установка заголовка Content-Type
  res.setHeader('Content-Type', 'text/html');

  if (req.url === '/page1') {
    // Метод response.write
    res.write('<h1>Page 1 - Using response.write</h1>');

    res.end();
  } else if (req.url === '/page2') {
    // Метод fs.createReadStream()
    const stream = fs.createReadStream('./page2.html');
    stream.pipe(res);
  } else if (req.url === '/page3') {
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
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
