import Joi from 'joi';
import { useForm } from "react-hook-form";
import { joiResolver } from '@hookform/resolvers/joi';

function RegistrationForm(){

    const schema = Joi.object({
        firstName: Joi.string().required().messages({
            "string.base": "* Please insert a valid name.",
            "string.empty": "* Please insert your name.",
            "any.required": "Name is required."
        }),
        lastName: Joi.string().required().messages({
            "string.base": "* Please insert a valid lastName.",
            "string.empty": "* Please insert your lastName.",
            "any.required": "LastName is required."
        }),
        email: Joi.string().email({ tlds: { allow: false } }).pattern(new RegExp("/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/")).required().messages({
            "string.base": "* Please type a valid email.",
            "string.empty": "* Set your email in the field below.",
            "any.required": "* Email is required."
        }),
        password: Joi.string().trim().min(12).pattern(new RegExp("/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{12,}$/gm")).required().messages({
            "string.min": "* The password should have at least 12 characters",
            "string.empty": "* Please type a password",
            "string.pattern.base": "* The password should contain a mix of upper and lowercase letters, numbers and simbols",
            "any.required": "* Password is required"
        }),
        repeatPassword: Joi.string().trim().required().valid(Joi.ref('password')).messages({
            "string.empty": "Please re-enter your password.",
            "any.required": "Please confirm your password.",
            "any.only": "Passwords do not match.",
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
            repeatPassword: ""
        }
    })

    const submitData = handleSubmit((data) => {
        console.log(data)
    })

    return(
        <section className="w-screen h-screen flex justify-center items-center">
            <form onSubmit={submitData} className="w-1/2 flex flex-col gap-2">
                <legend className="font-semibold text-center">Registration</legend>
                <fieldset className="flex flex-col gap-1">
                    <div className="flex w-full">
                        <label htmlFor="firstName" className="flex-1 font-semibold">First name</label> <p className="inline text-right text-lg text-red-600">{errors.firstName?.message}</p>
                    </div>
                    <input type="text" id="firstName" {...register("firstName")} placeholder="First Name" className="block w-full p-2 border-2 rounded-md border-black" />
                </fieldset>

                <fieldset className="flex flex-col gap-1">
                    <div className="flex w-full">
                        <label htmlFor="lastName" className="flex-1 font-semibold">Last name</label> <p className="inline text-right text-lg text-red-600">{errors.lastName?.message}</p>
                    </div>
                    <input type="text" id="lastName" {...register("lastName")} placeholder="Last name" className="block w-full p-2 border-2 rounded-md border-black" />
                </fieldset>
                <fieldset className="flex flex-col gap-1">
                    <div className="flex w-full">
                        <label htmlFor="birthDate" className="flex-1 font-semibold">Birth date</label> <p className="inline text-right text-lg text-red-600">{errors.firstName?.message}</p>
                    </div>
                    <input type="date" id="birthDate" {...register("birthDate")} className="block w-full p-2 border-2 rounded-md border-black"/>
                </fieldset>
                <fieldset className="flex flex-col gap-1">
                    <div className="flex w-full">
                        <label htmlFor="email" className="flex-1 font-semibold">Email</label> <p className="inline text-right text-lg text-red-600">{errors.email?.message}</p>
                    </div>
                    <input type="email" id="email" {...register("email")} placeholder="email@example.com" className="block w-full p-2 border-2 rounded-md border-black"/>
                </fieldset>
                <fieldset className="flex flex-col gap-1">
                    <div className="flex w-full">
                        <label htmlFor="password" className="flex-1 font-semibold">Password</label> <p className="inline text-right text-lg text-red-600">{errors.password?.message}</p>
                    </div>
                    <input type="password" id="password" {...register("password")} placeholder="********"  className="block w-full p-2 border-2 rounded-md border-black"/>
                </fieldset>
                <fieldset className="flex flex-col gap-1">
                    <div className="flex w-full">
                        <label htmlFor="repeatPassword" className="flex-1 font-semibold">Confirm password</label> <p className="inline text-right text-lg text-red-600">{errors.repeatPassword?.message}</p>
                    </div>
                    <input type="password" id="repeatPassword" {...register("repeatPassword")} placeholder="********" className="block w-full p-2 border-2 rounded-md border-black" />
                </fieldset>
                <fieldset className="flex gap-1">
                    <div className="flex w-full align-baseline">
                        <input type="submit" className="p-2 rounded-sm bg-cyan-400 cursor-pointer hover:bg-cyan-300" value="Register" /> <p className="text-right flex-1">You have an account? Sign in <a href="#">here</a></p>
                    </div>
                </fieldset>
            </form>
        </section>
    )
}

export default RegistrationForm