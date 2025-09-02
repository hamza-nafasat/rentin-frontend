// import { subscriptionPlans } from '@/data/data';
// import { FaCheck } from 'react-icons/fa6';

// const SubscriptionPlan = () => {
//   return (
//     <section className="shadow-card rounded-xl bg-white px-5 py-6 md:px-[34px]">
//       <h4 className="text-center text-lg font-bold text-[#474445] md:text-3xl">The Right Plan for Your Business</h4>
//       <p className="mx-auto mt-2 max-w-[580px] text-center text-sm text-[#474445] md:text-base">
//         We have several powerful plans to showcase your business and get discovered as a creative entrepreneurs.
//         Everything you need.
//       </p>
//       <div className="mt-8 flex flex-col items-center justify-center gap-8 md:flex-row">
//         {subscriptionPlans.map((plan, index) => (
//           <div
//             key={index}
//             className={`shadow-card flex w-full flex-col justify-between rounded-lg p-5 md:max-w-[320px] ${
//               plan.name === 'Plus' ? 'bg-[#F2F5FA]' : 'bg-white'
//             }`}
//           >
//             <div>
//               <h3 className="mb-2 text-lg font-bold text-[#474445] md:text-2xl">{plan.name}</h3>
//               <p className="text-sm text-[#474445] md:text-base">{plan.description}</p>
//               {/* Plan Features */}
//               <ul className="my-8 space-y-2 md:my-[46px]">
//                 {plan.features.map((feature, idx) => (
//                   <li key={idx} className="flex items-center gap-3 text-sm text-[#474445] md:text-base">
//                     {/* Example check icon (optional). Replace or remove if not needed */}
//                     <FaCheck className="text-base text-[#505050]" />
//                     <span>{feature}</span>
//                   </li>
//                 ))}
//               </ul>
//               {plan.price === 'no-pricing' ? (
//                 <span></span>
//               ) : (
//                 <p className={`text-lg font-bold ${plan.buttonType === 'primary' ? 'text-primary' : 'text-[#474445]'}`}>
//                   <span className="text-xs">THB </span>
//                   {plan.price} <span className="text-xs font-normal">/month</span>
//                 </p>
//               )}
//               {plan.name === 'Plus' && <span className="text-sm text-[#505050] md:text-base">(Excl . VAT)</span>}
//             </div>

//             {/* Action Button */}
//             <button
//               className={`mt-6 w-full cursor-pointer rounded-lg py-2 text-lg font-medium text-white ${plan.buttonType === 'disabled' ? 'bg-textSecondary' : 'bg-primary'} `}
//             >
//               {plan.buttonText}
//             </button>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default SubscriptionPlan;

import { subscriptionPlans } from '@/data/data';
import { FaCheck } from 'react-icons/fa6';
import { useCreateSubscriptionMutation, useUnsubscribeMutation } from '@/features/stripe/stripeApi';
import { useState } from 'react';

