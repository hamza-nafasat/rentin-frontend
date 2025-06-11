'use client';

import { useState } from 'react';
import Button from '../shared/small/Button';
import Input from '../shared/small/Input';
import PhoneInput from 'react-phone-input-2';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import Dropdown from '../shared/small/Dropdown';
import Link from 'next/link';
import { useVerifyEmailMutation, useRegisterMutation } from '@/features/auth/authApi';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setUser } from '@/features/auth/authSlice';

const options = [
  { option: 'Owner', value: 'owner' },
  { option: 'Tenant', value: 'tenant' },
  // { option: 'Agent', value: 'agent' },
];

const SignupForm = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [verifyEmail, { isLoading: isVerifying }] = useVerifyEmailMutation();
  const [register, { isLoading: isRegistering }] = useRegisterMutation();

  const initialFormState = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    role: '',
    otp: '',
    agreeToTerms: false,
    consent: false,
  };

  const [formData, setFormData] = useState(initialFormState);

  const resetAllStates = () => {
    setFormData(initialFormState);
    setShowPassword(false);
    setShowOtp(false);
    setIsEmailVerified(false);
  };

  const isFormValid =
    formData.firstName.trim() !== '' &&
    formData.lastName.trim() !== '' &&
    formData.email.trim() !== '' &&
    formData.phone.trim() !== '' &&
    formData.password.trim() !== '' &&
    formData.otp.trim() !== '' &&
    formData.role.trim() !== '';
  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handleCheckboxChange = e => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleVerifyEmail = async e => {
    e.preventDefault();
    if (!formData.email) return;

    try {
      await verifyEmail({ email: formData.email }).unwrap();
      setShowOtp(true);
      toast.success('OTP sent to your email');
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to verify email');
    }
  };

  const handleForm = async e => {
    e.preventDefault();

    if (!isEmailVerified) {
      toast.error('Please verify your email first');
      return;
    }

    try {
      const response = await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        contact: formData.phone,
        password: formData.password,
        role: formData.role,
        otp: formData.otp,
      }).unwrap();

      // Store user data in Redux
      dispatch(setUser(response));

      toast.success('Registration successful!');
      resetAllStates();
    } catch (error) {
      toast.error(error?.data?.message || 'Registration failed');
    }
  };

  return (
    <form className="w-full rounded-xl bg-white p-5 lg:px-[8%] lg:py-2 xl:py-8" onSubmit={handleForm}>
      <h6 className="text-text-textPrimary text-center text-xl font-semibold md:text-left lg:text-2xl">Sign up now</h6>
      <div className="mt-5 grid grid-cols-1 gap-4 lg:mt-3 lg:grid-cols-12 lg:gap-2 xl:mt-7 2xl:gap-4">
        <div className="lg:col-span-6">
          <Input shadow label="First name" name="firstName" value={formData.firstName} onChange={handleInputChange} />
        </div>
        <div className="lg:col-span-6">
          <Input shadow label="Last name" name="lastName" value={formData.lastName} onChange={handleInputChange} />
        </div>
        <div className="lg:col-span-9">
          <Input
            shadow
            label="Email address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            disabled={isEmailVerified}
          />
        </div>
        <div className="flex items-end lg:col-span-3">
          <button
            type="button"
            disabled={!formData.email || isEmailVerified || isVerifying}
            onClick={handleVerifyEmail}
            className={`${
              !formData.email || isEmailVerified || isVerifying ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
            } bg-primary h-[3.5rem] w-full rounded-xl px-4 text-sm font-medium text-white md:text-base`}
          >
            {isVerifying ? 'Verifying...' : isEmailVerified ? 'Verified' : 'Verify Email'}
          </button>
        </div>
        {showOtp && !isEmailVerified && (
          <div className="flex gap-2 lg:col-span-12">
            <div className="flex-1">
              <Input
                shadow
                label="Enter OTP"
                name="otp"
                type="text"
                value={formData.otp}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex items-end">
              <Button
                width="w-[120px]"
                height="h-[3.5rem]"
                text="Verify OTP"
                type="button"
                onClick={() => setIsEmailVerified(true)}
                disabled={!formData.otp}
              />
            </div>
          </div>
        )}
        <div className="lg:col-span-12">
          <PhoneInput
            country={'pk'}
            value={formData.phone}
            onChange={phone => setFormData(prev => ({ ...prev, phone }))}
            containerClass="phone-input-container"
            inputClass="phone-input-field"
            buttonClass="phone-input-button"
            autoComplete="new-phone"
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
        <div className="lg:col-span-12">
          <Dropdown
            label="Register As"
            name="role"
            options={options}
            value={formData.role}
            onSelect={option => setFormData(prev => ({ ...prev, role: option.value }))}
          />
        </div>
        <div className="lg:col-span-12">
          <CheckBox
            name="agreeToTerms"
            label={
              <>
                By creating an account, I agree to our{' '}
                <Link href="" className="underline">
                  Terms of use
                </Link>{' '}
                and{' '}
                <Link href="" className="underline">
                  Privacy Policy
                </Link>
              </>
            }
            checked={formData.agreeToTerms}
            onChange={handleCheckboxChange}
          />
        </div>
        <div className="lg:col-span-12">
          <CheckBox
            name="consent"
            label="By creating an account, I am also consenting to receive SMS messages and emails, including product new feature updates, events, and marketing promotions."
            checked={formData.consent}
            onChange={handleCheckboxChange}
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-6 md:flex-row lg:col-span-12 lg:justify-start">
          <Button
            width="w-full md:w-[11.5rem]"
            height="h-[2.6875rem]"
            text={isRegistering ? 'Signing up...' : 'Sign up'}
            type="submit"
            disabled={!isFormValid || !isEmailVerified || isRegistering}
            cn={!isFormValid || !isEmailVerified || isRegistering ? 'opacity-50 cursor-not-allowed' : ''}
          />
          <div className="text-sm text-[#666666] lg:text-base">
            Already have an Account?{' '}
            <Link href="/login" className="text-primary font-semibold">
              Login
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignupForm;

const CheckBox = ({ label, checked, onChange, name }) => {
  return (
    <label className="flex cursor-pointer items-start gap-2">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="mt-[.1875rem] cursor-pointer"
      />
      <span className="text-sm leading-5 text-[#333333CC] lg:text-base">{label}</span>
    </label>
  );
};
