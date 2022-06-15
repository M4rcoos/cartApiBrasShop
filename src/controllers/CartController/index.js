const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

const CartController = {
  async createCart(req, res) {
    const bodyData = req.body;
    const { user_id } = req.params;

    try {
      const createdCart = await Cart.create({ ...bodyData, username: user_id });
      await createdCart.populate("products").execPopulate();

      return res.status(200).json(createdCart);
    } catch (err) {
      return res.status(400).json(err);
    }
  },

  async getUserCarts(req, res) {
    const { user_id } = req.params;

    try {
      const userCarts = await Cart.find({ username: user_id }).populate(
        "products"
      );
      return res.status(200).json(userCarts);
    } catch (err) {
      return res.status(400).json(err);
    }
  },

  async getCart(req, res) {
    const { cart_id } = req.params;
    console.log(cart_id);
    try {
      //   const cart = await Cart.findById(cart_id).populate("products");
      const cart = await Cart.find({ _id: cart_id });
      return res.status(200).json(cart);
    } catch (err) {
      return res.status(400).json(err);
    }
  },

  async addProductToCart(req, res) {
    const { product_id, cart_id } = req.params;

    try {
      const product = await Product.find({ _id: product_id });
      console.log(product);
      const data = { product_id: product._id, quantity: 1 };

      const cart = await Cart.find({ _id: cart_id });

      allProduct = cart[0].products;
      allProduct.push(data);
      console.log(allProduct);
      const updateCart = {
        products: allProduct,
      };

      const produtoExisteCarrinho = cart[0].products.map((product) =>
        product._id === product_id ? true : false
      );
      console.log("aaaaaaaaaaaaaaaaaaaaa", produtoExisteCarrinho);
      const cartUser = await Cart.updateOne({ _id: cart_id }, updateCart);

      return res.json(cartUser);
    } catch (err) {
      return res.status(400).json(err);
    }
  },
};

module.exports = CartController;
