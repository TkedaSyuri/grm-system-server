import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv';
dotenv.config();

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.DATABASE_URL !== 'production') globalThis.prismaGlobal = prisma