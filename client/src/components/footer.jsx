import React from "react";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";
import logo from "../assets/logo.svg";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-white text-xl font-bold mb-4">
              <img src={logo} alt=" UStar" />
            </h3>
            <p className="text-sm">
              Empowering teachers with smart tools for better student
              observations and progress tracking.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-green-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400 transition-colors">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400 transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>support@UStar.com</li>
              <li>+1 (555) 123-4567</li>
              <li>123 Education Street</li>
              <li>Toronto, ON M5C 1A2</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-4">Newsletter</h4>
            <p className="text-sm mb-4">
              Stay updated with our latest features and releases.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 flex-grow"
              />
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-6 mb-4 md:mb-0">
            <Facebook className="w-5 h-5 hover:text-green-400 cursor-pointer" />
            <Twitter className="w-5 h-5 hover:text-green-400 cursor-pointer" />
            <Instagram className="w-5 h-5 hover:text-green-400 cursor-pointer" />
            <Mail className="w-5 h-5 hover:text-green-400 cursor-pointer" />
          </div>
          <p className="text-sm">© 2024 UStar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
