import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getProducts = async (req, res) => {
  const { name, categoryId, priceMin, priceMax } = req.query;
  try {
    const response = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        name: name
          ? {
              contains: name,
              mode: "insensitive",
            }
          : {},
        category: categoryId
          ? {
              id: categoryId,
            }
          : {},
        sale: priceMin
          ? {
              gte: Number(priceMin),
              lte: Number(priceMax),
            }
          : {},
      },
      include: {
        category: true,
      },
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const response = await prisma.product.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        category: true,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

export const createProduct = async (req, res) => {
  const { name, purchase, cleaning, categoryId } = req.body;
  const sale = await getSalePrice(cleaning, Number(purchase));
  try {
    const product = await prisma.product.create({
      data: {
        name,
        purchase: Number(purchase),
        sale,
        cleaning,
        category: {
          connect: {
            id: categoryId,
          },
        },
      },
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const { name, purchase, cleaning, categoryId } = req.body;
  const sale = await getSalePrice(cleaning, Number(purchase));
  try {
    const product = await prisma.product.update({
      where: {
        id: req.params.id,
      },
      data: {
        name,
        purchase: Number(purchase),
        sale,
        cleaning,
        category: {
          connect: {
            id: categoryId,
          },
        },
      },
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await prisma.product.delete({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const getSalePrice = async (requireCleaning, purchase) => {
  const settings = await prisma.setting.findFirst();
  const price =
    purchase +
    purchase * settings.margin +
    (requireCleaning ? settings.cleaning : 0);
  return price;
};
