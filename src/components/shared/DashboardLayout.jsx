import Aside from '../owner/Aside';
import Header from '../owner/Header';

const DashboardLayout = ({ children }) => {
  return (
    <section className="grid h-full w-full place-items-center overflow-hidden bg-transparent p-2">
      <section className="flex h-full w-full gap-6">
        <Aside />
        <div className="w-full flex-1">
          <Header />
          <main className="main scroll-0 overflow-x-hidden overflow-y-scroll">{children}</main>
        </div>
      </section>
    </section>
  );
};

export default DashboardLayout;
