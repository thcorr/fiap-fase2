/** @type {import('next').NextConfig} */

const nextConfig = {
  async rewrites() {
    const loggedUrl = process.env.NEXT_PUBLIC_LOGGED_URL;

    if (!loggedUrl) {
      throw new Error(
        "NEXT_PUBLIC_LOGGED_URL is not defined in your environment file"
      );
    }

    return [
      {
        source: "/logged",
        destination: `${loggedUrl}/logged`,
      },
      {
        source: "/logged/:path*",
        destination: `${loggedUrl}/logged/:path*`,
      },
    ];
  },
};

export default nextConfig;
