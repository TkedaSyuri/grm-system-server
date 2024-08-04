import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

// PrismaClient のシングルトンインスタンスを生成する関数
const prismaClientSingleton = () => {
  return new PrismaClient();
}

// グローバル変数の型を宣言
declare global {
  var prismaGlobal: PrismaClient | undefined;
}

// PrismaClient インスタンスを取得
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

// グローバル変数にインスタンスを設定（開発環境でのみ）
if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = prisma;
}

export default prisma;
