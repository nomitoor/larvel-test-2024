import React from "react";
import Input from "../../components/input";
import { Link } from "react-router-dom";

const handleSubmit = () => {

}

const Register = () => {
    return (
        <div className="flex flex-row min-h-screen justify-center items-center bg-regal-blue">
            <div className="relative border rounded-lg w-4/3 h-[35rem] text-center bg-white w-[45rem] overflow-hidden">
                <h1 className="mt-10 text-4xl">Register</h1>
                <form onSubmit={handleSubmit}>
                    <Input
                        id="first_name"
                        type="text"
                        name="first_name"
                        placeholder="First name"
                        required={true}
                    />

                    <Input
                        id="last_name"
                        type="text"
                        name="last_name"
                        placeholder="Last name"
                        required={true}
                    />

                    <Input
                        id="user_email"
                        type="email"
                        name="email"
                        placeholder="Email"
                        required={true}
                    />
                    <Input
                        id="user_password"
                        type="password"
                        name="password"
                        placeholder="Password"
                        required={true}
                    />

                    <Input
                        id="user_cpassword"
                        type="password"
                        name="user_cpassword"
                        placeholder="Confirm Password"
                        required={true}
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