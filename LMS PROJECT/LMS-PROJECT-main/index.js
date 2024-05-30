const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3003;

// Connect to MongoDB
mongoose.connect('mongodb+srv://lokeshpothureddypalli:2WVHm6wltlAsJ8wQ@cluster0.q4idtwq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());


app.use(express.static('C:/Users/Lokesh/OneDrive/Desktop/web totorial-/public'));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const dbconn = mongoose.connection.useDb('lmsproject');
const LoginDetails = dbconn.collection('loginDetails');

// Define a schema
// const Schema = mongoose.Schema;
// const MessageSchema = new Schema({
//   message: String,
// });

// // Define a model
// const Message = mongoose.model('Message', MessageSchema);

// Define routes
app.get('/', async (req, res) => {
  try {
    // Retrieve messages from MongoDB
    res.sendFile("C:/Users/Lokesh/OneDrive/Desktop/web totorial-/htm1.html");
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/login', async(req, res) => {
  try{
    res.sendFile("C:/Users/Lokesh/OneDrive/Desktop/web totorial-/login.html")
  }
  catch(err) {
    res.status(500).send*(err);
  }
})

app.get('/start', async(req, res) => {
  try{
    res.sendFile("C:/Users/Lokesh/OneDrive/Desktop/web totorial-/hm3m2.html")
  }
  catch(err){
    res.status(500).send(err);
  }
})

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    try {
      const user = await LoginDetails.findOne({ username, password });
      console.log(username);
      console.log(password);
      console.log(user);
      if (user) {
        res.status(200).json({ message: 'Login successful', user });
      } else {
        res.status(401).json({ error: 'Invalid username or password' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Something went wrong' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});




// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
