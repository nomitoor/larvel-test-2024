import React from "react"
import {DeepMap, FieldError, RegisterOptions, UseFormRegister} from "react-hook-form";
import get from 'lodash/get';

interface InputProps {
    id: string
    type: string
    name: string
    placeholder: string
    className?: string;
    errorMessage?: string
    rules?: RegisterOptions
    register?: UseFormRegister<InputProps>;
    errors?: Partial<DeepMap<InputProps, FieldError>>;
}

const Input: React.FC<InputProps> = ({ id, type, name, placeholder, errorMessage, register, rules, errors,className }) => {
    const errorMessages = get(errors, name);
    const hasError = !!(errors && errorMessages);

    return (
        <>
            <div className="relative mb-3 mt-6 items-center align-middle">
                <input
                    id={id}
                    type={type}
                    name={name}
                    className={`w-3/4 h-10 text-gray-dark peer appearance-none rounded-lg border-gray-400 px-0 py-[14px] pl-6 text-sm focus:border-gray-800 focus:outline-none focus:ring-0 ${className}`}
                    placeholder=" "
                    {...(register && register(name, rules))}
                />
                <label
                    htmlFor={id}
                    className="absolute top-2 left-[6.5rem] text-gray-middle bg-white duration-300 transform -translate-y-6 transparent peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6 peer-focus:px-[4px] peer-focus:text-gray-dark peer-focus:transparent"
                >
                    {placeholder}
                </label>
                {hasError && (
                    <p className="text-red-500 text-sm absolute left-24">{errorMessages.message}</p>
                )}
            </div>
        </>
    );
}

export default Input;
