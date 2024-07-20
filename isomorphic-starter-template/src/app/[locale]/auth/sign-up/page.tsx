'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { PiArrowRightBold } from 'react-icons/pi';
import { Password, Button, Input, Text } from 'rizzui';
import { Form } from '@/components/ui/form';
import { SignUpSchema, signUpSchema } from '@/utils/validators/signup.schema';
import axios from "axios";
import {useRouter} from "next/navigation";
import { apiService } from '@/api.axios/api';

const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
};

 const SignUpForm = (
    {
        params,
    }:
    {
        params:{
            locale?:string
    }
}) => {
    const [reset, setReset] = useState({});
    const [error, setError] = useState()
    const route = useRouter()

    const onSubmit: SubmitHandler<SignUpSchema> = async (data) => {
        console.log(data);
        try {
            const res = await axios.post(`${apiService?.defaults?.baseURL}api/user`, {
                email: data?.email,
                username: data?.username,
                password: data?.password,
            });
            route.push(`/${params.locale}/auth/sign-in`);

        } catch (error: any) {
            console.log(error?.response?.data?.message);
            setError(error?.response?.data?.message)
        }
    };

    return (
        <>
            <Form<SignUpSchema>
                validationSchema={signUpSchema}
                resetValues={reset}
                onSubmit={onSubmit}
                useFormProps={{
                    defaultValues: initialValues,
                }}
            >
                {({ register, formState: { errors } }) => (
                    <div className="flex flex-col gap-x-4 gap-y-5 md:grid md:grid-cols-2 lg:gap-5">
                        <Input
                            type="text"
                            size="lg"
                            label="First Name"
                            placeholder="Enter your first name"
                            className="[&>label>span]:font-medium"
                            inputClassName="text-sm"
                            {...register('username')}
                            error={errors.username?.message}
                        />
                        <Input
                            type="email"
                            size="lg"
                            label="Email"
                            className="col-span-2 [&>label>span]:font-medium"
                            inputClassName="text-sm"
                            placeholder="Enter your email"
                            {...register('email')}
                            error={errors.email?.message}
                        />
                        <Password
                            label="Password"
                            placeholder="Enter your password"
                            size="lg"
                            className="[&>label>span]:font-medium"
                            inputClassName="text-sm"
                            {...register('password')}
                            error={errors.password?.message}
                        />
                        <Password
                            label="Confirm Password"
                            placeholder="Enter confirm password"
                            size="lg"
                            className="[&>label>span]:font-medium"
                            inputClassName="text-sm"
                            {...register('confirmPassword')}
                            error={errors.confirmPassword?.message}
                        />
                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                <span className="block sm:inline">{error}</span>
                            </div>
                        )}

                        <Button size="lg" type="submit" className="col-span-2 mt-2">
                            <span>Get Started</span>{' '}
                            <PiArrowRightBold className="ms-2 mt-0.5 h-5 w-5" />
                        </Button>
                    </div>
                )}
            </Form>
            <Text className="mt-6 text-center leading-loose text-gray-500 lg:mt-8 lg:text-start">
                Don’t have an account?{' '}
                <Link
                    href={`/${params.locale}/auth/sign-in`}
                    className="font-semibold text-gray-700 transition-colors hover:text-blue"
                >
                    Sign In
                </Link>
            </Text>
        </>
    );
}
export default SignUpForm