"use server"

import { setRating } from "@/service/productService"

export const setRatingAction = async (productId, rating) => {
    await setRating(productId, rating);
};