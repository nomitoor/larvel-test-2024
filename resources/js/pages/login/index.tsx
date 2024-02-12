import React from "react";
import Input from "../../components/input";
import {Link} from "react-router-dom";
import { useForm } from 'react-hook-form';

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = handleSubmit((data) => {
        console.log('submitting...');
    });

    return (
        <div className="flex flex-row min-h-screen justify-center items-center bg-regal-blue">
            <div className="relative border rounded-lg w-4/3 h-[25rem] text-center bg-white w-[45rem] overflow-hidden">
                <h1 className="mt-10 text-4xl">Login</h1>
                <form onSubmit={onSubmit}>
                    <Input
                        id="user_email"
                        type="email"
                        name="email"
                        placeholder="Email or Username"
                        register={register}
                        rules={{required: 'This field is required'}}
                        errors={errors}
                    />

                    <Input
                        id="user_password"
                        type="password"
                        name="password"
                        placeholder="Password"
                        register={register}
                        rules={{required: 'This field is required'}}
                        errors={errors}
                    />
                    <button
                        type="submit"
                        className="w-3/4 h-10 mt-5 px-2 border border-gray-300 rounded focus:outline-none text-white bg-regal-blue"
                    >
                        Login
                    </button>
                </form>

                <div className="inline-block mt-3">
                    Don't have an account? Register
                    <Link className="text-gray-600 hover:text-black" to='/register'>&#160;here</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
