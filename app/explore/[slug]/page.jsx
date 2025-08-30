// // Remove "use client" - this is now a Server Component
// import React from "react";
// import BackButton from "@/components/BackButton";
// import EndpointList from "@/components/EndpointList";
// import ApiTester from "@/components/apitester";
// import { BookOpen, ExternalLink } from "lucide-react";
// import { getApiBySlug } from "@/utils/apiConfig";

// const APIDetailsPage = async ({ params }) => {
//   const { slug } = await params;
//   const api = await getApiBySlug(slug); // ✅ Now works because it's a server component

//   if (!api) {
//     return (
//       <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-8">
//         <div className="max-w-5xl mx-auto text-center">
//           <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
//             API Not Found
//           </h1>
//           <p className="text-gray-600 dark:text-gray-300 mb-6">
//             The API you're looking for doesn't exist.
//           </p>
//           <BackButton href="/" text="Back to Home" />
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-8">
//       <div className="max-w-5xl mx-auto">
//         {/* Navigation */}
//         <div className="mb-6 flex items-center gap-2">
//           <BackButton />
//         </div>

//         {/* Main Section */}
//         <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
//           {/* Left side */}
//           <div className="flex-1">
//             <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
//               {api.name}
//             </h1>
//             <p className="text-gray-700 dark:text-gray-300 mb-4 max-w-xl">
//               {api.description}
//             </p>
//           </div>

//           {/* Right side */}
//           <div className="flex flex-col items-start md:items-end gap-3 md:min-w-[240px]">
//             {/* Tags */}
//             <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
//               {api.tags.map((tag) => (
//                 <span
//                   key={tag}
//                   className="bg-indigo-50 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 px-2 py-1 rounded text-xs font-medium"
//                 >
//                   {tag}
//                 </span>
//               ))}
//             </div>

//             {/* Action Buttons */}
//             <div className="flex flex-col gap-2 w-full md:w-auto">
//               <a
//                 href={api.docsUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded shadow transition min-w-[140px]"
//               >
//                 <BookOpen className="w-4 h-4" />
//                 See Docs
//               </a>
//               <a
//                 href={api.websiteUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 text-sm font-semibold px-4 py-2 rounded shadow hover:bg-gray-200 dark:hover:bg-gray-700 transition min-w-[140px]"
//               >
//                 <ExternalLink className="w-4 h-4" />
//                 Go to Site
//               </a>
//             </div>
//           </div>
//         </div>

//         {/* Divider */}
//         <hr className="my-8 border-gray-200 dark:border-gray-700" />

//         {/* Popular Endpoints Section */}
//         <EndpointList api={api} />

//         {/* Live Tester Section */}
//         <section className="mt-12">
//           <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
//             Live Tester
//           </h2>
//           <div id="api-tester">
//             <ApiTester runUrl="" />
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default APIDetailsPage;
// app/[slug]/page.jsx - Just replace the EndpointList + ApiTester sections
import React from "react";
import BackButton from "@/components/BackButton";
import RunButtonManager from "@/components/RunButtonManager"; // ✅ Import new component
import { BookOpen, ExternalLink } from "lucide-react";
import { getApiBySlug } from "@/utils/apiConfig";

const APIDetailsPage = async ({ params }) => {
  const { slug } = await params;
  const api = await getApiBySlug(slug);

  if (!api) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-8">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            API Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            The API you're looking for doesn't exist.
          </p>
          <BackButton href="/" text="Back to Home" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Navigation */}
        <div className="mb-6 flex items-center gap-2">
          <BackButton />
        </div>

        {/* Main Section */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          {/* Left side */}
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
              {api.name}
            </h1>
            <p className="text-gray-700 dark:text-gray-300 mb-4 max-w-xl">
              {api.description}
            </p>
          </div>

          {/* Right side */}
          <div className="flex flex-col items-start md:items-end gap-3 md:min-w-[240px]">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
              {api.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-indigo-50 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 px-2 py-1 rounded text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 w-full md:w-auto">
              <a
                href={api.docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded shadow transition min-w-[140px]"
              >
                <BookOpen className="w-4 h-4" />
                See Docs
              </a>
              <a
                href={api.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 text-sm font-semibold px-4 py-2 rounded shadow hover:bg-gray-200 dark:hover:bg-gray-700 transition min-w-[140px]"
              >
                <ExternalLink className="w-4 h-4" />
                Go to Site
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8 border-gray-200 dark:border-gray-700" />

        {/* ✅ Replace EndpointList + ApiTester with single component */}
        <RunButtonManager api={api} />
      </div>
    </div>
  );
};

export default APIDetailsPage;
