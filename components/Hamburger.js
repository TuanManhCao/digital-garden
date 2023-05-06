export default function Hamburger() {
  const onHamburgurToggle = () => {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-bar");
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  }
  return (
    <div className="hamburger" onClick={onHamburgurToggle}>
      <span className="bar"></span>
      <span className="bar"></span>
      <span className="bar"></span>
    </div>
  );
}