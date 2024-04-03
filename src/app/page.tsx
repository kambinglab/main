import { auth } from "@utils/auth";
import Search from "./search";
import UserMenu from "./user-menu";

export default async function Home() {
  const session = await auth();
  console.log("🚀 ~ Home ~ session:", session);

  return (
    <main className="container mx-auto min-h-screen max-w-screen-md p-4 pt-8 flex flex-col gap-4">
      <div className="prose">
        <h1>GetMatil 💀💀💀</h1>
      </div>
      <div>Punya teman suka matil? Spill di sini aja WKWKWK</div>
      <UserMenu user={session?.user} />
      <Search />
    </main>
  );
}
