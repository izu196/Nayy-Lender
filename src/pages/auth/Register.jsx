import { useState } from "react";
import { useAuth } from "../../providers/AuthProvider";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { AUTH_STEPS } from "../../constants/auth";

import RegistrationForm from "../../components/auth/RegistrationForm";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useTheme } from "../../providers/ThemeProvider";
import DarkModeToggle from "../../components/common/DarkModeToggle";
import GoogleSignInButton from "../../components/common/GoogleSignInButton";

const Register = () => {
  const [authStep, setAuthStep] = useState(AUTH_STEPS.INITIAL);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });
  const [loading, setLoading] = useState(false);
  const { register, googleSignIn } = useAuth();
  const { theme, isDark, toggleTheme } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      Swal.fire("Error", "Passwords do not match", "error");
      setLoading(false);
      return;
    }

    try {
      let newFormData = {};
      newFormData = { email: formData.email, password: formData.password };
      await register(newFormData);
    } catch (error) {
      Swal.fire("Error", error, "error");
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${theme.background} ${theme.text}`}
    >
      {authStep === AUTH_STEPS.INITIAL && (
        <div
          className={`max-w-md w-full space-y-8 ${theme.cardBackground} rounded-lg shadow-xl p-8`}
        >
          <div>
            <h2
              className={`mt-6 text-center text-3xl font-extrabold ${theme.headingText}`}
            >
              Create your account
            </h2>
            <p className={`mt-2 text-center text-sm ${theme.mutedText}`}>
              Or{" "}
              <Link
                to="/login"
                className={`font-medium ${theme.link} ${theme.linkHover}`}
              >
                sign in to your account
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <RegistrationForm
              formData={formData}
              setFormData={setFormData}
              loading={loading}
              theme={theme}
            />
            <div className="space-y-4">
              <button
                type="submit"
                disabled={loading}
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${theme.primaryButton} ${theme.primaryButtonHover} transition-colors duration-200`}
              >
                {loading ? "Creating Account..." : "Sign Up"}
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className={`w-full border-t ${theme.divider}`} />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span
                    className={`px-2 ${theme.cardBackground} ${theme.mutedText}`}
                  >
                    Or continue with
                  </span>
                </div>
              </div>

              <GoogleSignInButton
                onClick={handleGoogleSignIn}
                loading={loading}
                theme={theme}
              />
            </div>
          </form>
        </div>
      )}

      <DarkModeToggle isDark={isDark} onToggle={toggleTheme} theme={theme} />
    </motion.div>
  );
};

export default Register;
