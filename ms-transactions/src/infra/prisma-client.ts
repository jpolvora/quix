import { PrismaClient } from '@prisma/client'

const prisma: PrismaClient = new PrismaClient() //singleton

export { prisma }
