import EarningsChart from '@/components/owner/payments/EarningsChart';
import PaymentOverview from '@/components/owner/payments/PaymentOverview';
import PaymentTransactionHistory from '@/components/owner/payments/PaymentTransactionHistory';
import Sales from '@/components/owner/payments/Sales';
import Stripe from '@/components/owner/payments/Stripe';
import TenantPayment from '@/components/owner/payments/TenantPayment';
import TransactionHistory from '@/components/owner/payments/TransactionHistory';

const Payments = () => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-textColor text-lg font-semibold md:text-[22px]">Transactions Details</h3>
      <div className="grid w-full grid-cols-12 gap-4">
        <div className="col-span-12 rounded-md bg-white lg:col-span-7">
          <EarningsChart />
        </div>
        <div className="col-span-12 rounded-md bg-white lg:col-span-5">
          <Stripe />
        </div>
      </div>
      <div className="grid w-full grid-cols-12 gap-4">
        <div className="col-span-12 rounded-md bg-white md:col-span-6 lg:col-span-3">
          <PaymentOverview />
        </div>
        <div className="col-span-12 rounded-md bg-white md:col-span-6 lg:col-span-3">
          <TransactionHistory />
        </div>
        <div className="col-span-12 rounded-md bg-white md:col-span-6 lg:col-span-3">
          <Sales />
        </div>
        <div className="col-span-12 rounded-md bg-white md:col-span-6 lg:col-span-3">
          <TenantPayment />
        </div>
      </div>
      <div className="grid w-full grid-cols-1">
        <div className="rounded-md bg-white">
          <PaymentTransactionHistory />
        </div>
      </div>
    </div>
  );
};

export default Payments;
