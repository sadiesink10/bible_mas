import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { BookOpen, LayoutDashboard, PlusCircle, MessageSquare, LogOut, Users, Settings } from "lucide-react";
import { signOut } from "@/auth";
import { ThemeToggle } from "@/components/theme-toggle";
import { DeleteAccountButton } from "@/components/delete-account-button";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Read Bible", href: "/bible", icon: BookOpen },
    { name: "Log Reading", href: "/log", icon: PlusCircle },
    { name: "Groups", href: "/groups", icon: Users },
    { name: "Mini Pastor", href: "/pastor", icon: MessageSquare },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-b from-[#f5f0e8] via-[#f8f7f4] to-[#eef3ed] dark:from-[#1a1d21] dark:via-[#1e2126] dark:to-[#1a1d21] overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-white/80 dark:bg-[#252830]/80 backdrop-blur-xl border-r border-[#e5dfd5] dark:border-[#363940] flex-col hidden md:flex">
        <div className="h-16 flex items-center justify-between px-5 border-b border-[#e5dfd5] dark:border-[#363940]">
          <div className="flex items-center gap-2.5">
            <div className="bg-gradient-to-br from-[#7c9a72] to-[#5e7d54] p-1.5 rounded-lg text-white shadow-md shadow-[#7c9a72]/15">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg tracking-tight text-[#3d3d3d] dark:text-white">ScriptureWalk</span>
          </div>
          <ThemeToggle />
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#6b6b6b] dark:text-[#b0ada5] hover:bg-[#eef3ed] dark:hover:bg-[#2d3038] transition-colors font-medium"
              >
                <Icon className="w-5 h-5 text-[#7c9a72]" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#e5dfd5] dark:border-[#363940] space-y-1">
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#a8c5a0] to-[#7c9a72] flex items-center justify-center text-white font-bold text-sm shadow-sm">
              {session.user.name?.[0]?.toUpperCase()}
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="truncate text-sm font-semibold text-[#4a4a4a] dark:text-white">{session.user.name}</span>
              <span className="truncate text-[10px] text-[#9a9a9a] dark:text-[#6b6860]">{session.user.email}</span>
            </div>
          </div>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-[#9a9a9a] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-sm font-medium">
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </form>
          <DeleteAccountButton />
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden h-14 border-b border-[#e5dfd5] dark:border-[#363940] bg-white/80 dark:bg-[#252830]/80 backdrop-blur-xl flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#7c9a72]" />
            <span className="font-bold text-sm text-[#3d3d3d] dark:text-white">ScriptureWalk</span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/settings"
              className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#eef3ed] dark:bg-[#363940] text-[#7c9a72]"
            >
              <Settings className="w-4 h-4" />
            </Link>
          </div>
        </header>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto w-full pb-20 md:pb-0">
          <div className="w-full max-w-5xl mx-auto">
            {children}
          </div>
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 border-t border-[#e5dfd5] dark:border-[#363940] bg-white/95 dark:bg-[#252830]/95 backdrop-blur-xl flex items-center justify-around px-1 z-50 safe-area-bottom">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex flex-col items-center justify-center w-full h-full text-[#9a9a9a] hover:text-[#7c9a72] active:text-[#5e7d54] space-y-0.5 transition-colors"
            >
              <Icon className="w-5 h-5" />
              <span className="text-[9px] font-semibold leading-tight">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
