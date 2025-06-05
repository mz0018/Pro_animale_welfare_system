import { FaGithub, FaFacebook, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-[#242124] text-white text-center">
      <div className="w-full flex justify-start bg-[#353839]">
        <div className="w-1/2 p-4 text-left border-r">
          <p className="font-semibold">Feel free to reach out if you want to collaborate with me, or simply have a chat.</p>
          <a 
            href="mailto:martinezhanzmenzi@gmail.com" 
            className="underline text-white hover:text-gray-300"
            target="_blank" 
            rel="noopener noreferrer"
          >
            CONTACT@martinezhanzmenzi@gmail.com
          </a>
        </div>

        <div className="w-1/2 p-4 text-left">
          <p className="mb-2 font-semibold">FOLLOW ME</p>
          <div className="flex items-center gap-6 text-lg">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <FaGithub />
              <span>GitHub</span>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <FaLinkedin />
              <span>LinkedIn</span>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <FaFacebook />
              <span>Facebook</span>
            </a>
          </div>
        </div>
      </div>

      <div>
        <p className="text-sm py-5">
          &copy; {new Date().getFullYear()} All rights reserved. <br />
          <span className="font-semibold">Hanz Menzi Martinez</span> |{" "}
          <span className="font-semibold">Pro Animal Welfare System (PAWS)</span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
