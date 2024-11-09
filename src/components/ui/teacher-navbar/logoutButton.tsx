"use client";

import { FiLogOut } from "react-icons/fi";
import { createClient } from "@/components/database/supabaseInit";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const supabase = createClient();
  const router = useRouter();

  const handleLogout = async () => {
    // Add logout logic here
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    router.push("/");
    console.info("Logged out successfully!");
  };

  return (
    <button
      onClick={handleLogout}
      className="btn btn-ghost flex items-center hover:bg-primary-dark rounded-lg transition-colors"
    >
      <FiLogOut size={20} />
      <span className="font-bold hidden lg:flex">Logout</span>
    </button>
  );
}
