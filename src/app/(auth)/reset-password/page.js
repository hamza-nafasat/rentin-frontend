import Layout from '@/components/auth/Layout';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';

const ResetPassword = () => {
  return (
    <Layout title="Rest your password" thirdTitle="Enter Your New Password to Complete the Reset">
      <ResetPasswordForm />
    </Layout>
  );
};

export default ResetPassword;
