import Link from "next/link";
import { MapPin, Mail, Phone, ArrowUp } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t bg-slate-950 text-white">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(6,182,212,0.15),transparent_35%)]" />

      <div className="relative container mx-auto px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Logo */}
          <div>
            <h2 className="text-3xl font-extrabold">
              Rent<span className="text-blue-500">Nest</span>
            </h2>

            <p className="mt-6 leading-8 text-slate-400">
              RentNest helps tenants discover verified rental properties while
              empowering landlords to manage listings with ease.
            </p>

            <div className="mt-8 flex gap-4"></div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-xl font-bold">Quick Links</h3>

            <ul className="space-y-4 text-slate-400">
              <li>
                <Link href="/" className="hover:text-blue-400">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/properties" className="hover:text-blue-400">
                  Properties
                </Link>
              </li>

              <li>
                <Link href="/login" className="hover:text-blue-400">
                  Login
                </Link>
              </li>

              <li>
                <Link href="/register" className="hover:text-blue-400">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-6 text-xl font-bold">Company</h3>

            <ul className="space-y-4 text-slate-400">
              <li>
                <a href="#" className="hover:text-blue-400">
                  About Us
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-blue-400">
                  Privacy Policy
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-blue-400">
                  Terms & Conditions
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-blue-400">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-6 text-xl font-bold">Contact</h3>

            <div className="space-y-5 text-slate-400">
              <div className="flex gap-3">
                <MapPin className="mt-1 h-5 w-5 text-blue-500" />
                <span>Dhaka, Bangladesh</span>
              </div>

              <div className="flex gap-3">
                <Mail className="mt-1 h-5 w-5 text-blue-500" />
                <span>support@rentnest.com</span>
              </div>

              <div className="flex gap-3">
                <Phone className="mt-1 h-5 w-5 text-blue-500" />
                <span>+880 1700-000000</span>
              </div>
            </div>
          </div>
        </div>

        <div className="my-12 h-px bg-slate-800" />

        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="text-slate-400">
            © {new Date().getFullYear()} RentNest. All rights reserved.
          </p>

          <button className="flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 font-semibold transition hover:bg-blue-700">
            Back To Top
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
