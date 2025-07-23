export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
        
        <p className="text-gray-700 leading-relaxed mb-4">
          This application is for <strong>personal use only</strong>. 
          It only accesses my own LinkedIn profile data to display my certifications 
          and achievements on my portfolio.
        </p>

        <p className="text-gray-700 leading-relaxed mb-4">
          No data is collected from other users, nor is it shared or used for any 
          commercial purposes. This app exists solely to keep my portfolio 
          automatically updated with my LinkedIn achievements.
        </p>

        <p className="text-gray-700 leading-relaxed mb-4">
          If you have any questions about this privacy policy, feel free to reach me at:
        </p>

        <div className="bg-gray-100 p-4 rounded-md text-center">
          <a 
            href="mailto:skmohammedarshad333@example.com" 
            className="text-blue-600 font-medium hover:underline"
          >
            Email me
          </a>
        </div>

        <p className="text-sm text-gray-500 mt-6 text-center">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
