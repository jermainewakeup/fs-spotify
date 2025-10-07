import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

neonConfig.webSocketConstructor = ws;
neonConfig.poolQueryViaFetch = true;

declare global {
    var prismaGlobal: PrismaClient | undefined
}

const prismaClient = new PrismaClient();

const prisma = global.prismaGlobal || prismaClient;

if (process.env.NODE_ENV === 'development') {
    global.prismaGlobal = prisma;
}

export default prisma;