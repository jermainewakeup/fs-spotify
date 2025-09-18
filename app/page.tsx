export default async function Home() {
    // Using dog.ceo API as placeholder data while testing fetch logic
  const response = await fetch("https://dog.ceo/api/breeds/image/random")
  const posts = await response.json()
  return (
      <main className="flex min-h-screen flex-col items-center justify-center w-full">
        <h1 className="text-3xl font-bold">Hey, fs-spotify!</h1>

        <div className="mt-8 flex flex-col items-center">
          <p className={"mb-2 text-lg"}>Rando doggo:</p>
          <img
            src={posts.message}
            alt={"random dog"}
            className="rounded-md max-w-xs shadow-md"
          />
        </div>
      </main>
  );
}
