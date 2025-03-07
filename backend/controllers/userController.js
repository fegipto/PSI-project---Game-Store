const User = require("../models/User");
const Item = require("../models/Item");
const Cart = require('../models/Cart');
var path = require('path');

// Display list of all Users json
exports.users_list = async (req, res) => {

  const query = User.where('id', req.params.id);
  const user = await query.findOne();
  var result = [];
  if (user != null){
    for (let i = 0; i < user.lists.length; i++) {
      var obj ={id: user.lists[i].id, name: user.lists[i].name, values: []}
      for (let j = 0; j < user.lists[i].values.length; j++) {
        const query = Item.where('_id', user.lists[i].values[j]);
        const one = await query.findOne();
        obj.values.push(one);
      }
      result.push(obj);
    }
  }
  res.send(result);
};
  
// Display library of all Users json
exports.library_list = async (req, res) => {
  const query = User.where('id', req.params.id);
  const user = await query.findOne();
  var result = [];
  if (user != null){
    const library = user.library;
    for (let i = 0; i < user.library.length; i++) {
      const query = Item.findById(library[i]);
      const one = await query.findOne();
      result.push(one);
    }
  }
  res.send(result);
  };

// Display followers of all Users json
exports.followers_list = async (req, res) => {
  const query = User.where('id', req.params.id);
  const user = await query.findOne();
  var result = [];
  if (user != null){
    for (let i = 0; i < user.followers.length; i++) {
      const query = User.where('_id', user.followers[i]);
      const one = await query.findOne();
      result.push(one);
    }
  }
  res.send(result);
  };

// Display following of all Users json
exports.following_list = async (req, res) => {
  const query = User.where('id', req.params.id);
  const user = await query.findOne();
  var result = [];
  if (user != null){
    for (let i = 0; i < user.following.length; i++) {
      const query = User.where('_id', user.following[i]);
      const one = await query.findOne();
      result.push(one);
    }
  }
  res.send(result);
  };

// Display one User json
exports.find_User =  async (req, res) => {
    const query = User.where('id', req.params.id);
    const result = await query.findOne();
    res.send(result);
  };

exports.updateCart = async (req, res) => {
  try {
  // Find the user by ID
  const query = User.where('id', req.body.id);
  const result = await query.findOne();

    if (result) {
      await insertCart(req, result);
      res.status(200).json({ message: "Cart data was saved successfully!" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

exports.addItemsLibrary = async (id, items) => {
  const queryUser = User.where('id', id);
  const user = await queryUser.findOne();
  
  if (user) {
    user.library = user.library.push(...items);
    await user.save();
  }
}

exports.removeItemsWhislist = async (id, items) => {
  const queryUser = User.where('id', id);
  const user = await queryUser.findOne();

  if (user) {
    user.lists = user.lists.filter(item => !items.includes(item));
    await user.save();
  }
}

exports.clearCart = async (id) => {
  const queryUser = User.where('id', id);
  const user = await queryUser.findOne();

  if (user) {
    user.cart = null;
    await user.save();
  }
}

async function createCart(req, res) {
  await Promise.all([
    insertCart(req, res),
  ]);
}


async function insertCart(req, res) {
  const cartEntries = Object.entries(req.body.cart);
  const items = [];

  for (const [itemId, quantity] of cartEntries) {
    const query = Item.where('id', itemId);
    const item = await query.findOne();
    if (item) {
      items.push({
        itemId: item._id,
        quantity: parseInt(quantity)
      });
    }
  }

  const cart = new Cart({ items });
  const savedCart = await cart.save();

  const queryUser = User.where('id', req.body.id);
  const user = await queryUser.findOne();

  if (user) {
    user.cart = savedCart._id;
    await user.save();
  }
}

  
exports.cart = async (req, res) => {
  const query = User.where('id', req.params.id);
  const user = await query.findOne();  
  if (user != null && user.cart != null) {
    const cart = await Cart.findById(user.cart);
    const cartMap = new Map();
    if(cart){
    for (const item of cart.items) {
      cartMap.set(item.itemId.toString(), item.quantity);
    }
  }
    const cartArray = Array.from(cartMap.entries()).map(([item, quantity]) => {
      return { item: item, quantity: quantity };
    });
    res.json(cartArray);
  };
}

exports.editUser = async (req, res) => {
  const query = User.where('id', req.params.id);

  try {
    const updatedUser = await query.findOneAndUpdate({}, { $set: { name: req.body.name, imagens_profile: req.body.image} });
    if (updatedUser) {
      res.json("Updated");
    } else {
      res.json("User not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("An error occurred");
  }
};



  