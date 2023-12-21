const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public')); // Assuming your HTML and JS files are in a 'public' directory

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
