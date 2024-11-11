import { useState, useEffect } from "react";
import { useAuth } from "../../providers/AuthProvider";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { AUTH_STEPS } from "../../constants/auth";
import LoginForm from "../../components/auth/LoginForm";
import Loader from "../../components/Loader/Loader";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useTheme } from "../../providers/ThemeProvider";
import DarkModeToggle from "../../components/common/DarkModeToggle";
import { getFirebaseErrorMessage } from "../../utils/firebaseErrors";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
    termsAccepted: false,
  });
  const [currentStep, setCurrentStep] = useState(AUTH_STEPS.INITIAL);
  const { login, googleSignIn, completeProfileStep, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const step = params.get("step");
    if (step && Object.values(AUTH_STEPS).includes(step)) {
      setCurrentStep(step);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const idToken = await userCredential.user.getIdToken();

      await login(idToken);
    } catch (error) {
      const errorMessage = getFirebaseErrorMessage(error.code);
      Swal.fire("Error", errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      await googleSignIn({
        idToken,
      });
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${theme.background} ${theme.text}`}
    >
      <div
        className={`w-full max-w-md ${theme.cardBackground} rounded-lg shadow-xl p-8`}
      >
        {currentStep === AUTH_STEPS.INITIAL && (
          <LoginForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            loading={loading}
            theme={theme}
            onGoogleSignIn={handleGoogleSignIn}
          />
        )}
      </div>

      <DarkModeToggle isDark={isDark} onToggle={toggleTheme} theme={theme} />
    </motion.div>
  );
};

export default Login;
