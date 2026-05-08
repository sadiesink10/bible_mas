import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { LogOut, User, Shield } from "lucide-react";
import { DeleteAccountButton } from "@/components/delete-account-button";

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-[#3d3d3d] dark:text-white mb-6">Settings</h1>

      {/* Profile Section */}
      <div className="bg-white dark:bg-[#252830] border border-[#e5dfd5] dark:border-[#363940] rounded-2xl p-5 mb-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#a8c5a0] to-[#7c9a72] flex items-center justify-center text-white font-bold text-xl shadow-sm">
            {session.user.name?.[0]?.toUpperCase()}
          </div>
          <div>
            <h2 className="font-bold text-[#3d3d3d] dark:text-white">{session.user.name}</h2>
            <p className="text-sm text-[#7a7a7a] dark:text-[#9e9b93]">{session.user.email}</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-white dark:bg-[#252830] border border-[#e5dfd5] dark:border-[#363940] rounded-2xl overflow-hidden">
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button className="w-full flex items-center gap-3 px-5 py-4 text-[#6b6b6b] dark:text-[#b0ada5] hover:bg-[#eef3ed] dark:hover:bg-[#2d3038] transition-colors text-sm font-medium border-b border-[#e5dfd5] dark:border-[#363940]">
            <LogOut className="w-5 h-5 text-[#7c9a72]" />
            Sign Out
          </button>
        </form>
        <div className="px-5 py-4">
          <p className="text-xs text-[#9a9a9a] mb-3 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5" />
            Danger Zone
          </p>
          <DeleteAccountButton />
        </div>
      </div>
    </div>
  );
}
