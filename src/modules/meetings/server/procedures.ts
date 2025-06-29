import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE, MIN_PAGE_SIZE } from "@/constants";
import { db } from "@/db";
import { agents, meetings } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";;
import { and, desc, eq, getTableColumns, ilike, sql, count } from "drizzle-orm";
import { z } from "zod";

export const meetingsRouter = createTRPCRouter({
  getMany: protectedProcedure
    .input(
      z.object({
        page: z.number().default(DEFAULT_PAGE),
        pageSize: z
          .number()
          .min(MIN_PAGE_SIZE)
          .max(MAX_PAGE_SIZE)
          .default(DEFAULT_PAGE_SIZE),
        search: z.string().nullish(),
      }))
    .query(async ({ ctx, input }) => {
      const { search, page, pageSize } = input;
      const data = await db
        .select({
          ...getTableColumns(meetings),
        })
        .from(meetings)
        .where(
          and(
            eq(meetings.userId, ctx.auth.user.id),
            search ? ilike(meetings.name, `%${search}%`) : undefined
          )
        )
        .orderBy(desc(meetings.createdAt), desc(meetings.id))
        .limit(pageSize)
        .offset((page - 1) * pageSize);
      const [total] = await db
        .select({ count: count() })
        .from(meetings)
        .where(
          and(
            eq(agents.userId, ctx.auth.user.id),
            search ? ilike(agents.name, `%s{search}%`) : undefined
          )
        );

      const totalPages = Math.ceil(total.count / pageSize);

      // await new Promise((resolve) => setTimeout(resolve, 3000))             // for loading
      // throw new TRPCError({ code: 'BAD_GATEWAY' })                     // for error
      return {
        items: data,
        total: total.count,
        totalPages: totalPages,
      };
    }),
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const [existingMeeting] = await db
        .select({
          ...getTableColumns(meetings),

        })
        .from(meetings)
        .where(
          and(eq(meetings.id, input.id), eq(meetings.userId, ctx.auth.user.id))
        );
      // await new Promise((resolve) => setTimeout(resolve, 3000))             // for loading
      // throw new TRPCError({ code: 'BAD_GATEWAY' })                     // for error
      if (!existingMeeting){
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Meeting not found' })
      }
      return existingMeeting;
    }),
});
