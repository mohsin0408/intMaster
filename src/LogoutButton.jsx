import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("User logged out");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
