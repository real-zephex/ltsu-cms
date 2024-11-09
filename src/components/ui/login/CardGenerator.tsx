import { login } from "@/components/ui/login/actions";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaGoogleScholar } from "react-icons/fa6";

const CardGenerator = async ({
  type,
  logo,
}: {
  type: string;
  logo: string;
}) => {
  return (
    <section className="p-4 bg-white mt-4 lg:mx-4 rounded-md border-gray-200 border-2   ">
      <div className="flex flex-row items-center">
        {logo === "st" ? (
          <FaGoogleScholar color="black" size={34} className="mr-2" />
        ) : (
          <FaChalkboardTeacher color="black" size={34} className="mr-2" />
        )}
        <h2 className="text-white mix-blend-difference text-xl lg:text-3xl">
          {type} Login
        </h2>
      </div>
      <p>
        Access your <span className="lowercase">{type}</span> portal
      </p>

      <form encType="multipart/formdata" className="pt-4 text-black">
        <label className="input flex items-center gap-2 bg-gray-300 w-96 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            type="email"
            className="grow"
            placeholder="Email"
            name="email"
            required
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 mt-2 bg-gray-300 w-96">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            className="grow"
            placeholder="Password"
            name="password"
            required
          />
        </label>
        <button
          formAction={login}
          className="btn w-96 btn-success btn-outline mt-2"
        >
          Login
        </button>
      </form>
    </section>
  );
};

export default CardGenerator;
