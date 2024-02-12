import React from "react";
import Input from "../../components/input";
import { Link } from "react-router-dom";
import {useForm, useFormState} from "react-hook-form";
import axios from 'axios';

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, setError },
    } = useForm<RegistrationFormFields>();

    const onSubmit = handleSubmit((data) => {
        axios.post('/auth/register', { ...data })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
                let message = 'An error occurred';

                const e: AxiosError = error;
                if (e.isAxiosError && e.response?.status && e.response.status < 500) {
                    const {data} = e.response;
                    message = data['hydra:title'];

                    if(data.errors.length){
                        setError(
                            data?.error.map((violation: any) => ({
                                type: 'api',
                                name: violation.propertyPath,
                                message: violation.message,
                            }))
                        );
                    }
                }
            });
    });

    return (
        <div className="flex flex-row min-h-screen justify-center items-center bg-regal-blue">
            <div className="relative border rounded-lg w-4/3 h-[40rem] text-center bg-white w-[45rem] overflow-hidden">
                <h1 className="mt-10 text-4xl">Register</h1>
                <form onSubmit={onSubmit}>
                    <Input
                        id="first_name"
                        type="text"
                        name="first_name"
                        placeholder="First name"
                        register={register}
                        rules={{required: 'This field is required'}}
                        errors={errors}
                    />

                    <Input
                        id="last_name"
                        type="text"
                        name="last_name"
                        placeholder="Last name"
                        register={register}
                        rules={{required: 'This field is required'}}
                        errors={errors}
                    />

                    <Input
                        id="username"
                        type="text"
                        name="username"
                        placeholder="Username"
                        register={register}
                        rules={{required: 'This field is required'}}
                        errors={errors}
                    />

                    <Input
                        id="user_email"
                        type="email"
                        name="email"
                        placeholder="Email"
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

                    <Input
                        id="user_cpassword"
                        type="password"
                        name="user_cpassword"
                        placeholder="Confirm Password"
                        register={register}
                        rules={{required: 'This field is required'}}
                        errors={errors}
                    />
                    <button
                        type="submit"
                        className="w-3/4 h-10 mt-5 px-2 border border-gray-300 rounded focus:outline-none text-white bg-regal-blue"
                    >
                        Let's go
                    </button>
                </form>
                <div className="inline-block mt-10">
                    Already have account? Login
                    <Link className="text-gray-600 hover:text-black" to='/login'>&#160;here</Link>
                </div>
            </div>
        </div>
    );
}

export default Register;