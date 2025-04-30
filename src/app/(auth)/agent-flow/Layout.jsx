import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function AgentFlowLayout({ children }) {
  return (
    <div>
      <section className="h-full w-full bg-[url('/images/default/auth-bg.png')] bg-cover bg-bottom bg-no-repeat lg:h-screen">
        <section className="scroll-0 relative container mx-auto grid h-full grid-cols-1 gap-8 overflow-auto px-5 py-10 lg:gap-[60px] lg:py-[80px]">
          <div className="flex flex-col items-start justify-start">
            <div className="mb-8">
              <Image
                src="/images/default/white-logo.png"
                width={219}
                height={60}
                alt="logo"
                className="mx-auto h-auto w-[150px] lg:top-[80px] lg:w-[219px]"
              />
            </div>
            <div className="flex w-full items-center justify-center">{children}</div>
            <div className="mt-8 flex w-full items-center justify-center text-sm text-white lg:text-base">
              Already have an Account?{' '}
              <Link href="/login" className="text-primary font-semibold">
                Login
              </Link>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}

export default AgentFlowLayout;
