import * as z from "zod";

export const TaskSearchSchema = z.object({
    projectId: z.string(),
    startFrom: z.string(),
    startTo: z.string(),
    keyword: z.string()
})

export type TaskSearch = z.infer<typeof TaskSearchSchema>
