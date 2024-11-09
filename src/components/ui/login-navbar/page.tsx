import Image from "next/image";
import Link from "next/link";

const NavbarLogin = async () => {
  return (
    <main className="flex flex-row items-center justify-between">
      <Image
        src={"/ltsu-login.svg"}
        width={500}
        height={200}
        alt="Logo"
      ></Image>
{/*   <div>
        <Link
          href={"/about"}
          className="text-transparent bg-gradient-to-r from-[#4ac29a] to-[#bdfff3] bg-clip-text text-xl font-bold"
        >
          About
        </Link>
      </div> */}
    </main>
  );
};

export default NavbarLogin;
