import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import Layout from '@/components/auth/Layout';

const ForgotPassword = () => {
  return (
    <Layout
      title="Forgot Your Password? We'll Get You Back in."
      thirdTitle="Enter your email, and we'll send you a link to reset your password."
    >
      <ForgotPasswordForm />
    </Layout>
  );
};

export default ForgotPassword;
