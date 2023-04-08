import { useState } from "react";

interface Props {}

const NavBar = ({}: Props) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <nav className="navbar has-shadow">
      <div className="container">
        <div className="navbar-brand">
          <h1 className="title ml-5 mt-3 is-family-code">
            Lotty <i className="fa fa-line-chart" aria-hidden="true"></i>
          </h1>
          <div
            className="navbar-burger"
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div className={`navbar-menu ${isNavOpen ? "is-active" : ""}`}>
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="field is-grouped">
                <p className="control">
                  <a
                    className="button"
                    target="_blank"
                    href="https://github.com"
                  >
                    <span className="icon">
                      <i className="fa fa-github"></i>
                    </span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
