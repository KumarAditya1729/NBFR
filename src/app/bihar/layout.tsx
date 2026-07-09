import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Discover Bihar | Nav Bihar Renaissance Foundation",
  description: "Explore the rich history, biodiversity, agriculture, and socio-economic data of Bihar.",
};

export default function BiharLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
