// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-6">
      <h1 className="text-4xl font-bold">🌱 EcoSort+</h1>

      <p className="text-center max-w-xl text-gray-600">
        EcoSort+ helps users identify the correct way to dispose of waste items
        and encourages eco-friendly habits.
      </p>

      <Link
        href="/waste-classification"
        className="px-6 py-3 rounded-md bg-green-600 text-white hover:bg-green-700 transition"
      >
        Go to Waste Classification
      </Link>
    </main>
  );
}
