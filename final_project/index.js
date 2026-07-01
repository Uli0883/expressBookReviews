const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const generalRoutes = require('./router/general');
const authRoutes = require('./router/auth_users');

app.use('/', generalRoutes);
app.use('/', authRoutes);

const port = 5005;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});