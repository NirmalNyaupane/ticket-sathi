"use client"
import { useResetForgotPasswordMutation } from '@/__generated__/graphql'
import { InputField } from '@/components/common/InputField'
import LoadingButton from '@/components/common/LoadingButton'
import DefaultNavBar from '@/components/common/navbar/DefaultNavBar'
import { userNavItems } from '@/constants/navbar/links'
import useCustomToast from '@/hooks/useToast'
import { passwordValidation } from '@/lib/formvalidation/authvalidation'
import { showError } from '@/utils/helper'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod';

type passwordValidation = z.infer<typeof passwordValidation>

const ResetForgotPassword = () => {
    const toast = useCustomToast();
    const router = useRouter();
    const [mutation, { error, loading }] = useResetForgotPasswordMutation({
        onCompleted() {
            toast.sucess("Password reset sucessfully");
            router.push("/");
        },
    });

    const { register, formState: { errors }, handleSubmit } = useForm<passwordValidation>({
        resolver: zodResolver(passwordValidation)
    });
    const param = useSearchParams();
    const token = param.get("token")

    // const {} = 
    const formSubmit = handleSubmit((data) => {
        if (token) {
            mutation({
                variables: {
                    data: {
                        token: token,
                        password: data.password
                    }
                }
            }).catch((error) => {
                toast.error(showError(error))
            })

        }
    })
    return (
        <>
            <DefaultNavBar linkItems={userNavItems} />
            <div className="max-width h-[80vh] flex justify-center items-center">
                <div className="w-[100%] md:w-[60%] lg:w-[40%] border border-gray-300 p-5 md:p-10 rounded-md space-y-4">
                    <h2 className="text-xl font-bold text-center">Reset Password</h2>
                    <p>
                        Please enter your new password in the field below, and it will be your password for login
                    </p>
                    <form onSubmit={formSubmit} className='space-y-2'>
                        <InputField type="text" label="Password"{...register("password")} />
                        <LoadingButton type="submit" isLoading={loading}>Reset</LoadingButton>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ResetForgotPassword