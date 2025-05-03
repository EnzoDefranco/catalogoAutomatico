/** @type {import('next').NextConfig} */
const nextConfig = {
    redirects: async () => {
        return [
            {
                source: "/",
                destination: "/Catalogo",
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
