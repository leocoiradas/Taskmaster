import Joi from 'joi';
import { useForm } from "react-hook-form";
import { joiResolver } from '@hookform/resolvers/joi';
import { Link } from 'react-router-dom';

function RegistrationForm(){

    const schema = Joi.object({
        firstName: Joi.string().min(2).required().messages({
            "string.base": "* Please insert a valid name.",
            "string.min": "* Name should have at least 2 characters",
            "string.empty": "* Please insert your name.",
            "any.required": "Name is required."
        }),
        lastName: Joi.string().min(2).required().messages({
            "string.base": "* Please insert a valid lastName.",
            "string.min": "* Last name should have at least 2 characters",
            "string.empty": "* Please insert your lastName.",
            "any.required": "LastName is required."
        }),
        birthDate: Joi.date().required().messages({
            "date.empty": "* Please set your birth date",
            "date.base": "* Set a valid date",
            "any.required": "* Birth date is required"
        }),
        email: Joi.string().email({ tlds: { allow: false } }).pattern(new RegExp("/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/")).required().messages({
            "string.base": "* Please type a valid email.",
            "string.empty": "* Set your email in the field below.",
            "any.required": "* Email is required."
        }),
        password: Joi.string().trim().min(12).pattern(new RegExp("/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{12,}$/gm")).required().messages({
            "string.min": "* The password should have at least 12 characters",
            "string.empty": "* Please type a password",
            "string.pattern.base": "* Password should contain a mix of upper and lowercase letters, numbers and simbols",
            "any.required": "* Password is required"
        }),
        confirmPassword: Joi.string().trim().required().valid(Joi.ref('password')).messages({
            "string.empty": "* Please re-enter your password.",
            "any.required": "* Please confirm your password.",
            "any.only": "* Passwords do not match.",
          }),
        
    })
    const {register, handleSubmit, formState :{errors}} = useForm({
        resolver: joiResolver(schema),
        defaultValues: {
            firstName: "",
            lastName: "",
            birthDate: new Date(),
            email: "",
            password: "",
            confirmPassword: ""
        }
    })

    const fields = [
        {
            labelText: "First Name",
            fieldType: "text",
            fieldName: "firstName",
            fieldId: "firstName",
            placeholder: "Alexa"
        },
        {
            labelText: "Last Name",
            fieldType: "text",
            fieldName: "lastName",
            fieldId: "lastName",
            placeholder: "Waller"
        },
        {
            labelText: "Birth date",
            fieldType: "date",
            fieldName: "birthDate",
            fieldId: "birthDate",
            placeholder: "01/01/2000"
        },
        {
            labelText: "Email",
            fieldType: "email",
            fieldName: "email",
            fieldId: "email",
            placeholder: "email@example.com"
        },
        {
            labelText: "Password",
            fieldType: "password",
            fieldName: "password",
            fieldId: "password",
            placeholder: "***************"
        },
        {
            labelText: "Confirm Password",
            fieldType: "password",
            fieldName: "confirmPassword",
            fieldId: "confirmPassword",
            placeholder: "***************"
        },

    ]

    const submitData = handleSubmit((data) => {
        console.log(data)
    })


    return(
        <section className="w-screen h-screen flex justify-center items-center">
            <form onSubmit={submitData} className="w-1/2 flex flex-col gap-3">
                <legend className="font-semibold text-xl text-center">Registration</legend>
                {fields.map((element) => (
                    <fieldset className="flex flex-col gap-1">
                        <div className="flex w-full">
                            <label htmlFor={element.fieldName} className="flex-1 font-semibold">{element.labelText}</label>
                            <p className="inline text-right text-lg text-red-600">{errors[element.fieldName]?.message}</p>
                        </div>
                        <input type={element.fieldType} id={element.fieldName} {...register(element.fieldName)} placeholder={element.placeholder} className="block w-full p-2 border-2 rounded-md border-black" />
                    </fieldset>))
                }
                <fieldset className="flex gap-1">
                    <div className="flex w-full text-lg items-baseline">
                        <input type="submit" className="p-2 rounded-sm bg-cyan-400 cursor-pointer hover:bg-cyan-300" value="Register" />
                        <p className="text-right  flex-1 mr-1">You have an account? Sign in</p>
                        <Link to="/login" className="font-semibold underline text-cyan-500 hover:text-purple-700">here</Link>
                    </div>
                </fieldset>
            </form>
        </section>
    )
}

export default RegistrationForm