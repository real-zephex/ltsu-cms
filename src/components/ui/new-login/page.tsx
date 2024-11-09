import NavbarLogin from "../login-navbar/page";
import { login } from "../login/actions";

const NewLogin = async () => {
  return (
    <main
      className="h-screen w-screen select-none"
      style={{
        backgroundImage: 'url("/ltsu.jpg")',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <section className="h-full bg-gradient-to-r from-neutral-800 via-neutral-900/50 to-neutral-800/70 relative flex flex-col justify-center">
        {/* Navbar */}
        <div className="absolute top-4 right-0 p-4 w-full">
          <NavbarLogin />
        </div>

        {/* Centered Login Box */}
        <div className="p-8 rounded-lg shadow-lg">
          <h2 className="text-4xl font-bold text-stone-400">
            Welcome user <span className="text-blue-300">.</span>
          </h2>
          <p className="opacity-80 text-lg">Login with your credentials.</p>

          {/* Login Form */}
          <form className="mt-4 text-white" encType="multipart/formdata">
            <div>
              <p>E-mail</p>
              <input
                type="email"
                required
                name="email"
                placeholder="Enter your email"
                className="input input-bordered bg-black/20 w-80 mt-1"
                autoComplete="off"
              />
            </div>

            <div className="mt-2">
              <p>Password</p>
              <input
                type="password"
                required
                name="password"
                placeholder="Enter your password"
                className="input input-bordered bg-black/20 w-80 mt-1"
                autoComplete="off"
              />
            </div>

            <button
              className="btn btn-success btn-outline w-80 mt-4"
              type="submit"
              formAction={login}
            >
              Login
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default NewLogin;
