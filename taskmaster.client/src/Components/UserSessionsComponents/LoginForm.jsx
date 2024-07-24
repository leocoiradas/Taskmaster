import Joi from 'joi';
import { useForm } from "react-hook-form";
import { joiResolver } from '@hookform/resolvers/joi';
import { Link } from 'react-router-dom';

function LoginForm(){

    const schema = Joi.object({
        email: Joi.string().email({ tlds: { allow: false } }).pattern(new RegExp("/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/")).required().messages({
            "string.base": "* Please type a valid email",
            "string.empty": "* Set your email in the field below.",
            "any.required": "* Email is required."
        }),
        password: Joi.string().pattern(new RegExp("/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{12,}$/gm")).required().messages({
            "string.base": "Please type a valid password"
        })
    })
    const {register, handleSubmit, formState :{errors}} = useForm({
        resolver: joiResolver(schema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const fields = [
        {
            fieldName: "email",
            fieldType: "email",
            labelText: "Email",
            placeholder: "email@example.com"
        },
        {
            fieldName: "password",
            fieldType: "password",
            labelText: "Password",
            placeholder: "**************"
        },
    ]

    const submitData = handleSubmit((data) => {
        console.log(data)
    })

    return(
        <section className="w-screen h-screen flex justify-center items-center">
            <form onSubmit={submitData} className="w-1/3 flex flex-col gap-5">
                <legend className="font-semibold text-xl text-center">Login</legend>
                {fields.map((element) => (
                    <fieldset className="flex flex-col gap-1">
                        <div className="flex w-full">
                            <label htmlFor={element.fieldName} className="flex-1 text-lg font-semibold">{element.labelText}</label>
                            <p className="inline text-right text-lg text-red-600">{errors[element.fieldName]?.message}</p>
                        </div>
                        <input type={element.fieldType} id={element.fieldName} {...register(element.fieldName)} placeholder={element.placeholder} className="block w-full p-2 border-2 rounded-sm border-black" />
                    </fieldset>))
                }
                <fieldset className="flex gap-1">
                    <div className="flex w-full text-lg items-baseline">
                        <input type="submit" className="p-2 rounded-sm bg-cyan-400 cursor-pointer hover:bg-purple-700" value="Sign In" /> 
                        <p className="text-right flex-1 mr-1">You don't have an account? Register</p> 
                        <Link to="/register" className="font-semibold underline  text-cyan-500 hover:text-purple-700">here</Link>
                    </div>
                </fieldset>
            </form>
        </section>
    )
}

export default LoginForm