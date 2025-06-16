import Link from "next/link"
import { FolderOpen, Award, ArrowRight } from "lucide-react"
import prisma from "@/lib/prisma";


const ProjectsAndCertificates = async () => {
  const data = await prisma.project.findMany({
    orderBy: {
      createdAt: "desc",
    }
  });

  
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your projects and certificates</p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Projects Card */}
          <Link
            href="/admin/projects"
            className="group block bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-gray-300"
          >
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                  <FolderOpen className="w-6 h-6 text-blue-600" />
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
              </div>

              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">Projects</h2>
              <p className="text-gray-600 text-sm md:text-base mb-4">Manage and showcase your portfolio projects</p>

              <div className="flex items-center text-sm text-blue-600 font-medium">
                <span>Manage Projects</span>
              </div>
            </div>
          </Link>

          {/* Certificates Card */}
          <Link
            href="/admin/certificates"
            className="group block bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-gray-300"
          >
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-emerald-50 rounded-lg group-hover:bg-emerald-100 transition-colors">
                  <Award className="w-6 h-6 text-emerald-600" />
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
              </div>

              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">Certificates</h2>
              <p className="text-gray-600 text-sm md:text-base mb-4">Organize and display your achievements</p>

              <div className="flex items-center text-sm text-emerald-600 font-medium">
                <span>Manage Certificates</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Stats or Additional Info */}
        
        <div className="mt-8 md:mt-12 grid grid-cols-2 gap-4 md:gap-6">
          <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200">
            <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{data.length}</div>
            <div className="text-sm md:text-base text-gray-600">Total Projects</div>
          </div>
          <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200">
            <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">8</div>
            <div className="text-sm md:text-base text-gray-600">Certificates</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectsAndCertificates
