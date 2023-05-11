import logo from "../assets/logo.png";

const NavBar = () => {
  return (
    <nav className="w-full flex justify-center items-center p-4">
      <img src={logo} alt="logo" className="w-32 cursor-pointer" />
    </nav>
  );
};

export default NavBar;
