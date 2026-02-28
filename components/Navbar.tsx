import { Box } from "lucide-react";
import Button from "./ui/Button";
import { useOutletContext } from "react-router";

const Navbar = () => {
  const { isSignedIn, username, signIn, signOut } =
    useOutletContext<AuthContext>();

  const handleAuthClick = async () => {
    if (isSignedIn) {
      try {
        await signOut();
      } catch (e) {
        console.error("Error signing out:", e);
      }
      return;
    }
    try {
      await signIn();
    } catch (e) {
      console.error("Error signing in:", e);
    }
  };

  return (
    <header className="navbar">
      <nav className="inner">
        <div className="left">
          <Box className="logo" />
          <span className="name">Roomify</span>

          <ul className="links">
            <a href="">Products</a>
            <a href="">Pricing</a>
            <a href="">Community</a>
            <a href="">Enterprise</a>
          </ul>
        </div>
        <div className="actions">
          {isSignedIn ? (
            <>
              <span className="username">
                {username ? `Hi, ${username}` : "Signed in"}
              </span>
              <Button size="sm" onClick={handleAuthClick} className="btn">
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={handleAuthClick}>
                Log In
              </Button>
              <a href="#upload" className="cta">
                Get Started
              </a>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
