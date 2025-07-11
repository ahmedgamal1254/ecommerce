import * as yup from "yup"

export const RegisterSchema=new yup.ObjectSchema({
    name:yup.string().required(),
    email:yup.string().email().required(),
    password:yup.string().required().min(8).max(32),
    password_confirmation:yup.string().required()
})