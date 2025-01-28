import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import logo from "../../../../public/images/justLogo.svg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';




const SignIn = () => {

  const { t, i18n } = useTranslation();
  const [next, setNext] = useState(0);
  const navigate = useNavigate();
  const [LangIsOpen, setLanguageIsOpen ] = useState(false);

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang)

  }

  const handleRegisterRoute = () => {
    navigate("/admin");
  }

  const toggleLanguage = () => {
    setLanguageIsOpen(!LangIsOpen);

  };


  return (
    <>
      <div className={`flex flex-col items-center justify-center min-h-screen bg-[#F0FFF8] px-4`}>
        <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg relative">
          <div className="flex justify-center mb-6">
            <img src={logo} alt="Logo" className="w-16" />
          </div>

          <div className="text-lg font-semibold text-gray-700 text-center mb-6">
            {t('signInPage.top.p')}
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
                    {t('signInPage.middle.emailLable')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder={t('signInPage.middle.emailPlaceholder')}
                    className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-[#219b53]"

                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium "
                  >
                    {t('signInPage.middle.passwordLable')}
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder={t('signInPage.middle.passwordPlaceholder')}

                    className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-[#219b53]"

                  />
                </div>

                <button
                  type="button"
                  className="w-full bg-[#F0FFF8] py-2 rounded-md font-semibold transition border-2"
                  onClick={handleRegisterRoute}
                >
                  {t('signInPage.middle.signIn')}

                </button>
              </form>

              <div className="flex  justify-between text-sm text-gray-500 mt-4">
                <a
                  className="hover:underline cursor-pointer px-5"
                  onClick={() => setNext((prevNext) => prevNext + 1)}
                >
                  {t('signInPage.bottom.forgotPassword')}

                </a>

                <div className="relative ">
                 
                  <button className="flex"
                    onClick={toggleLanguage}>
                    <i className={`fas fa-globe text-xl`}></i>
                  </button>
                 
                  {LangIsOpen && (
                    <ul className="absolute flex justify-between ml-[-100px]">
                     <li onClick={()=> handleLanguageChange("ur")} className="flex px-2 text-xs cursor-pointer">
                      PK
                    <img
                      src="https://flagcdn.com/w40/pk.png"
                      alt="Pakistan Flag"
                      className="w-4 h-4  mx-2 rounded-full"
                    />
                  </li>
                  <li onClick={()=> handleLanguageChange("en")} className="flex px-2 text-xs cursor-pointer">
                  US
                    <img
                      src="https://flagcdn.com/w40/us.png"
                      alt="USA Flag"
                      className="w-4 h-4  mx-2 rounded-full"
                      />
                  </li>
                  <li onClick={()=> handleLanguageChange("sp")} className="flex px-2 text-xs cursor-pointer">
                  ES
                    <img
                      src="https://flagcdn.com/w40/es.png"
                      alt="Spain Flag"
                      className="w-4 h-4  mx-2 rounded-full"
                    />
                  </li>
                    </ul>
                  )}

                </div>
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
