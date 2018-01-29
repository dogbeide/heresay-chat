const path = require('path');

const express = require('express');

const PUBLIC_PATH = path.join(__dirname, '../public');
const port = process.env.PORT || 8000;
const app = express();


app.use(express.static(PUBLIC_PATH)); // where to find public files







// Listen endlessly
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
