import { z } from "zod";
export const TodoSchema = z.object({
    title: z
        .string()
        .min(3, { message: "Title must be at least 3 characters long" })
        .max(100, { message: "Title must be at most 100 characters long" }),
    description: z
        .string()
        .max(500, { message: "Description must be at most 500 characters long" })
        .optional(),
    done: z.boolean().optional(),
});
//# sourceMappingURL=todo.js.map