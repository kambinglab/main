import VerifyForm from "./verify-form";
import { auth } from "@utils/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (session) return redirect("/");
  return <VerifyForm />;
}
