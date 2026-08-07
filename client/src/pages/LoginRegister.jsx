import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../redux/slice/authSlice";
import { toast } from "react-toastify";

function LoginRegister() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  // const loading = false;

  const isRegisterMode = location.pathname === "/register";

  const [signInForm, setSignInForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [signUpForm, setSignUpForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  async function handleSignIn(e) {
    e.preventDefault();

    try {
      const user = await dispatch(
        login({
          email: signInForm.email,
          password: signInForm.password,
        }),
      ).unwrap();

      toast.success(user.message);

      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(error);
    }
  }

  async function handleSignUp(e) {
    e.preventDefault();

    try {
      const user = await dispatch(register(signUpForm)).unwrap();

      toast.success(user.message);

      navigate("/");
    } catch (error) {
      toast.error(error);
    }
  }

  return (
    <div
      className="d-flex align-items-center justify-content-center bg-light py-5"
      style={{ minHeight: "calc(100vh - 200px)" }}
    >
      <div
        className="bg-white border rounded-3 shadow-sm p-4 p-md-5 w-100"
        style={{ maxWidth: 820 }}
      >
        <div className="row g-0 align-items-stretch">
          {!isRegisterMode ? (
            <>
              {/* Left: Login form */}
              <div className="col-12 col-md px-md-4">
                <h4 className="fw-bold text-center mb-4">Login</h4>

                {error && (
                  <p className="text-danger small text-center mb-3">{error}</p>
                )}

                <form onSubmit={handleSignIn}>
                  <label htmlFor="login-email" className="form-label small">
                    E-mail
                  </label>
                  <input
                    id="login-email"
                    type="email"
                    className="form-control border-danger-subtle mb-3"
                    value={signInForm.email}
                    onChange={(e) =>
                      setSignInForm({ ...signInForm, email: e.target.value })
                    }
                    required
                  />

                  <label htmlFor="login-password" className="form-label small">
                    Password
                  </label>
                  <input
                    id="login-password"
                    type="password"
                    className="form-control border-danger-subtle mb-3"
                    value={signInForm.password}
                    onChange={(e) =>
                      setSignInForm({ ...signInForm, password: e.target.value })
                    }
                    required
                  />

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="remember-me"
                        checked={signInForm.remember}
                        onChange={(e) =>
                          setSignInForm({
                            ...signInForm,
                            remember: e.target.checked,
                          })
                        }
                      />
                      <label
                        className="form-check-label small"
                        htmlFor="remember-me"
                      >
                        Remember me
                      </label>
                    </div>
                    <a
                      href="#"
                      className="small text-secondary text-decoration-none"
                    >
                      forgot your password?
                    </a>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-danger w-100 fw-bold"
                  >
                    {loading ? "LOGGING IN..." : "LOGIN"}
                  </button>
                </form>
              </div>

              {/* Divider: vertical on desktop, horizontal on mobile */}
              <div className="col-12 col-md-auto d-none d-md-flex justify-content-center px-3">
                <div className="vr" />
              </div>
              <hr className="d-md-none my-4" />

              {/* Right: Create account CTA */}
              <div className="col-12 col-md px-md-4 d-flex flex-column justify-content-center align-items-center text-center">
                <h4 className="fw-bold mb-4">Create your an account</h4>
                <p className="text-secondary small mb-5">
                  Create your customer account in just a few clicks!
                  <br />
                  You can register using your e-mail address
                </p>
                <Link to="/register" className="btn btn-danger fw-bold w-100">
                  CREATE AN ACCOUNT VIA E-MAIL
                </Link>
              </div>
            </>
          ) : (
            <>
              {/* Left: Register form */}
              <div className="col-12 col-md px-md-4">
                <h4 className="fw-bold text-center mb-4">Create Account</h4>

                {error && (
                  <p className="text-danger small text-center mb-3">{error}</p>
                )}

                <form onSubmit={handleSignUp}>
                  <label htmlFor="reg-name" className="form-label small">
                    Name
                  </label>
                  <input
                    id="reg-name"
                    type="text"
                    className="form-control border-danger-subtle mb-3"
                    value={signUpForm.name}
                    onChange={(e) =>
                      setSignUpForm({ ...signUpForm, name: e.target.value })
                    }
                    required
                  />

                  <label htmlFor="reg-email" className="form-label small">
                    E-mail
                  </label>
                  <input
                    id="reg-email"
                    type="email"
                    className="form-control border-danger-subtle mb-3"
                    value={signUpForm.email}
                    onChange={(e) =>
                      setSignUpForm({ ...signUpForm, email: e.target.value })
                    }
                    required
                  />

                  <label htmlFor="reg-password" className="form-label small">
                    Password
                  </label>
                  <input
                    id="reg-password"
                    type="password"
                    className="form-control border-danger-subtle mb-4"
                    value={signUpForm.password}
                    onChange={(e) =>
                      setSignUpForm({ ...signUpForm, password: e.target.value })
                    }
                    required
                    minLength={6}
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-danger w-100 fw-bold"
                  >
                    {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
                  </button>
                </form>
              </div>

              <div className="col-12 col-md-auto d-none d-md-flex justify-content-center px-3">
                <div className="vr" />
              </div>
              <hr className="d-md-none my-4" />

              {/* Right: Back to login CTA */}
              <div className="col-12 col-md px-md-4 d-flex flex-column justify-content-center align-items-center text-center">
                <h4 className="fw-bold mb-4">Welcome Back</h4>
                <p className="text-secondary small mb-5">
                  Already have an account?
                  <br />
                  Sign in to continue where you left off.
                </p>
                <Link to="/login" className="btn btn-danger fw-bold w-100">
                  LOGIN
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginRegister;
