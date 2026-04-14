import "server-only";

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing environment variable: ${name}. Copy .env.example to .env.local and fill it in.`,
    );
  }
  return value;
}

function optional(name: string): string | undefined {
  const value = process.env[name];
  return value && value.length > 0 ? value : undefined;
}

export const env = {
  get wordpressUrl() {
    return required("WORDPRESS_URL").replace(/\/$/, "");
  },
  get wcConsumerKey() {
    return required("WC_CONSUMER_KEY");
  },
  get wcConsumerSecret() {
    return required("WC_CONSUMER_SECRET");
  },
  get wpAppUser() {
    return optional("WP_APP_USER");
  },
  get wpAppPassword() {
    return optional("WP_APP_PASSWORD");
  },
};
