import {dogImage} from "@/app/dogs";

export default async function Home() {
  return (
      <main className="flex min-h-screen flex-col items-center justify-center w-full">
        <h1 className="text-3xl font-bold">Hey, fs-spotify!</h1>

        <div className="mt-8 flex flex-col items-center">
          <p className={"mb-2 text-lg"}>Rando doggo:</p>
          <img
            src={await dogImage()}
            alt={"random dog"}
            className="rounded-md max-w-xs shadow-md"
          />
        </div>
      </main>
  );
}
