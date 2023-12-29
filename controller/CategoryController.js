import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getCategories = async (req, res) => {
    try {
        const response = await prisma.category.findMany();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const getCategoryById = async (req, res) => {
    try {
        const response = await prisma.category.findUnique({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
};

export const createCategory = async (req, res) => {
    const { name } = req.body;
    try {
        const category = await prisma.category.create({
            data: {
                name,
            },
        });
        res.status(201).json(category);
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: error.message });
    }
};

export const updateCategory = async (req, res) => {
    const { name } = req.body;
    try {
        const category = await prisma.category.update({
            where: {
                id: req.params.id,
            },
            data: {
                name,
            },
        });
        res.status(200).json(category);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const category = await prisma.category.delete({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(category);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
