// @ts-check

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  /**
   * If you have the "experimental: { appDir: true }" setting enabled, then you
   * must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  // https://replicate.delivery/yhqm/2zjRHQ0qMhYtL5Cnmz3NNb18zCjFOCCIqZ2x3ilBd1MKrayE/R8_SD3_00001_.webp
  images: {
    domains: ["replicate.delivery", "res.cloudinary.com"],
  },
};
export default config;
