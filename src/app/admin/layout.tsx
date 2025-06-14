import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";


const layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user || user.email !== "skmohammedarshad333@gmail.com") {
    return redirect("/");
  }
  return <div className="w-full max-w-6xl mx-auto">{children}</div>;
};

export default layout;
