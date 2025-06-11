'use client';

import Link from 'next/link';
import { useState } from 'react';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import Button from '../shared/small/Button';
import Input from '../shared/small/Input';
import { useLoginMutation } from '@/features/auth/authApi';
import { useDispatch } from 'react-redux';
import { setUser } from '@/features/auth/authSlice';
import { toast } from 'react-hot-toast';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [login, { isLoading: isLoggingIn }] = useLoginMutation();

  const initialFormState = {
    email: '',
    password: '',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setShowPassword(false);
  };

  const isFormValid = formData.email.trim() !== '' && formData.password.trim() !== '';

  const handleForm = async e => {
    e.preventDefault();

    try {
      const response = await login({
        email: formData.email,
        password: formData.password,
      }).unwrap();

      // Store user data in Redux
      dispatch(setUser(response));

      toast.success('Login successful!');
      resetForm();

      // You can add navigation here if needed
      // router.push('/dashboard');
    } catch (error) {
      toast.error(error?.data?.message || 'Login failed');
    }
  };

  return (
    <form className="w-full rounded-xl bg-white p-5 lg:px-[8%] lg:py-8" onSubmit={handleForm}>
      <h6 className="text-text-textPrimary text-center text-xl font-semibold md:text-left lg:text-2xl">Login now</h6>
      <div className="mt-5 grid grid-cols-1 gap-4 lg:mt-7 lg:grid-cols-12">
        <div className="lg:col-span-12">
          <Input
            shadow
            label="Email address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            disabled={isLoggingIn}
          />
        </div>
        <div className="relative lg:col-span-12">
          <Input
            shadow
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleInputChange}
            disabled={isLoggingIn}
          />
          <div
            className="absolute top-0 right-0 flex cursor-pointer items-center gap-2 text-sm text-[#666666CC] lg:text-lg"
            onClick={() => !isLoggingIn && setShowPassword(!showPassword)}
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
        <div className="flex justify-end lg:col-span-12">
          <Link href="/forgot-password" className="text-primary font-medium underline">
            Forget Password
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center gap-6 md:flex-row lg:col-span-12 lg:justify-start">
          <Button
            width="w-full md:w-[184px]"
            height="h-[43px]"
            text={isLoggingIn ? 'Logging in...' : 'Login'}
            type="submit"
            disabled={!isFormValid || isLoggingIn}
            cn={!isFormValid || isLoggingIn ? 'opacity-50 cursor-not-allowed' : ''}
          />
          <div className="text-sm text-[#666666] lg:text-base">
            Don't have an Account?{' '}
            <Link href="/signup" className="text-primary font-semibold">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
