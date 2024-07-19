// create tRPC router for generate image

import { TRPCError } from "@trpc/server";
import Replicate from "replicate";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

async function generateIcon(prompt: string) {
  if (process.env.NODE_ENV !== "production") {
    return "https://replicate.delivery/pbxt/LI5VAhU2v3jNTjuE76GMTzikT1XMiUoRSznZdXR0cAnK1XJS/ComfyUI_00362_.png";
  }
  const image = (await replicate.run("stability-ai/stable-diffusion-3", {
    input: {
      prompt: prompt,
      aspect_ratio: "3:2",
      output_format: "png",
    },
  })) as string[];

  return image[0];
}

export const generateRouter = createTRPCRouter({
  generateIcon: protectedProcedure
    .input(
      z.object({
        prompt: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const results = await ctx.prisma.user.updateMany({
        where: {
          id: ctx.session?.user.id,
          credits: {
            gte: 1,
          },
        },
        data: {
          credits: {
            decrement: 1,
          },
        },
      });
      if (results.count === 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You don't have enough credits",
        });
      }
      const image = await generateIcon(input.prompt);

      if (!image) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Image not generated",
        });
      }

      const icon = await ctx.prisma.icon.create({
        data: {
          prompt: input.prompt,
          userId: ctx.session?.user.id,
        },
      });

      const uploadResult = await cloudinary.uploader.upload(image, {
        // upload_preset: process.env.NEXT_PUBLIC_UPLOAD_PRESET,
        resource_type: "image",
        folder: "icons-generator",
        name: `icon-${icon.id}`,
        public_id: `icon-${icon.id}`,
      });

      return {
        message: "success",
        image: image,
        url: uploadResult.url,
      };
    }),
});
