import { loadStripe } from "@stripe/stripe-js";
import { env } from "~/env.mjs";
import { api } from "~/utils/api";

const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_KEY);

export default function useBuyCredits() {
  const checkout = api.checkout.createCheckoutSession.useMutation();

  return {
    buyCredits: async () => {
      const response = await checkout.mutateAsync();
      const stripe = await stripePromise;
      await stripe?.redirectToCheckout({ sessionId: response.id });
    },
  };
}
