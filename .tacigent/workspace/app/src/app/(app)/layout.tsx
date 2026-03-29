import { AppShell } from "@/components/app-shell";
import { requireServerSession } from "@/lib/auth";

export default async function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await requireServerSession();

  return <AppShell userLabel={session.user.email}>{children}</AppShell>;
}
