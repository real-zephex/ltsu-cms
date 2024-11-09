import { createClient } from "@/components/database/supabaseServer";
import Admin from "@/components/ui/admin/page";
import { RawUserMetaData } from "@/types/user-information";

import { redirect } from "next/navigation";

const Dashboard = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/");
  }

  const user_metadata = data.user.user_metadata as RawUserMetaData;
  if (user_metadata.role && user_metadata.role != "admin") {
    redirect(`/${user_metadata.role}-dashboard`);
  }

  return (
    <main>
      <section className="container mx-auto pt-10">
        {/* Header Section */}
        <div className="w-full bg-base-100 rounded-lg p-2">
          <p className="text-2xl">
            Welcome{" "}
            <span className="font-bold bg-gradient-to-r from-sky-500 to-indigo-400 text-transparent bg-clip-text">
              {user_metadata.name || "Test User"}
            </span>
          </p>
          <p>Email: {data.user.email || "NA"}</p>
          <p>Access Level: {user_metadata.role || "admin"}</p>
        </div>

        <Admin />
      </section>
    </main>
  );
};

export default Dashboard;
