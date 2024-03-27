import { useForgotPasswordRequestMutation } from '@/__generated__/graphql'
import { InputField } from '@/components/common/InputField'
import LoadingButton from '@/components/common/LoadingButton'
import DefaultNavBar from '@/components/common/navbar/DefaultNavBar'
import { userNavItems } from '@/constants/navbar/links'
import { emailValidation } from '@/lib/formvalidation/authvalidation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form';

import { z } from 'zod';
type EmailType = z.infer<typeof emailValidation>;



const ForgotPasswordPage = () => {
    const [Mutation, { loading, data }] = useForgotPasswordRequestMutation();

    const { register, formState: { errors }, handleSubmit } = useForm<EmailType>({
        resolver: zodResolver(emailValidation)
    });

    const formsSubmit = handleSubmit((data) => {
        console.log(data.email)
    })
    return (
        <>
            <DefaultNavBar linkItems={userNavItems} />
            <div className="max-width h-[80vh] flex justify-center items-center">
                <div className="w-[100%] md:w-[60%] lg:w-[40%] border border-gray-300 p-5 md:p-10 rounded-md space-y-4">
                    <h2 className="text-xl font-bold text-center">Forgot Password</h2>
                    <p>
                        Please enter your email in the field below and check your email after clicking send link.
                    </p>
                    <InputField type="text" label="Email" {...register("email")} errorMessage={errors.email?.message}/>
                    <LoadingButton type="submit" isLoading={loading}>Send Link</LoadingButton>
                </div>
            </div>
        </>
    )
}

export default ForgotPasswordPage