import { Link } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import { reorderThreeOutline } from "ionicons/icons";
import { useState } from "react";
const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 z-20 w-full bg-white border-b border-gray-200 dark:bg-gray-900 start-0 dark:border-gray-600">
  <div className="flex flex-wrap items-center justify-between p-0">
        <Link
          className="block px-3 py-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
          to="/home"
        >
          Home
        </Link>
        <div className="flex items-center md:order-2 md:space-x-0 rtl:space-x-reverse">
          <button className="px-8 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg w-30 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Sign in
          </button>
          {/* Mobile size responsiveness */}
          {/* Mobile size responsiveness */}
          <div className="flex items-center md:hidden">
            <IonIcon
              className="ml-3 text-3xl bg-gray-700 rounded-md cursor-pointer h-17 hover:bg-gray-800"
              style={{ color: "#9CA3AF" }}
              icon={reorderThreeOutline}
              onClick={toggleMobileMenu}
            />
          </div>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
          <ul className="flex flex-col p-4 mt-4 font-medium border border-gray-100 rounded-lg md:p-0 bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                className="block px-3 py-2 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                to="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className="block px-3 py-2 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                to="/email-form"
              >
                Compose Email
              </Link>
            </li>
            <li>
              <Link
                className="block px-3 py-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                to="/show-emails-history"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                className="block px-3 py-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                to="/save-crm-calendar-data"
              >
                Help
              </Link>
            </li>
            <li>
              <Link
                className="block px-3 py-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                to="/save-crm-calendar-data"
              >
                Help
              </Link>
            </li>
            <li>
              <Link
                className="block px-3 py-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                to="/accept-user-account-request"
              >
                Help
              </Link>
            </li>
            <li>
              <Link
                className="block px-3 py-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                to="/emails-to-be-verified"
              >
                Help
              </Link>
            </li>
            <li>
              <Link
                className="block px-3 py-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                to="/projects"
              >
                Help
              </Link>
            </li>
            <li>
              <Link
                className="block px-3 py-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                to="/view-projects"
              >
                Help
              </Link>
            </li>
            <li>
              <Link
                className="block px-3 py-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                to="/newsletter-template"
              >
                Help
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
