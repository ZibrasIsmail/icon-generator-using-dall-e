import Stripe from "stripe";
import { env } from "~/env.mjs";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

const stripe = new Stripe(env.STRIPE_SECRET_KEY);

export const checkoutRouter = createTRPCRouter({
  createCheckoutSession: protectedProcedure.mutation(async ({ ctx }) => {
    return stripe.checkout.sessions.create({
      success_url: `${env.NEXTAUTH_URL}`,
      cancel_url: `${env.NEXTAUTH_URL}`,
      metadata: {
        userId: ctx.session.user.id,
      },
      payment_method_types: ["card", "us_bank_account"],
      line_items: [
        {
          price: "price_1PeG2PJHjue1LXd8InU8KIxg",
          quantity: 1,
        },
      ],
      mode: "payment",
    });
  }),
});
