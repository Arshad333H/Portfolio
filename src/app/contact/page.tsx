"use client";

import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
  FaPaperPlane,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";

const ContactPage = () => {
  const handleClick = () => {
    const email = "skmohammedarshad333@gmail.com";
    const subject = "Contact via Portfolio";
    const body =
      "Hi Arshad, I came across your portfolio and wanted to connect.";
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const socialLinks = [
    { icon: <FaGithub size={20} />, href: "https://github.com/Arshad333H" },
    {
      icon: <FaLinkedin size={20} />,
      href: "https://www.linkedin.com/in/shaik-mohammed-arshad-shareef-439698245/",
    },
    { icon: <FaTwitter size={20} />, href: "https://x.com/Arshad333_s" },
    {
      icon: <FaInstagram size={20} />,
      href: "https://www.instagram.com/a_rshad333.s",
    },
    {
      icon: <FaEnvelope size={20} />,
      href: "mailto:skmohammedarshad333@gamil.com",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white dark:bg-gray-900">
      <div className="max-w-md w-full p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-lg space-y-8">
        {/* Contact Heading */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Contact Me
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            I'd love to hear from you!
          </p>
        </div>

        {/* Email Display */}
        <div className="flex items-center gap-3 bg-white dark:bg-gray-700 p-3 rounded-lg shadow">
          <FaEnvelope className="text-gray-600 dark:text-gray-300" />
          <span className="text-gray-800 dark:text-white">
            Get In Touch (Mail Me)
          </span>
        </div>

        {/* Email Button */}
        <Button
          onClick={handleClick}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
        >
          <FaPaperPlane />
          Send Email
        </Button>

        {/* Social Icons */}
        <div className="pt-4 border-t border-gray-300 dark:border-gray-600">
          <h2 className="text-sm text-center text-gray-500 dark:text-gray-400 mb-2">
            Follow me
          </h2>
          <div className="flex justify-center gap-5">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
