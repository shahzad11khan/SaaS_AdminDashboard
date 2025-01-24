import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import logo from "../../../../public/images/justLogo.svg";
import { useNavigate } from "react-router-dom";



const SignIn = () => {
    

  const [next, setNext] = useState(0);
  const navigate = useNavigate();

  const handleRegisterRoute = () => {
    navigate("/admin");
  };


  return (
    <>
      <div className={`flex flex-col items-center justify-center min-h-screen bg-[#F0FFF8] px-4`}>
        <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg relative">
          <div className="flex justify-center mb-6">
            <img src={logo} alt="Logo" className="w-16" />
          </div>

          <div className="text-lg font-semibold text-gray-700 text-center mb-6">
            Welcome to Deelly!
          </div>

          {next === 0 ? (
            <>

              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col gap-4"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium "
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-[#219b53]"
                    // required
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium "
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-[#219b53]"
                    // required
                  />
                </div>

                <button
      type="button"
      className="w-full bg-[#F0FFF8] py-2 rounded-md font-semibold transition border-2"
      onClick={handleRegisterRoute}
    >
      Sign In
    </button>
              </form>

              <div className="flex justify-between text-sm text-gray-500 mt-4">
                <a
                  className="hover:underline cursor-pointer"
                  onClick={() => setNext((prevNext) => prevNext + 1)}
                >
                  Forgot Password?
                </a>

              </div>
            </>
          ) : next === 1 ? (
            <>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col gap-4"
              >
                <FontAwesomeIcon
                  icon={faTimes}
                  className="absolute top-2 right-2 text-xl cursor-pointer"
                  onClick={() => setNext(0)}
                />
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium "
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-[#219b53]"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#F0FFF8]  py-2 rounded-md font-semibold transition border-2"
                  onClick={() => setNext((prevNext) => prevNext + 1)}
                >
                  Verify Email
                </button>
              </form>


            </>
          ) : next === 2 ? (
            <>
              <FontAwesomeIcon
                icon={faTimes}
                className="absolute top-2 right-2 text-xl cursor-pointer"
                onClick={() => setNext(0)}
              />
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col gap-4"
              >
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium "
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter password"
                    className="w-full mt-1 px-4 py-2 border  rounded-md hov focus:outline-none focus:ring focus:ring-[#219b53]"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium "
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-[#219b53]"
                    required
                  />
                </div>


                <button

                  className="w-full bg-[#F0FFF8]  py-2 rounded-md font-semibold transition border-2"
                  onClick={() => setNext(0)}
                >
                  Reset Password
                </button>

              </form>
            </>

          ) : null}
        </div>
      </div>
    </>
  );
};

export default SignIn;
