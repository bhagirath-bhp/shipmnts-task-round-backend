const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const cors = require('cors')

require('dotenv').config();


const app = express();

app.use(cors({
    origin: "*",
    allowedHeaders: ["*"]
}))
app.use(bodyParser.json());

connectDB();

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/files', uploadRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
