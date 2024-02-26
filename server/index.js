const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


app.use(cors()) // initialize the cors as a middleware
app.use(express.json()) // use json as a default format for handling

const connectDatabase = async () => {
    try {
      const connection = await mongoose.connect('mongodb://0.0.0.0:27017/mern-auth');
      console.log("DB connected!!!");
      console.log("DB Name: ", connection.connection.name);
    } catch (err) {
      console.log("DB error: ", err);
    }
  };
connectDatabase();  
app.post('/api/register', async (req, res) => {
    try {
        const newPassword = await bcrypt.hash(req.body.password, 10)
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        res.json({ status: 'ok' });
        console.log('User registered:', user); // Log the user object for verification
    } catch (err) {
        console.error('Error registering user:', err.message);
        if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
            res.status(400).json({ status: 'error', message: 'Duplicate email' });
        } else {
            res.status(500).json({ status: 'error', message: 'Internal server error' });
        }
    }
});


app.post('/api/login', async (req,res)=>{
    const user = await User.findOne({
        email:req.body.email,
        password:req.body.password
    })

    if(user){

        const token = jwt.sign({
            name:user.name,
            email:req.body.email,
        },'secret123')
        return res.json({staus:'ok' , user:token})
    }else{
        return res.json({status:'error',user:false})
    }
    console.log(req.body) 
})

app.get('/api/dashboard', async (req, res) => {
	const token = req.headers['x-access-token']

	try {
		const decoded = jwt.verify(token, 'secret123')
		const email = decoded.email
		const user = await User.findOne({ email: email })

		return res.json({ status: 'ok', quote: user.quote })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
	}
})

app.post('/api/dashboard', async (req, res) => {
	const token = req.headers['x-access-token']

	try {
		const decoded = jwt.verify(token, 'secret123')
		const email = decoded.email
		await User.updateOne(
			{ email: email },
			{ $set: { quote: req.body.quote } }
		)

		return res.json({ status: 'ok' })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
	}
})
app.listen(1337,() => {
    console.log('Sever started at 1337')
})