import z from "zod";

export interface ILoginFormInput {
    phoneNumber: string;
    password: string;
    rememberMe: boolean
} 

export const loginSchema = z.object({
    phoneNumber: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must be less than 15 digits'),
    
    password: z.string()
    .min(8, 'Password must be at least 8 characters'),
    rememberMe: z.boolean()
}).required({
    password: true,
    phoneNumber: true,
    rememberMe: true
})


export type TLoginFormData = z.infer<typeof loginSchema>