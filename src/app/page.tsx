import { Form } from "@/components/form";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prueba técnica ByteTravel",
  description: "...",
};
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center py-8 px-4 bg-gradient-to-br from-blue-100 to-white">
      <Image
        src="logo.svg"
        alt="Logo"
        width={300}
        height={150}
        className="mb-8"
      />
      <section className="w-full max-w-2xl">
        <Form />
      </section>
    </main>
  );
}
