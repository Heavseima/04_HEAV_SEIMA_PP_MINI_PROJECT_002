import headerToken from "@/lib/headerToken"

export const getTopSellingProducts = async () => {
    const header = await headerToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/top-selling`, {
        headers: header
    })
    if (!res.ok) {
        throw new Error(`Failed to fetch products: ${res.status}`);
    }
    const data = await res.json()
    return data.payload
}

export const getAllProducts = async () => {
    const header = await headerToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`, {
        headers: header
    })
    if (!res.ok) {
        throw new Error(`Failed to fetch products: ${res.status}`);
    }
    const data = await res.json()
    return data.payload
}

export const getAllCategories = async () => {
    const header = await headerToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/categories`, {
        headers: header
    })
    if (!res.ok) {
        throw new Error(`Failed to fetch categories: ${res.status}`);
    }
    const data = await res.json()
    return data.payload
}

export const getProductsByCategory = async (categoryId) => {
    const header = await headerToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/${categoryId}/products`, {
        headers: header
    })
    if (!res.ok) {
        throw new Error(`Failed to fetch products by category: ${res.status}`);
    }
    const data = await res.json()
    return data.payload
}

export const setRating = async (productId, rating) => {
    const header = await headerToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${productId}/rating?star=${rating}`, {
        method: 'PATCH',
        headers: header
    })
    if (!res.ok) {
        throw new Error(`Failed to fetch products by category: ${res.status}`);
    }
    const data = await res.json()
    return data.payload
}

export const getProductById = async (productId) => {
    const header = await headerToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${productId}`, {
        headers: header
    })
    if (!res.ok) {
        throw new Error(`Failed to fetch product by ID: ${res.status}`);
    }

    const data = await res.json()
    return data.payload
}