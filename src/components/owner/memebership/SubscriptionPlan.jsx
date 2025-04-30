import { subscriptionPlans } from '@/data/data';
import { FaCheck } from 'react-icons/fa6';

const SubscriptionPlan = () => {
  return (
    <section className="shadow-custom rounded-xl bg-white px-5 py-6 md:px-[34px]">
      <h4 className="text-center text-lg font-bold text-[#474445] md:text-3xl">
        The Right Plan for Your Business
      </h4>
      <p className="mx-auto mt-2 max-w-[580px] text-center text-sm text-[#474445] md:text-base">
        We have several powerful plans to showcase your business and get discovered as a creative
        entrepreneurs. Everything you need.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-8 md:flex-row">
        {subscriptionPlans.map((plan, index) => (
          <div
            key={index}
            className={`shadow-custom flex w-full flex-col justify-between rounded-lg p-5 md:max-w-[320px] ${
              plan.name === 'Plus' ? 'bg-[#F2F5FA]' : 'bg-white'
            }`}
          >
            <div>
              <h3 className="mb-2 text-lg font-bold text-[#474445] md:text-2xl">{plan.name}</h3>
              <p className="text-sm text-[#474445] md:text-base">{plan.description}</p>
              {/* Plan Features */}
              <ul className="my-8 space-y-2 md:my-[46px]">
                {plan.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 text-sm text-[#474445] md:text-base"
                  >
                    {/* Example check icon (optional). Replace or remove if not needed */}
                    <FaCheck className="text-base text-[#505050]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              {plan.price === 'no-pricing' ? (
                <span></span>
              ) : (
                <p
                  className={`text-lg font-semibold ${
                    plan.buttonType === 'primary' ? 'text-[#E35454]' : 'text-[#474445]'
                  }`}
                >
                  <span className="text-xs">THB </span>
                  {plan.price} <span className="text-xs font-normal">/month</span>
                </p>
              )}
              {plan.name === 'Plus' && (
                <span className="text-sm text-[#505050] md:text-base">(Excl . VAT)</span>
              )}
            </div>

            {/* Action Button */}
            <button
              className={`mt-6 w-full cursor-pointer rounded-lg py-2 text-lg font-medium text-white ${plan.buttonType === 'disabled' ? 'bg-[#969696]' : 'bg-primary'} `}
            >
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SubscriptionPlan;
