import CardGenerator from "./CardGenerator";

const LoginPage = async () => {
  return (
    <main className="h-screen w-screen relative">
      <div className="w-full h-1/2 bg-white"></div>
      <div className="w-full h-1/2 bg-black"></div>
      <section className="z-50 absolute top-0 h-full flex flex-col lg:flex-row items-center justify-center w-full">
        <CardGenerator type="Student" logo="st" />
        <CardGenerator type="Teacher" logo="te" />
      </section>
    </main>
  );
};

export default LoginPage;
