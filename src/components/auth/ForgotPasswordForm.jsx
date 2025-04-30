'use client';

import Link from 'next/link';
import { useState } from 'react';
import Button from '../shared/small/Button';
import Input from '../shared/small/Input';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const handleForm = e => {
    e.preventDefault();
  };

  return (
    <form className="w-full rounded-xl bg-white p-5 lg:px-[8%] lg:py-8" onSubmit={handleForm}>
      <h6 className="text-text-textColor text-center text-xl font-semibold md:text-left lg:text-2xl">
        Forgot Password
      </h6>
      <div className="mt-5 grid grid-cols-1 gap-4 lg:mt-7 lg:grid-cols-12">
        <div className="lg:col-span-12">
          <Input
            label="Email address"
            name="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-6 md:flex-row lg:col-span-12 lg:justify-start">
          <Button
            width="w-full md:w-[184px]"
            height="h-[43px]"
            text="Send Reset Link"
            type="submit"
          />
          <div className="text-sm text-[#666666] lg:text-base">
            Don’t have an Account?{' '}
            <Link href="/signup" className="text-primary font-semibold">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
