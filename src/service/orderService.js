import headerToken from "@/lib/headerToken";

export const createOrder = async (cartItems) => {
    const header = await headerToken();

    const mappedOrderData = {
        orderDetailRequests: cartItems.map(item => ({
            productId: item.productId,
            orderQty: item.quantity
        }))
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/orders`, {
        method: 'POST',
        headers: header,
        body: JSON.stringify(mappedOrderData)
    });

    if (!res.ok) {
        throw new Error(`Failed to create order: ${res.status}`);
    }

    return await res.json();
};

export const getAllOrders = async () => {
    const header = await headerToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/orders`, {
        headers: header,
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch orders: ${res.status}`);
    }

    const data = await res.json();
    return data.payload;
};