import z from "zod";

export interface IProfileModalStoreState {
    profileModal: {
        isOpen: boolean
    };
}


export const profileFormSchema = z.object({
    username: z.string(),
    bio: z.string()
}).required({
    username: true
})


export type TProfileFormData = z.infer<typeof profileFormSchema>