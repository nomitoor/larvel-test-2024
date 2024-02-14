import React, { useState } from "react";
import Input from "@/components/input";
import { Link } from "react-router-dom";
import {useForm} from "react-hook-form";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import {useNavigate} from 'react-router-dom';

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegistrationFormFields>();

    const [isSubmitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    const onSubmit = handleSubmit((data) => {
        setSubmitting(true);
        axios.post('/auth/register', { ...data })
            .then(response => {
                toast.success('Registration Successful, now you will be redirected to login page!', {
                    position: "top-center"
                });

                setTimeout(() => {
                    navigate('/login');
                }, 5000)
            })
            .catch(e => {
                const {errors} = e.response.data;
                console.log(errors)

                let firstError = null;

                for (const key in errors) {
                    if (errors.hasOwnProperty(key) && errors[key].length > 0) {
                        firstError = errors[key][0];
                        break;
                    }
                }

                toast.error(firstError, {
                    position: "top-center"
                });

                setTimeout(() => {
                    setSubmitting(false);
                }, 2000)
            });
    })

    return (
        <>
            <ToastContainer />
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
                            disabled={isSubmitting}
                            className="w-3/4 h-10 mt-5 px-2 border border-gray-300 rounded focus:outline-none text-white bg-regal-blue"
                        >
                            {isSubmitting ? 'Request sent, please wait...' : "Let's go"}
                        </button>

                    </form>
                    <div className="inline-block mt-10">
                        Already have account? Login
                        <Link className="text-gray-600 hover:text-black" to='/login'>&#160;here</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;