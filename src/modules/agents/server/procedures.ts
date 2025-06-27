import { db } from "@/db";
import { agents } from "@/db/schema";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { resolve } from "path";

export const agentsRouter = createTRPCRouter({
    getMany: baseProcedure.query(async() => {
        const data = await db
        .select()
        .from(agents)

        // await new Promise((resolve) => setTimeout(resolve, 3000))             // for loading
        // throw new TRPCError({ code: 'BAD_GATEWAY' })                     // for error 
        return data 
    })
})