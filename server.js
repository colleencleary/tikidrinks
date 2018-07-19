const express = require('express')
const mongoose = require('mongoose')
const app = express()

const mongoUri =  process.env.MONGODB_URI || 'mongodb://localhost:27017/tipsytiki';
 mongoose.connect(mongoUri, { useNewUrlParser: true });

const port = process.env.PORT || 3000;

app.get('/', (req, res)=> {
  res.send('works')
})

app.listen(port, ()=>{
  console.log('listening');
});
