import AgentAside from '../agent/AgentAside';
import AgentHeader from '../agent/AgentHeader';

function AgentDashboardLayout({ children }) {
  return (
    <section className="grid h-screen w-screen place-items-center overflow-hidden bg-[#3582e715]">
      <section className="flex h-[calc(100vh-16px)] w-[calc(100vw-16px)] gap-6">
        <AgentAside />
        <div className="w-full flex-1">
          <AgentHeader />
          <main className="scroll-0 mt-[14px] h-[calc(100vh-180px)] overflow-x-hidden overflow-y-scroll xl:h-[calc(100vh-104px)]">
            {children}
          </main>
        </div>
      </section>
    </section>
  );
}

export default AgentDashboardLayout;
