import React from 'react';
import { FaGithub, FaEnvelope, FaFacebook } from 'react-icons/fa';

function AboutPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <div className="w-full max-w-4xl p-6">
        <h1 className="text-5xl font-bold text-green-600 text-center mb-4">About PAWS</h1>
        <p className="text-lg text-gray-700 text-center mb-10">
          Hi, I’m Hanz Menzi! I created this veterinary management system to make pet care more accessible and organized for everyone.
        </p>
      </div>

      <div className="w-full max-w-4xl bg-green-50 p-6 rounded-xl shadow-lg mb-10">
        <h2 className="text-3xl font-semibold text-green-600 mb-4">Project Overview</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Clients can easily book an appointment with veterinarians online.</li>
          <li>Veterinarians can view and manage appointments effortlessly.</li>
          <li>Veterinarians can showcase their products for clients to explore.</li>
          <li>Includes patient profiling to maintain detailed medical records for pets.</li>
        </ul>
      </div>

      <footer className="w-full bg-gray-800 py-6 mt-auto">
        <div className="w-full max-w-4xl mx-auto flex justify-start">
          <div className="text-left">
            <h2 className="text-2xl font-semibold text-white mb-4">Connect with Me</h2>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center">
                <FaGithub className="text-white mr-2" />
                <span className="font-bold text-white">GitHub:</span>
                <a
                  href="https://github.com/mz_0018"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline ml-2"
                >
                  mz_0018
                </a>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-white mr-2" />
                <span className="font-bold text-white">Gmail:</span>
                <a
                  href="mailto:martinezhanzmenzi@gmail.com"
                  className="text-blue-400 hover:underline ml-2"
                >
                  martinezhanzmenzi@gmail.com
                </a>
              </li>
              <li className="flex items-center">
                <FaFacebook className="text-white mr-2" />
                <span className="font-bold text-white">Facebook:</span>
                <a
                  href="https://www.facebook.com/hanzmenzi.martinez"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline ml-2"
                >
                  hanzmenzi martinez
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AboutPage;
