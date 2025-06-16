'use client';

import Link from 'next/link';
import { useState } from 'react';
import Button from '../shared/small/Button';
import Input from '../shared/small/Input';
import { toast } from 'react-hot-toast';
import { useForgetPasswordMutation } from '@/features/auth/authApi';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();
  // const handleForm = e => {
  //   e.preventDefault();
  // };
  const handleForm = async e => {
    e.preventDefault();

    if (!email) {
      toast.error('Please enter your email');
      return;
    }

    try {
      const response = await forgetPassword({ email }).unwrap();

      console.log('Forget Password response:', response);
      toast.success(response.message || 'Reset link sent!');

      setEmail('');
    } catch (error) {
      console.log('Forget Password error:', error);
      toast.error(error?.data?.message || 'Something went wrong');
    }
  };

  return (
    <form className="w-full rounded-xl bg-white p-5 lg:px-[8%] lg:py-8" onSubmit={handleForm}>
      <h6 className="text-text-textPrimary text-center text-xl font-semibold md:text-left lg:text-2xl">
        Forgot Password
      </h6>
      <div className="mt-5 grid grid-cols-1 gap-4 lg:mt-7 lg:grid-cols-12">
        <div className="lg:col-span-12">
          <Input
            shadow
            label="Email address"
            name="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-6 md:flex-row lg:col-span-12 lg:justify-start">
          <Button width="w-full md:w-[184px]" height="h-[43px]" text="Send Reset Link" type="submit" />
          <div className="text-sm text-[#666666] lg:text-base">
            Don’t have an Account?{' '}
            <Link href="/signup" className="text-primary font-semibold">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </form>
    // <form className="w-full rounded-xl bg-white p-5 lg:px-[8%] lg:py-8" onSubmit={handleForm}>
    //   <h6 className="text-text-textPrimary text-center text-xl font-semibold md:text-left lg:text-2xl">
    //     Forgot Password
    //   </h6>
    //   <div className="mt-5 grid grid-cols-1 gap-4 lg:mt-7 lg:grid-cols-12">
    //     <div className="lg:col-span-12">
    //       <Input
    //         shadow
    //         label="Email address"
    //         name="email"
    //         type="email"
    //         value={email}
    //         onChange={e => setEmail(e.target.value)}
    //       />
    //     </div>
    //     <div className="flex flex-col items-center justify-center gap-6 md:flex-row lg:col-span-12 lg:justify-start">
    //       <Button
    //         width="w-full md:w-[184px]"
    //         height="h-[43px]"
    //         text={isLoading ? 'Sending...' : 'Send Reset Link'}
    //         type="submit"
    //         disabled={isLoading}
    //       />
    //       <div className="text-sm text-[#666666] lg:text-base">
    //         Don’t have an Account?{' '}
    //         <Link href="/signup" className="text-primary font-semibold">
    //           Sign Up
    //         </Link>
    //       </div>
    //     </div>
    //   </div>
    // </form>
  );
};

export default ForgotPasswordForm;
