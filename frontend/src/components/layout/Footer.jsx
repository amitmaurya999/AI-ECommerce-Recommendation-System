import { NavLink } from "react-router-dom";
import { Mail, Phone } from "lucide-react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";



const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white mt-20">

      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          <div>

            <h2 className="text-3xl font-bold text-blue-400">
              ShopSmart
            </h2>

            <p className="mt-4 text-gray-300 leading-7">
              AI Powered E-Commerce Recommendation System built
              using React, FastAPI, Machine Learning and NLP.
            </p>

          </div>

          <div>

            <h3 className="text-xl font-semibold mb-4">
              Quick Links
            </h3>

            <ul className="space-y-3">

              <li>
                <NavLink to="/" className="hover:text-blue-400">
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink to="/products" className="hover:text-blue-400">
                  Products
                </NavLink>
              </li>

              <li>
                <NavLink to="/wishlist" className="hover:text-blue-400">
                  Wishlist
                </NavLink>
              </li>

              <li>
                <NavLink to="/profile" className="hover:text-blue-400">
                  Profile
                </NavLink>
              </li>

            </ul>

          </div>


          <div>

            <h3 className="text-xl font-semibold mb-4">
              Categories
            </h3>

            <ul className="space-y-3 text-gray-300">

              <li>Electronics</li>
              <li>Fashion</li>
              <li>Books</li>
              <li>Sports</li>
              <li>Home</li>

            </ul>

          </div>

          <div>

            <h3 className="text-xl font-semibold mb-4">
              Contact
            </h3>

            <div className="space-y-4">

              <div className="flex items-center gap-3">

                <Mail size={20} />

                <span>support@shopsmart.com</span>

              </div>

              <div className="flex items-center gap-3">

                <Phone size={20} />

                <span>+1 234 567 890</span>

              </div>

            </div>


            <div className="flex gap-5 mt-6">

              <FaFacebook className="cursor-pointer hover:text-blue-500" />

              <FaInstagram className="cursor-pointer hover:text-pink-500" />

              <FaLinkedin className="cursor-pointer hover:text-blue-400" />

            </div>

          </div>

        </div>


        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400">

          © 2026 ShopSmart. All Rights Reserved.

        </div>

      </div>

    </footer>
  );
};

export default Footer;