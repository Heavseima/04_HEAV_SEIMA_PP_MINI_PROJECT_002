"use server"

import { createOrder } from "@/service/orderService";

export const createOrderAction = async (cartItems) => {
    await createOrder(cartItems);
}