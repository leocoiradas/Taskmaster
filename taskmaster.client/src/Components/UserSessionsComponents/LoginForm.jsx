import Joi from 'joi';
import { useForm } from "react-hook-form";
import { joiResolver } from '@hookform/resolvers/joi';

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

    return(
        <section className="w-screen h-screen flex justify-center items-center">
            <form className="w-1/4 flex flex-col gap-5">
                <legend className="font-semibold text-center">Login</legend>
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
                    <div className="flex w-full align-baseline">
                            <input type="submit" className="p-2 rounded-sm bg-cyan-400 cursor-pointer hover:bg-cyan-300" value="Sign In" /> <p className="text-right flex-1">You don't have an account? Register <a href="#">here</a></p>
                    </div>
                </fieldset>
            </form>
        </section>
    )
}

export default LoginForm