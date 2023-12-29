import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getCustomers = async (req, res) => {
    try {
        const response = await prisma.customer.findMany();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const getCustomerByMobile = async (req, res) => {
    const { mobile } = req.params;
    try {
        const response = await prisma.customer.findUnique({ where: { mobile } });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const getCustomerById = async (req, res) => {
    try {
        const response = await prisma.customer.findUnique({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
};

export const createCustomer = async (req, res) => {
    const { name, mobile, address, location } = req.body;
    try {
        const customer = await prisma.customer.create({
            data: {
                name,
                mobile,
                address,
                location,
            },
        });
        res.status(201).json(customer);
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: error.message });
    }
};

export const updateCustomer = async (req, res) => {
    const { name, mobile, address, location } = req.body;
    try {
        const customer = await prisma.customer.update({
            where: {
                id: req.params.id,
            },
            data: {
                name,
                mobile,
                address,
                location,
            },
        });
        res.status(200).json(customer);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const updateCustomerOrCreate = async (req, res) => {
    const { mobile } = req.params;
    const { name, address, location } = req.body;
    try {
        const customer = await prisma.customer.upsert({
            where: {
                mobile,
            },
            create: {
                name,
                address,
                location,
                mobile,
            },
            update: {
                name,
                address,
                location,
            },
        });
        res.status(200).json(customer);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const deleteCustomer = async (req, res) => {
    try {
        const customer = await prisma.customer.delete({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(customer);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
