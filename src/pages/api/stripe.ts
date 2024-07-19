import { buffer } from "micro";
import { type NextApiRequest, type NextApiResponse } from "next";
import Stripe from "stripe";
import { env } from "~/env.mjs";
import { prisma } from "~/server/db";

const stripe = new Stripe(env.STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" });

export const config = {
  api: {
    bodyParser: false,
  },
};

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.method);

  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"] as string;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, env.WEBHOOK_SECRET);
    } catch (err) {
      if (err instanceof Error) {
        console.log("err", err);
        res.status(400).send(`Webhook Error: ${err.message}`);
      }
      return;
    }

    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object;
        const userId = session.metadata?.userId;
        if (typeof userId === "string") {
          await prisma.user.update({
            where: {
              id: userId,
            },
            data: {
              credits: {
                increment: 100,
              },
            },
          });
        }
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    res.json({ received: true });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method ?? "Unknown"} Not Allowed`);
  }
};

export default webhookHandler;
