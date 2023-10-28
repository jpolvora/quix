import { PrismaClient } from "@prisma/client"

const prisma: PrismaClient = new PrismaClient(); //singleton

export interface IPrismaClientWrapper {
    getClient(): PrismaClient
}

class PrismaClientWrapper implements IPrismaClientWrapper {

    getClient() {
        return prisma;
    }

}

export { prisma };