const SubscriptionPlan = ({ userSubscription, productsData, productsLoading }) => {
  const [createSubscription] = useCreateSubscriptionMutation();
  const [unsubscribe] = useUnsubscribeMutation();
  const [loadingPlan, setLoadingPlan] = useState(null); // Track which plan is loading

  // Function to get price from Stripe products
  const getPriceForPlan = planName => {
    if (!productsData || !productsData.products) return null;

    const product = productsData.products.data.find(p => p.name.toLowerCase() === planName.toLowerCase());

    if (product && product.default_price) {
      // Convert from cents to regular currency
      return (product.default_price.unit_amount / 100).toFixed(0);
    }
    return null;
  };

  // Function to get price ID for subscription creation
  const getPriceIdForPlan = planName => {
    if (!productsData || !productsData.products) return null;

    const product = productsData.products.data.find(p => p.name.toLowerCase() === planName.toLowerCase());

    return product?.default_price?.id || null;
  };

  // Function to get button text and type based on subscription status
  const getButtonConfig = planName => {
    const currentSubscription = userSubscription?.name?.toLowerCase();
    const planNameLower = planName.toLowerCase();

    // Handle basic plan specifically
    if (planNameLower === 'basic') {
      if (currentSubscription === 'basic') {
        return { text: 'Subscribed', type: 'disabled' };
      } else {
        return { text: 'Free Plan', type: 'disabled' };
      }
    }

    // Handle paid plans (plus, portfolio)
    if (currentSubscription === planNameLower) {
      return { text: 'Unsubscribe', type: 'unsubscribe' }; // Changed from 'primary' to 'unsubscribe'
    } else {
      return { text: 'Subscribe', type: 'primary' };
    }
  };

  // Handle subscription action
  const handleSubscriptionAction = async planName => {
    const planNameLower = planName.toLowerCase();
    const currentSubscription = userSubscription?.name?.toLowerCase();

    if (planNameLower === 'basic') {
      return; // No action for basic plan
    }

    setLoadingPlan(planNameLower); // Set loading state for specific plan

    try {
      // If user is subscribed to this plan and it's not basic, show unsubscribe
      if (currentSubscription === planNameLower && planNameLower !== 'basic') {
        const result = await unsubscribe();
        if (result.data?.success) {
          // Optionally show success message or refresh the page
          window.location.reload();
        }
        return;
      }

      // Handle subscribe
      const priceId = getPriceIdForPlan(planName);
      if (priceId) {
        const result = await createSubscription({ priceId });
        if (result.data?.url) {
          window.location.href = result.data.url;
        }
      }
    } catch (error) {
      console.error('Subscription error:', error);
    } finally {
      setLoadingPlan(null); // Clear loading state
    }
  };

  if (productsLoading) {
    return <div>Loading subscription plans...</div>;
  }

  return (
    <section className="shadow-card rounded-xl bg-white px-5 py-6 md:px-[34px]">
      <h4 className="text-center text-lg font-bold text-[#474445] md:text-3xl">The Right Plan for Your Business</h4>
      <p className="mx-auto mt-2 max-w-[580px] text-center text-sm text-[#474445] md:text-base">
        We have several powerful plans to showcase your business and get discovered as a creative entrepreneurs.
        Everything you need.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-8 md:flex-row">
        {subscriptionPlans.map((plan, index) => {
          const stripePriceData = getPriceForPlan(plan.name);
          const buttonConfig = getButtonConfig(plan.name);
          const displayPrice = stripePriceData || plan.price;
          const isCurrentPlanLoading = loadingPlan === plan.name.toLowerCase();

          return (
            <div
              key={index}
              className={`shadow-card flex w-full flex-col justify-between rounded-lg p-5 md:max-w-[320px] ${
                plan.name === 'Plus' ? 'bg-[#F2F5FA]' : 'bg-white'
              }`}
            >
              <div>
                <h3 className="mb-2 text-lg font-bold text-[#474445] md:text-2xl">{plan.name}</h3>
                <p className="text-sm text-[#474445] md:text-base">{plan.description}</p>
                {/* Plan Features */}
                <ul className="my-8 space-y-2 md:my-[46px]">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-[#474445] md:text-base">
                      <FaCheck className="text-base text-[#505050]" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                {plan.name.toLowerCase() === 'basic' ? (
                  <p className="text-lg font-bold text-[#474445]">
                    <span className="text-xs">THB </span>0 <span className="text-xs font-normal">/month</span>
                  </p>
                ) : (
                  <p
                    className={`text-lg font-bold ${buttonConfig.type === 'primary' ? 'text-primary' : 'text-[#474445]'}`}
                  >
                    <span className="text-xs">THB </span>
                    {displayPrice} <span className="text-xs font-normal">/month</span>
                  </p>
                )}

                {(plan.name === 'Plus' || plan.name === 'Portfolio') && (
                  <span className="text-sm text-[#505050] md:text-base">(Excl . VAT)</span>
                )}
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleSubscriptionAction(plan.name)}
                disabled={buttonConfig.type === 'disabled' || isCurrentPlanLoading}
                className={`mt-6 w-full cursor-pointer rounded-lg py-2 text-lg font-medium text-white ${
                  buttonConfig.type === 'disabled'
                    ? 'bg-textSecondary cursor-not-allowed'
                    : buttonConfig.type === 'unsubscribe'
                      ? 'bg-red-500 hover:bg-red-600'
                      : 'bg-primary hover:bg-primary/90'
                } ${isCurrentPlanLoading ? 'cursor-not-allowed opacity-50' : ''}`}
              >
                {isCurrentPlanLoading
                  ? buttonConfig.text === 'Unsubscribe'
                    ? 'Unsubscribing...'
                    : 'Processing...'
                  : buttonConfig.text}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SubscriptionPlan;
