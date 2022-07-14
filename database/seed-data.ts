
interface SeedData {
    entries: SeedEntry[]
}

interface SeedEntry {
    description: string;
    status: string;
    createdAt: number
}

export const seedData: SeedData = {
    entries: [
        {
            description:'pendiente:  asdasadasdasdasddasdad',
            status:'pending',
            createdAt: Date.now()
        },
        {
            description:'in progress qweqweqweqweqweqw',
            status:'in-progress',
            createdAt: Date.now() - 1000000
        },
        {
            description:'terminados nbfbdbfdgfdfgdfgdf',
            status:'finished',
            createdAt: Date.now() - 10000
        }
    ]
}