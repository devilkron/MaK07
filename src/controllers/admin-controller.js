const cloudUpload = require("../utils/cloudUpload");
const prisma = require("../../config/prisma");
const { createProductSchema } = require("../../validator/admin-validator");
const { number } = require("joi");
exports.createProduct = async (req, res, next) => {
  try {
    // const {
    //   priceHigh,
    //   minPriceHigh,
    //   detail,
    //   width,
    //   height,
    //   depth,
    //   weight,
    //   brandId,
    //   categoryId,
    // } = req.body;

    const value = await createProductSchema.validateAsync(req.body);

    const { brandId, categoryId } = req.body;

    const product = await prisma.product.create({
      data: {
        // priceHigh: Number(priceHigh),
        // minPriceHigh: Number(minPriceHigh),
        // detail: detail,
        // width: width,
        // height: height,
        // depth: depth,
        // weight,
        ...value,

        brand: {
          connect: {
            id: Number(brandId),
          },
        },
        category: {
          connect: {
            id: Number(categoryId),
          },
        },
        user: {
          connect: {
            id: req.user.id,
          },
        },
      },
    });
    const imagePromiseArray = req.files.map((file) => {
      return cloudUpload(file.path);
    });
    const imgUrlArray = await Promise.all(imagePromiseArray);

    const productImges = imgUrlArray.map((imgUrl) => {
      return {
        url: imgUrl,
        productId: product.id,
      };
    });
    await prisma.product_Img.createMany({
      data: productImges,
    });
    const newProduct = await prisma.product.findMany({
      where: {
        id: product.id,
      },
      include: {
        product_Img: true,
      },
    });
    // const productImg = await prisma.product_Img.createMany({
    //     data: [{productId, url: imgUrl}],
    // })
    //    const url =  await cloudUpload(req.files[0].path);
    res.json({ newProduct });
  } catch (err) {
    next(err);
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const category = await prisma.category.create({
      data: {
        name: name,
      },
    });
    res.json({ message: "Create Category" });
  } catch (err) {
    next(err);
  }
};

exports.createBrand = async (req, res, next) => {
  try {
    res.json({ message: "Create Brand" });
  } catch (err) {
    next(err);
  }
};
exports.createPromotion = async (req, res, next) => {
  try {
    res.json({ message: "Create Promotion" });
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    res.json({ message: "Update Product" });
  } catch (err) {
    next(err);
  }
};
