import Link from "react-router-dom" ;


function Navbar(navLinks, employeeName) {
  return (
      <nav className="w-[35dvw] h-full flex flex-col p-3 gap-3">
          <p>Welcome { employeeName }!</p>
          <ul className="h-[60dvh] flex flex-col justify-around gap-3">
              {navLinks.map((element) => (
                  <li key={element} className="p-3 border-2 rounded-md border-color-black">
                      <Link to={navLinks.section}>{navLinks.element}</Link>
                  </li>)
                )
              }
          </ul>
      </nav>
  );
}

export default Navbar;