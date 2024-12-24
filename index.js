const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes =require('./router/productRoutes'); 
const userRoutes=require('./router/userRoutes')
const app = express();
const dotenv=require('dotenv')



app.use(express.json());
app.use(cors());
app.use('/public', express.static('public'));
dotenv.config()


mongoose.connect(`mongodb://${process.env.DB_URI}/${process.env.DB_NAME}`)
.then(() => {
    console.log('connected to data ecommres');
});

app.use(productRoutes);
app.use(userRoutes)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});



