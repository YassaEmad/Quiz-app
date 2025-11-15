import logo from "../../public/pngwing.com.png";
function Header() {
  return (
    <header className="app-header">
      <img src={logo} alt="React logo" />
      <h1>Mechatronics Quizzes</h1>
    </header>
  );
}

export default Header;
