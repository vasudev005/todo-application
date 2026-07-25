import {
  Link,
  useNavigate,
  useLocation,
} from 'react-router-dom';

import {
  CreditCard,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

import { useEffect, useState } from 'react';

const plans = {
  Basic: '₹499',
  Premium: '₹999',
  Enterprise: '₹1999',
};

const PaymentPage = () => {

  const navigate = useNavigate();

  const location = useLocation();

  const [processing, setProcessing] =
    useState(false);

  const selectedPlan =
    location.state?.selectedPlan ||
    'Basic';

  const userData =
    location.state?.userData;

  // PROTECT PAGE
  useEffect(() => {

    if (!location.state) {
      navigate('/');
    }

  }, [location, navigate]);

  const handlePayment = () => {

    setProcessing(true);

    // DUMMY PAYMENT
    setTimeout(() => {

      navigate('/app/dashboard');

    }, 2000);
  };

  return (
    <div
      className="
        flex
        min-h-screen
        items-center
        justify-center

        px-4
        py-10
      "
    >

      <div
        className="
          glass-card
          w-full
          max-w-2xl

          p-8
        "
      >

        {/* BACK */}

        <Link
          to="/"
          className="
            text-sm
            font-semibold
            text-brand-600
          "
        >
          ← Back to Home
        </Link>

        {/* HEADER */}

        <div
          className="
            mt-6

            flex
            items-center
            gap-4
          "
        >

          <div
            className="
              rounded-2xl
              bg-brand-50

              p-4

              text-brand-600
            "
          >
            <CreditCard className="h-7 w-7" />
          </div>

          <div>

            <h1
              className="
                text-3xl
                font-black
                text-slate-900

                dark:text-white
              "
            >
              Complete Payment
            </h1>

            <p
              className="
                mt-1
                text-sm
                text-slate-500
              "
            >
              Finish your subscription setup
            </p>

          </div>

        </div>

        {/* PLAN */}

        <div
          className="
            mt-8

            rounded-3xl
            border
            border-white/40

            bg-white/70

            p-6

            shadow-soft

            dark:border-white/10
            dark:bg-slate-900/70
          "
        >

          <p
            className="
              text-sm
              font-semibold
              uppercase
              tracking-[0.2em]
              text-brand-600
            "
          >
            Selected Plan
          </p>

          <h2
            className="
              mt-3
              text-3xl
              font-black
              text-slate-900

              dark:text-white
            "
          >
            {selectedPlan}
          </h2>

          <p
            className="
              mt-3
              text-5xl
              font-black
              text-brand-600
            "
          >
            {plans[selectedPlan]}
          </p>

        </div>

        {/* ACCOUNT */}

        <div
          className="
            mt-6

            rounded-2xl
            bg-slate-50

            p-5

            dark:bg-slate-900/60
          "
        >

          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.2em]
              text-brand-600
            "
          >
            Registered Account
          </p>

          <p
            className="
              mt-3
              text-sm
              text-slate-700

              dark:text-slate-300
            "
          >
            {userData?.name}
          </p>

          <p
            className="
              mt-1
              text-sm
              text-slate-500
            "
          >
            {userData?.email}
          </p>

        </div>

        {/* PAYMENT FORM */}

        <div className="mt-8 space-y-4">

          <input
            type="text"
            placeholder="Card Holder Name"
            className="input-primary"
          />

          <input
            type="text"
            placeholder="Card Number"
            className="input-primary"
            
          />

          <div className="grid grid-cols-2 gap-4">

            <input
              type="text"
              placeholder="MM/YY"
              className="input-primary"
             
            />

            <input
              type="text"
              placeholder="CVV"
              className="input-primary"
             
            />

          </div>

        </div>

        {/* FEATURES */}

        <div className="mt-8 space-y-3">

          {[
            'Secure dummy payment flow',
            'Instant workspace activation',
            'Protected SaaS onboarding',
          ].map((item) => (

            <div
              key={item}
              className="
                flex
                items-center
                gap-3
              "
            >

              <CheckCircle2
                className="
                  h-5
                  w-5
                  text-green-500
                "
              />

              <span
                className="
                  text-sm
                  text-slate-600

                  dark:text-slate-300
                "
              >
                {item}
              </span>

            </div>
          ))}

        </div>

        {/* PAY BUTTON */}

        <button
          onClick={handlePayment}
          disabled={processing}
          className="
            btn-primary
            mt-10
            w-full
          "
        >

          {processing
            ? 'Processing Payment...'
            : `Pay ${plans[selectedPlan]}`}

        </button>

        {/* SECURITY */}

        <div
          className="
            mt-5

            flex
            items-center
            justify-center
            gap-2

            text-sm
            text-slate-500
          "
        >

          <ShieldCheck className="h-4 w-4" />

          Dummy secured payment

        </div>

      </div>

    </div>
  );
};

export default PaymentPage;