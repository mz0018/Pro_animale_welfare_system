import { FaInfoCircle } from 'react-icons/fa';

function AboutPage() {
  return (
    <div className="bg-white flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl h-1/2 p-6 overflow-y-auto">
        <h1 className="text-5xl font-bold border-b text-green-600 p-5 flex items-center gap-3">
        <FaInfoCircle />
        About Pro Animal Welfare System
        </h1>
        <p className="text-lg text-gray-700 text-center p-5">
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
    </div>
  );
}

export default AboutPage;
