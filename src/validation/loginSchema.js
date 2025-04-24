import * as yup from "yup"

export const LoginSchema=new yup.ObjectSchema({
    email:yup.string().required().email(),
    password:yup.string().required().min(8)
})
