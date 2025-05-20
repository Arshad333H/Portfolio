import Link from "next/link";

const ProjectsAndCertificates = async () => {
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-6 gap-10">
      {/* Projects Card */}
      <Link
        href="/admin/projects"
        className="group w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
      >
        <div className="relative bg-gradient-to-br from-indigo-600 to-purple-700 p-16 text-center">
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-30"></div>
          <h2 className="relative text-6xl font-extrabold text-white tracking-tight drop-shadow-lg">
            PROJECTS
          </h2>
          <div className="absolute bottom-4 left-0 right-0 flex justify-center">
            <span className="inline-block h-1 w-16 bg-white/50 group-hover:w-24 transition-all duration-300"></span>
          </div>
        </div>
      </Link>

      {/* Certificates Card */}
      <Link
        href="/admin/certificates"
        className="group w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
      >
        <div className="relative bg-gradient-to-br from-emerald-600 to-teal-700 p-16 text-center">
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-30"></div>
          <h2 className="relative text-6xl font-extrabold text-white tracking-tight drop-shadow-lg">
            CERTIFICATES
          </h2>
          <div className="absolute bottom-4 left-0 right-0 flex justify-center">
            <span className="inline-block h-1 w-16 bg-white/50 group-hover:w-24 transition-all duration-300"></span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProjectsAndCertificates;
