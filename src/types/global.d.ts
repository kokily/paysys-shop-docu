import type { User, Item, Bill, Cart, Wedding } from '@prisma/client';
import type { ChangeEvent, Dispatch, SetStateAction } from 'react';
import NextAuth from 'next-auth/next';
import fs from 'fs';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      username: string;
      admin: boolean;
      token: string;
    };
  }
}

declare global {
  interface VariantType {
    [key: string]: string;
  }

  interface MenuType {
    id: number;
    divide: string;
  }

  // Auth Types
  interface SignOptions {
    expiresIn?: string | number;
  }

  interface AuthPayload {
    username: string;
    password: string;
  }

  // Menu Types
  interface ListMenuQueries {
    divide: string;
    native: string;
  }

  interface ReadMenuPayload {
    count: string;
    price: string;
  }

  // Cart Types
  interface ViewCartPayload {
    title: string;
    hall: string;
    etc: string;
    totalAmount: number;
  }

  interface AddCartPayload {
    itemId: string;
    userId: string;
    count: number;
    price: number;
  }

  interface AddItemModel {
    id: string;
    name: string;
    divide: string;
    native: string;
    unit: string;
    price: number;
    count: number;
    amount: number;
  }

  // Bills Types
  interface AddBillPayload {
    title: string;
    hall: string;
    etc: string;
  }

  interface ListBillsQueries {
    title?: string;
    hall?: string;
    userId?: string;
    cursor?: string;
  }

  interface ListBillsState {
    title: string;
    hall: string;
    userId: string;
  }

  // Reserve Types
  interface AddReservePayload {
    billId: string;
    reserve: number;
  }

  // Item Types
  interface AddItemPayload {
    name: string;
    divide: string;
    native: string;
    unit: string;
    price: number;
  }

  interface AddItemState {
    name: string;
    divide: string;
    native: string;
    unit: string;
    price: string;
  }

  interface ListItemsQueries {
    name?: string;
    cursor?: string;
  }

  interface ItemPayload {
    name: string;
  }

  // User Types
  interface ListUsersQueries {
    username?: string;
    cursor?: string;
  }

  interface SerializeUser {
    id: string;
    username: string;
    admin: boolean;
    createdAt: Date;
    updatedAt: Date;
  }

  interface PasswordPayload {
    password: string;
  }

  interface UsernamePayload {
    username: string;
  }

  // Identify Types
  type IdentifyType = 'admin' | 'employee';

  // Wedding Types
  interface ListWeddingsQueries {
    husbandName?: string;
    brideName?: string;
    cursor?: string;
  }

  interface ListWeddingsState {
    divide: 'husband' | 'bride';
    husbandName: string;
    brideName: string;
  }

  // Expense Types
  interface AddExpenseState {
    husbandName: string;
    brideName: string;
    weddingAt: string;
    eventAt: string;
    rentalHusband: string;
    swordHusband: string;
    gloveHusband: string;
    swordSetHusband: string;
    bouquetHusband: string;
    companyHusband: string;
    hostHusband: string;
    frameHusband: string;
    dressHusband: string;
    etcHusband: string;
    rentalBride: string;
    swordBride: string;
    gloveBride: string;
    swordSetBride: string;
    bouquetBride: string;
    companyBride: string;
    hostBride: string;
    frameBride: string;
    dressBride: string;
    etcBride: string;
    weddingHusbandCost: string;
    weddingBrideCost: string;
    mealsMethod: string;
    mealsPrice: string;
    mealsHusband: string;
    mealsBride: string;
    mealsHusbandCost: string;
    mealsBrideCost: string;
    reserveMethod: string;
    reservePrice: string;
    reserveHusbandCost: string;
    reserveBrideCost: string;
  }

  interface AddExpensePayload {
    husbandName: string;
    brideName: string;
    weddingAt: string;
    eventAt: string;
    rentalHusband: number;
    swordHusband: number;
    gloveHusband: number;
    swordSetHusband: number;
    bouquetHusband: number;
    companyHusband: number;
    hostHusband: number;
    frameHusband: number;
    dressHusband: number;
    etcHusband: number;
    rentalBride: number;
    swordBride: number;
    gloveBride: number;
    swordSetBride: number;
    bouquetBride: number;
    companyBride: number;
    hostBride: number;
    frameBride: number;
    dressBride: number;
    etcBride: number;
    weddingHusbandCost: number;
    weddingBrideCost: number;
    mealsMethod: string;
    mealsPrice: number;
    mealsHusband: number;
    mealsBride: number;
    mealsHusbandCost: number;
    mealsBrideCost: number;
    reserveMethod: string;
    reservePrice: number;
    reserveHusbandCost: number;
    reserveBrideCost: number;
  }

  type MealsMethodType = 'privacy' | 'husband' | 'bride' | 'half';
  type ReserveMethodType = 'half' | 'husband' | 'bride';

  interface ExpenseContents {
    husbandName: string;
    brideName: string;
    weddingAt: Date;
    eventAt: string;
    rentalHusband: string;
    swordHusband: string;
    gloveHusband: string;
    swordSetHusband: string;
    bouquetHusband: string;
    companyHusband: string;
    hostHusband: string;
    frameHusband: string;
    dressHusband: string;
    etcHusband: string;
    rentalBride: string;
    swordBride: string;
    gloveBride: string;
    swordSetBride: string;
    bouquetBride: string;
    companyBride: string;
    hostBride: string;
    frameBride: string;
    dressBride: string;
    etcBride: string;
    mealsMethod: string;
    mealsPrice: string;
    mealsHusband: string;
    mealsBride: string;
    reserveMethod: string;
    reservePrice: string;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    setStartDate: Dispatch<SetStateAction<Date>>;
  }

  interface ExpenseDataType {
    value: string;
    title: string;
  }

  interface UploadType {
    name: string;
    type: string;
  }

  interface S3FileType {
    file: Buffer;
    fileName: string;
    type: string;
  }

  interface S3ParamsType {
    Bucket: string;
    Body: Buffer;
    Key: string;
    ContentType: string;
  }

  interface S3ReturnType {
    target: string;
  }

  interface AddSignPayload {
    weddingId: string;
    sex: string;
    image: string;
  }
}
