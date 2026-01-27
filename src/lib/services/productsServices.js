export const productsServices = {
    getAllProducts: async () => {
        const res = await fetch("https://dummyjson.com/products?limit=0");
        if (!res.ok) {
            throw new Error("Failed to fetch products");
        }
        const data = await res.json()
        return data;
    }
}