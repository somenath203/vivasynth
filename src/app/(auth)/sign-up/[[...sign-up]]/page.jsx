import { SignUp } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Page() {

  const { isAuthenticated } = await auth();

  if (isAuthenticated) {

    redirect("/dashboard");
    
  }

  return <SignUp />
}
