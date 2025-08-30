"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner";


import { Button } from "@/components/ui/button"
import {
    Form,
  
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { is } from "zod/locales"
type FormType = 'sign-in' | 'sign-up';


const authFormSchema=(type:FormType) => {   
    return z.object({
        name: type==='sign-up'?z.string().min(3):z.string().optional(),
        email: z.email(),
        password: z.string().min(6),
    })
}
    

const AuthForm = ({type}:{type:FormType}) => {
    // 1. Define your form.
    const formSchema=authFormSchema(type);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
    try {
        if (type === 'sign-up') {
            console.log("sign up", values);
        } else {
            console.log("sign in", values);
        }
    } catch (error) {
        console.log(error);
        toast.error(`There was an error: ${error}`);
    }
}
    const isSignIN  =type === "sign-in"
    return (
        <div className="card-border lg:min-w-[560px]">
            <div className="flex flex-col gap-6 card py-14 px-10">
                <div className="flex flex-row gap-2 justify-center">
                    <Image src="/logo.svg" alt="logo" height={32} width={38} />
                    <h2 className="text-primary-100">Prepwise</h2>
                </div>
                <h3>Practice job interview with AI</h3>


                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
                       {!isSignIN && <p>Name</p>}
                       <p>Email</p>
                       <p>Password</p>
                        <Button className="btn" type="submit">{isSignIN?"SIGN IN":"CREATE AN ACCOUNT"}</Button>
                    </form>
                </Form>
                <p className="text-center">
                    {isSignIN?'No account yet? ':'Already have an account? '}
                    <Link href={isSignIN ? "/sign-up":"/sign-in"} className="font-bold text-user-primary ml-1">
                    {!isSignIN?"sign in":"Sign up"}</Link>
                </p>
            </div>
        </div>
    )
}


export default AuthForm