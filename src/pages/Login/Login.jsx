import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "../../assets/Icons/GoogleIcon";
import { userStore } from "../../store/userStore";
import Spinner from "../../components/Spinners/Spinner";
import { getData } from "../../services/getData";

const Login = () => {
  const navigate = useNavigate();
  const { setToken, setUser } = userStore();
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = () => {
    // Redirige a la URL de Google para iniciar sesión
    window.location.href = "https://central.logotexo.com/smartpr/login";
  };

  const fetchUserByEmail = async (email, token) => {
    setLoading(true);
    try {
      const baseUrl = import.meta.env.VITE_REACT_APP_URL_BASE;
      const usersEndpoint = `${baseUrl}/Employee/ByEmail/${email}`;
      const usersData = await getData(usersEndpoint, token);
      await setUser(usersData);
      navigate("/planeacion");
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getQueryParams = async () => {
    const queryParams = new URLSearchParams(window.location.search);
    const email = await queryParams.get("email");
    const authToken = await queryParams.get("authToken");

    if (email && authToken) {
      await setToken(authToken);
      await fetchUserByEmail(email, authToken);
    }
  };

  useEffect(() => {
    getQueryParams();
  }, []);

  return (
    <div className="min-w-full min-h-full flex justify-center items-center">
      {loading ? (
        <Spinner design="w-12 h-12" />
      ) : (
        <div className="w-1/2 h-1/2 flex flex-col items-center justify-center gap-6 shadow-lg p-6">
          <h2 className="text-3xl text-primary-red-500 font-semibold">Login</h2>

          <button
            onClick={handleGoogleLogin}
            className="px-6 py-2 shadow-3xl rounded-lg hover:scale-105 transition-all"
          >
            <GoogleIcon className={"w-8 h-8"} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
