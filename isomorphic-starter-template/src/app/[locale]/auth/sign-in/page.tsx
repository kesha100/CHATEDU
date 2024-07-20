'use client';

import Link from 'next/link';
import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { SubmitHandler } from 'react-hook-form';
import { PiArrowRightBold } from 'react-icons/pi';
import { Checkbox, Password, Button, Input, Text } from 'rizzui';
import { Form } from '@/components/ui/form';
import { routes } from '@/config/routes';
import { loginSchema, LoginSchema } from '@/utils/validators/login.schema';


export default function SignInForm({params}:any) {

    //TODO: why we need to reset it here
    const [reset, setReset] = useState({});
    const [error, setError] = useState<string | undefined>(''); // Initialize error state

    const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
        const { email, password } = data; // Destructure email and password from form data

        try {
            // Attempt to sign in using the provided credentials
            const result = await signIn('credentials', {
                redirect: false, // Prevent automatic redirection
                email,
                password,
            });
            console.log(result)

            // Check if the sign-in was successful
            if (!result?.error) {
                // Redirect user to the desired pages upon successful sign-in
                window.location.href = '/'; // Replace '/dashboard' with your target pages
                console.error('Succes!:');
            } else {
                // Handle sign-in error, such as displaying an error message
                setError('Invalid email or password'); // Update error state to display an error message
                console.error('Failed to sign in:', error);
            }
        } catch (error) {
            console.error('Failed to sign in:', error);
            // Handle any errors that occur during sign-in, such as displaying an error message
            setError('Failed to sign in'); // Update error state to display an error message
        }
    };

    return (
        <div className='w-1/2"'>
            {/* Display error message if error state is not undefined */}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <span className="block sm:inline">{error}</span>
                </div>
            )}
            <Form<LoginSchema>
                validationSchema={loginSchema}
                resetValues={reset}
                onSubmit={onSubmit}
                useFormProps={{
                    mode: 'onChange'
                }}
            >
                {({ register, formState: { errors } }) => (
                    <div className="space-y-5">
                        <Input
                            type="email"
                            size="lg"
                            label="Email"
                            placeholder="Enter your email"
                            className="[&>label>span]:font-medium"
                            inputClassName="text-sm"
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
                        {/*<div className="flex items-center justify-between pb-2">*/}
                        {/*    <Checkbox*/}
                        {/*        {...register('rememberMe')}*/}
                        {/*        label="Remember Me"*/}
                        {/*        variant="flat"*/}
                        {/*        className="[&>label>span]:font-medium"*/}
                        {/*    />*/}
                            {/*<Link*/}
                            {/*    href={routes.auth.forgotPassword1}*/}
                            {/*    className="h-auto p-0 text-sm font-semibold text-blue underline transition-colors hover:text-gray-900 hover:no-underline"*/}
                            {/*>*/}
                            {/*    Forget Password?*/}
                            {/*</Link>*/}
                        {/*</div>*/}
                        <Button className="w-full" type="submit" size="lg">
                            <span>Sign in</span>{' '}
                            <PiArrowRightBold className="ms-2 mt-0.5 h-6 w-6" />
                        </Button>
                    </div>
                )}
            </Form>

            <Text className="mt-6 text-center leading-loose text-gray-500 lg:mt-8 lg:text-start">
                Don’t have an account?{' '}
                <Link
                    href={routes.auth.signUp1}
                    className="font-semibold text-gray-700 transition-colors hover:text-blue"
                >
                    Sign Up
                </Link>
            </Text>
        </div>
    );
}

