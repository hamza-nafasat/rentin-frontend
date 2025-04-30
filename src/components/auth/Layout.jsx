import Image from 'next/image';
import 'react-phone-input-2/lib/style.css';

const Layout = ({ title, secondTitle, thirdTitle, children }) => {
  return (
    <section className="h-full w-full bg-[url('/images/default/auth-bg.png')] bg-cover bg-bottom bg-no-repeat lg:h-screen">
      <section className="scroll-0 relative container mx-auto grid h-full grid-cols-1 gap-8 overflow-auto px-5 py-10 lg:grid-cols-2 lg:gap-[60px] lg:py-[80px]">
        {/* logo */}
        <Image
          src="/images/default/white-logo.png"
          width={219}
          height={60}
          alt="logo"
          className="mx-auto h-auto w-[150px] lg:absolute lg:top-[80px] lg:left-5 lg:w-[219px]"
        />
        <div className="flex flex-col justify-center">
          <Title title={title} />
          <SecondTitle title={secondTitle} />
          <ThirdTitle title={thirdTitle} />
        </div>
        <div className="flex items-center">{children}</div>
      </section>
    </section>
  );
};

export default Layout;

const Title = ({ title }) => (
  <h1 className="text-center text-3xl font-bold text-white lg:text-left lg:text-4xl">{title}</h1>
);

const SecondTitle = ({ title }) => (
  <h6 className="mt-3 hidden text-lg font-semibold text-white lg:block lg:text-xl">{title}</h6>
);

const ThirdTitle = ({ title }) => (
  <h6 className="mt-3 text-center text-sm font-medium text-white lg:text-left lg:text-lg">
    {title}
  </h6>
);
