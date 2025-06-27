import { db } from "@/db";
import { agents } from "@/db/schema";
import { baseProcedure, createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { resolve } from "path";
import { agentInsertSchema } from "../schemas";
import { z } from "zod";
import { eq } from "drizzle-orm";

export const agentsRouter = createTRPCRouter({
    getMany: protectedProcedure.query(async() => {
        const data = await db
        .select()
        .from(agents)

        // await new Promise((resolve) => setTimeout(resolve, 3000))             // for loading
        // throw new TRPCError({ code: 'BAD_GATEWAY' })                     // for error 
        return data 
    }),
    getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ( { input } ) => {
        const data = await db
        .select()
        .from(agents)
        .where(eq(agents.id, input.id))
        // await new Promise((resolve) => setTimeout(resolve, 3000))             // for loading
        // throw new TRPCError({ code: 'BAD_GATEWAY' })                     // for error 
        return data[0] 
    }),
    
    create: protectedProcedure
    .input(agentInsertSchema)
    .mutation(async ({ input, ctx }) => {
        const [createdAgent] = await db
        .insert(agents)
        .values({
            ...input,
            userId: ctx.auth.user.id 
        })
        .returning()

        return createdAgent;
    })
})