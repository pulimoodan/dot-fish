import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getOrders = async (req, res) => {
    try {
        const response = await prisma.order.findMany({ include: { customer: true, items: { include: { product: true } } } });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const response = await prisma.order.findUnique({
            where: {
                id: req.params.id,
            },
            include: {
                customer: true,
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
};

export const createOrder = async (req, res) => {
    const { customerId, items, slot, payment } = req.body;

    let orderItems = [];
    for (const item of items) {
        const orderItem = await prisma.orderItem.upsert({
            create: {
                product: {
                    connect: {
                        id: item.productId,
                    },
                },
                quantity: item.quantity,
            },
            update: {},
            where: {
                productId_quantity: {
                    productId: item.productId,
                    quantity: item.quantity,
                },
            },
            include: {
                product: true,
            },
        });
        orderItems.push(orderItem);
    }

    const total = orderItems.reduce(function (a, b) {
        return a + b.product.sale * b.quantity;
    }, 0);

    try {
        const order = await prisma.order.create({
            data: {
                customer: {
                    connect: {
                        id: customerId,
                    },
                },
                slot: Number(slot),
                payment,
                items: {
                    connect: orderItems.map(i => {
                        return { id: i.id };
                    }),
                },
                total: total,
            },
        });
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const confirmOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await prisma.order.update({ where: { id }, data: { status: 'confirmed' } });
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const updateOrder = async (req, res) => {
    const { customerId, items, slot, payment } = req.body;

    const orderItems = [];
    for (const item of items) {
        const orderItem = await prisma.orderItem.upsert({
            create: {
                product: {
                    connect: {
                        id: item.productId,
                    },
                },
                quantity: item.quantity,
            },
            update: {},
            where: {
                productId_quantity: {
                    productId: item.productId,
                    quantity: item.quantity,
                },
            },
            include: {
                product: true,
            },
        });
        orderItems.push(orderItem);
    }

    const total = orderItems.reduce(function (a, b) {
        return a + b.product.sale * b.quantity;
    }, 0);

    try {
        const order = await prisma.order.update({
            where: {
                id: req.params.id,
            },
            data: {
                customer: {
                    connect: {
                        id: customerId,
                    },
                },
                items: {
                    connectOrCreate: {
                        where: {
                            productId_quantity: items,
                        },
                    },
                },
                slot,
                payment,
                total,
            },
        });
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const order = await prisma.order.delete({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
