"use server"
import { ProjectSchema } from "@/lib/ZodSchema";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";

export async function createProjectAction(prevState:unknown,formData: FormData){
    const submission =parseWithZod(formData,{schema:ProjectSchema}) 
    if (submission.status!=="success"){
        return submission.reply()
    }
    return redirect("/projects")
}