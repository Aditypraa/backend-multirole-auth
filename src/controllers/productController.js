import Products from "../models/productModel.js";
import Users from "../models/userModel.js";
import { Op } from "sequelize";

export const getAllProducts = async (req, res) => {
  try {
    let response; // mendeclare variabel response
    if (req.role === "admin") {
      // jika role adalah admin
      response = await Products.findAll({
        // maka akan menampilkan semua data product
        attributes: ["uuid", "name", "price"], // yang akan ditampilkan adalah uuid, name, dan price
        include: [{ model: Users, attributes: ["name", "email"] }], // dan akan menampilkan data user yang memiliki atribut name dan email
      });
    } else {
      // jika role bukan admin
      response = await Products.findAll({
        // maka akan menampilkan data product yang memiliki userId yang sama dengan userId yang login
        where: { userId: req.user }, // userId yang login
        attributes: ["uuid", "name", "price"], // yang akan ditampilkan adalah uuid, name, dan price
        include: [{ model: Users, attributes: ["name", "email"] }], // dan akan menampilkan data user yang memiliki atribut name dan email
      });
    }
    res.status(200).json({ message: "getAll Product Succes", data: response }); // menampilkan pesan dan data response
  } catch (error) {
    // jika terjadi error
    res.status(500).json({ message: error.message }); // maka akan menampilkan pesan error
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Products.findOne({
      // mencari data product berdasarkan uuid
      where: { uuid: req.params.id }, // uuid yang diambil dari params id
    });

    if (!product) return res.status(404).json({ message: "Product not found" }); // jika product tidak ditemukan maka akan menampilkan pesan error

    let response; // mendeclare variabel response
    if (req.role === "admin") {
      // jika role adalah admin
      response = await Products.findOne({
        // maka akan menampilkan data product
        where: { id: product.id }, // berdasarkan id product
        attributes: ["uuid", "name", "price"], // yang akan ditampilkan adalah uuid, name, dan price
        include: [{ model: Users, attributes: ["name", "email"] }], // dan akan menampilkan data user yang memiliki atribut name dan email
      });
    } else {
      // jika role bukan admin
      response = await Products.findOne({
        // maka akan menampilkan data product
        where: { [Op.and]: [{ id: product.id }, { userId: req.user }] }, // berdasarkan id product dan userId yang login
        attributes: ["uuid", "name", "price"], // yang akan ditampilkan adalah uuid, name, dan price
        include: [{ model: Users, attributes: ["name", "email"] }], // dan akan menampilkan data user yang memiliki atribut name dan email
      });
    }
    res.status(200).json({ message: "get Product Succes", data: response }); // menampilkan pesan dan data response
  } catch (error) {
    // jika terjadi error
    res.status(500).json({ message: error.message }); // maka akan menampilkan pesan error
  }
};

export const createProduct = async (req, res) => {
  const { name, price } = req.body; // mendapatkan data name dan price dari body
  try {
    let products = await Products.create({
      // membuat data product
      name, // name
      price, // price
      userId: req.user, // userId yang login
    });
    res.status(201).json({ message: "Product Created", data: products }); // menampilkan pesan dan data products
  } catch (error) {
    res.status(500).json({ message: error.message }); // menampilkan pesan error
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Products.findOne({
      // mencari data product berdasarkan uuid
      where: { uuid: req.params.id }, // uuid yang diambil dari params id
    });

    if (!product) return res.status(404).json({ message: "Product not found" }); // jika product tidak ditemukan maka akan menampilkan pesan error

    const { name, price } = req.body; // mendapatkan data name dan price dari body
    if (req.role === "admin") {
      // jika role adalah admin
      await Products.update({ name, price }, { where: { id: product.id } }); // maka akan mengupdate data product berdasarkan id product
    } else {
      if (req.userId !== product.userId) {
        // jika userId yang login tidak sama dengan userId yang memiliki product
        return res.status(403).json({ message: "Akses Terlarang" }); // maka akan menampilkan pesan error
      }
      await Products.update(
        // jika userId yang login sama dengan userId yang memiliki product
        { name, price }, // maka akan mengupdate data product berdasarkan id product dan userId yang login
        { where: { [Op.and]: [{ id: product.id }, { userId: req.userId }] } } // berdasarkan id product dan userId yang login
      );
    }

    const updateProduct = await Products.findOne({
      // mencari data product berdasarkan id product
      where: { id: product.id },
    });

    res
      .status(200) // menampilkan pesan dan data updateProduct
      .json({ message: "get Product Succes", data: updateProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Products.findOne({
      where: { uuid: req.params.id },
    });

    if (!product) return res.status(404).json({ message: "Product not found" });

    if (req.role === "admin") {
      await Products.destroy({ where: { id: product.id } });
    } else {
      if (req.userId !== product.userId) {
        return res.status(403).json({ message: "Akses Terlarang" });
      }
      await Products.destroy({
        where: { [Op.and]: [{ id: product.id }, { userId: req.userId }] },
      });
    }

    res.status(200).json({ message: "Product Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
