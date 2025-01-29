"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function createOnRampTranction(amount: number, provider: string){
    const session = await getServerSession(authOptions)
    const token = Math.random().toString()
    const userId = session?.user?.id;
    if(!userId){
        return {
            message: "not logged in"
        }
    }
    await prisma.onRampTransaction.create({
        data: {
                userId: Number(userId ),
                token: token,
                startTime: new Date,
                amount,
                provider,
                status: "Processing"
        }
    })
    return{
        message: "on ramp transaction added"
    }
}