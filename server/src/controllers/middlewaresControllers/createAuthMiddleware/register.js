const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const register = async (req, res) => {
  try {
    const Admin = mongoose.model('Admin');
    const AdminPassword = mongoose.model('AdminPassword');
    let { email, password, name, surname } = req.body;

    // 1. Validation
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const existingUser = await Admin.findOne({ email: email, removed: false });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists.' });
    }

    // 2. Create the User Document
    const newUser = new Admin({
      email,
      name,
      surname,
      role: 'admin', // You can change this to 'employee' if you want restricted access
    });
    const savedUser = await newUser.save();

    // 3. Hash and Save the Password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const userPassword = new AdminPassword({
      user: savedUser._id,
      password: passwordHash,
    });
    await userPassword.save();

    return res.status(200).json({
      success: true,
      message: 'Account successfully registered! You can now log in.',
    });
  } catch (err) {
    res.status(500).json({ success: false, result: null, message: err.message });
  }
};

module.exports = register;