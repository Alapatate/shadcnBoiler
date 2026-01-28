export const userServices = {
    getSomeUsers: async (nbUsers) => {
        const res = await fetch(`https://randomuser.me/api/?results=${nbUsers}`)
        if (!res.ok) {
            throw new Error("Failed to fetch users")
        }
        const data = await res.json()
        return data
    }
}