import Layout from '@/components/auth/Layout';
import SignupForm from '@/components/auth/SignupForm';

const Signup = () => {
  return (
    <Layout
      title="Welcome to RRentin"
      secondTitle="Connecting Tenants and Owners for Effortless Renting"
      thirdTitle="Join RRentin for a Seamless Renting Experience."
    >
      <SignupForm />
    </Layout>
  );
};

export default Signup;
