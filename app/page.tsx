import Image from "next/image";

export default function Home() {
  return (
      <main className="flex min-h-screen flex-col items-center justify-center w-full">
        <h1 className="text-3xl font-bold">Hey, fs-spotify!</h1>
        <button className="mt-6 rounded-md text-white bg-red-600 hover px-2 py-4">
          dont press me
        </button>
      </main>
  );
}
