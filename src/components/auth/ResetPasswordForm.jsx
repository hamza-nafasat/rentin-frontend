'use client';

import { useResetPasswordMutation } from '@/features/auth/authApi';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import Button from '../shared/small/Button';
import Input from '../shared/small/Input';

const ResetPasswordForm = ({ resetToken }) => {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleForm = async e => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Both passwords should be same');
      return;
    }

    try {
      const res = await resetPassword({
        resetToken,
        newPassword: formData.password,
      }).unwrap();

      toast.success(res.message || 'Password reset successfully!');
    } catch (err) {
      console.error('Reset error:', err);
      toast.error(err?.data?.message || 'Reset failed');
    }
  };

  return (
    <form className="w-full rounded-xl bg-white p-5 lg:px-[8%] lg:py-8" onSubmit={handleForm}>
      <h6 className="text-text-textPrimary text-center text-xl font-semibold md:text-left lg:text-2xl">
        Reset Your Password
      </h6>
      <div className="mt-5 grid grid-cols-1 gap-4 lg:mt-7 lg:grid-cols-12">
        <div className="relative lg:col-span-12">
          <Input
            shadow
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleInputChange}
            autoComplete="new-password"
          />
          <div
            className="absolute top-0 right-0 flex cursor-pointer items-center gap-2 text-sm text-[#666666CC] lg:text-lg"
            onClick={() => setShowPassword(!showPassword)}
          >
            {!showPassword ? (
              <>
                <IoEyeOutline color="#666666CC" />
                Show
              </>
            ) : (
              <>
                <IoEyeOffOutline color="#666666CC" />
                Hide
              </>
            )}
          </div>
        </div>
        <div className="relative lg:col-span-12">
          <Input
            shadow
            label="Confirm New Password"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={handleInputChange}
            autoComplete="new-password"
          />
          <div
            className="absolute top-0 right-0 flex cursor-pointer items-center gap-2 text-sm text-[#666666CC] lg:text-lg"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {!showConfirmPassword ? (
              <>
                <IoEyeOutline color="#666666CC" />
                Show
              </>
            ) : (
              <>
                <IoEyeOffOutline color="#666666CC" />
                Hide
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-6 md:flex-row lg:col-span-12 lg:justify-start">
          <Button width="w-full md:w-[184px]" height="h-[43px]" text="Reset" type="submit" />
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

export default ResetPasswordForm;
