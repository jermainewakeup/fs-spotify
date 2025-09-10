export default async function Home() {
  const data = await fetch("https://dog.ceo/api/breeds/image/random")
  const posts = await data.json()
  return (
      <main className="flex min-h-screen flex-col items-center justify-center w-full">
        <h1 className="text-3xl font-bold">Hey, fs-spotify!</h1>
        <button onClick={() => alert("YOU PRESSED IT")}
                className="mt-6 rounded-md text-white bg-red-600 hover px-2 py-4">
          dont press me
        </button>
        <div className="mt-8">
          <p className={"mb-2 text-lg"}>Rando doggo:</p>
          <img
            src={data.message}
            alt={"random dog"}
            className="rounded-md text-white bg-red-600 hover px-2 py-4" />
        </div>

      </main>
  );
}
