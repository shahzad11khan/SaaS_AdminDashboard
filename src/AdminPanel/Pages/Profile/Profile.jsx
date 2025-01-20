import picture from "../../../../public/images/kashifppp.jpg";
import Navbar from "../../Navbar/Navbar";

const Profile = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center  min-h-screen bg-[#F0FFF8] px-4">
        <div className="w-full md:w-[450px] lg:w-[600px] bg-white p-6 rounded-lg shadow-lg mt-5">
          <div className="flex flex-col gap-5 items-center">
            <div className="text-lg font-semibold text-gray-700 w-full text-start">
              Profile
            </div>

            <div className="relative w-[150px] h-[150px] border-2 border-gray-300 rounded-full flex items-center justify-center">
              <label
                htmlFor="file-input"
                className="h-full w-full cursor-pointer rounded-full flex items-center justify-center"
              >
                <img
                  className="h-full w-full rounded-full object-cover"
                  src={picture}
                  alt="Profile"
                />
              </label>
              <input
                id="file-input"
                type="file"
                className="hidden"
              />
            </div>

            <form className="flex flex-col gap-4 w-full">
         
         <div className="flex flex-col lg:flex-row lg:justify-between  gap-3" >
         <div className="w-full lg:w-1/2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-600"
                >
                  User Name
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter your user name"
                  className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-[#219b53]"
                  required
                />
              </div>
            
              <div className="w-full lg:w-1/2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-600"
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

         </div>
         <div className="flex flex-col lg:flex-row lg:justify-between gap-3">
         <div className="w-full lg:w-1/2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-600"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-[#219b53]"
                  required
                />
              </div>

              <div className="w-full lg:w-1/2">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-600"
                >
                 Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-[#219b53]"
                  required
                />
              </div>
              </div>

              <button
                type="submit"
                className="mx-auto w-1/2 bg-[#219b53] text-white py-2 rounded-md font-semibold hover:bg-green-700 transition"
              >
              Update
              </button>
            </form>

          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
