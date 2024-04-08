import { auth } from "@utils/auth";
import Search from "./search";
import UserMenu from "./user-menu";

export default async function Home() {
  const session = await auth();

  return (
    <main className="container mx-auto min-h-screen max-w-screen-md p-4 pt-8 flex flex-col gap-4">
      <div className="prose">
        <h1>UI Baku Hantam 😈</h1>
      </div>
      <div></div>
      <UserMenu user={session?.user} />
      <Search />
    </main>
  );
}
