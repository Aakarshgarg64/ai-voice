import React from 'react'
interface FormFieldProps<T extends FieldValues> {
    control: Control<T>;
    name:Path<T>;
    label:string;
    placeholder?:string;
    type?:'text'|'email'|'password'|'File' 
}
import {
    Form,
    FormControl,
    FormDescription,

    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Controller,FieldValues,Path,Control } from 'react-hook-form';

const FormField = ({control,name,label,placeholder, type="text"}: FormFieldProps<T>) => (
    <Controller name={name} control={control} render={({ field }) => (
        <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
                <Input placeholder="shadcn" {...field} />
            </FormControl>
            <FormDescription>
                This is your public display name.
            </FormDescription>
            <FormMessage />
        </FormItem>
    )}
    />
)

export default FormField 