import APICard from "@/components/APICard";
import { getAllApis } from "@/utils/apiConfig";
import HeroSection from "@/components/HeroSection";

const Main = async () => {
  const apis = await getAllApis();

  return (
    <>
      <HeroSection />
      <div
        id="api-grid"
        className="px-6 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto
                   bg-gray-50 dark:bg-gray-900"
      >
        {apis.map((api) => (
          <APICard
            key={api.slug}
            image={api.image}
            name={api.name}
            description={api.description}
            bgGradient={api.bgGradient}
            isLogo={api.isLogo}
            slug={api.slug}
            https={api.https}
            cors={api.cors}
          />
        ))}
      </div>
    </>
  );
};

export default Main;
