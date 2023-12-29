import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getStats = async (req, res) => {
    try {
        const products = await prisma.product.count();
        const customers = await prisma.customer.count();
        const orders = await prisma.order.count();
        res.status(200).json({ products, customers, orders });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const getSettings = async (req, res) => {
    try {
        const response = await prisma.setting.findFirst();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const updateSetting = async (req, res) => {
    const { margin, cleaning } = req.body;
    try {
        const setting = await prisma.setting.update({
            where: {
                id: req.params.id,
            },
            data: {
                margin: Number(margin),
                cleaning: Number(cleaning),
            },
        });
        res.status(200).json(setting);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
