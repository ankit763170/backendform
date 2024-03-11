const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const User = require('./models/user.js');

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb+srv://ankit123:ankit123@cluster0.cqtqflo.mongodb.net/your-database-name?retryWrites=true&w=majority')
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.get('/', async (req, res) => {
  try {
    const userdata = await User.find({});
    res.json({
      data: userdata
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching data",
      error: error.message
    });
  }
});

app.post('/', async (req, res) => {
  const { name, LastName, email, MobileNum, project } = req.body;
  try {
    const user = new User({ name, LastName, email, MobileNum, project });
    await user.save();
    res.json({
      message: "Data saved"
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating user",
      error: error.message
    });
  }
});

app.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, LastName, email, MobileNum, project } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, { name, LastName, email, MobileNum, project }, { new: true });
    res.json({
      message: "Data updated",
      data: updatedUser
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating user",
      error: error.message
    });
  }
});

app.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.json({
      message: "Data deleted"
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting user",
      error: error.message
    });
  }
});

app.listen(3000, () => {
  console.log("App is running at port no: 3000");
});
