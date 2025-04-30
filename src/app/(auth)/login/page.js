import Layout from '@/components/auth/Layout';
import LoginForm from '@/components/auth/LoginForm';

const Login = () => {
  return (
    <Layout title="Welcome Back!" thirdTitle="Log In to Continue Your Rental Journey.">
      <LoginForm />;
    </Layout>
  );
};

export default Login;
