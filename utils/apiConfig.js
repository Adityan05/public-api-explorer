import { supabase } from "@/lib/supabase";

// Transform database row to match your current structure
const transformApiData = (dbRow) => ({
  name: dbRow.name,
  slug: dbRow.slug,
  description: dbRow.description,
  image: dbRow.image,
  isLogo: dbRow.is_logo,
  bgGradient: dbRow.bg_gradient,
  websiteUrl: dbRow.website_url,
  apiBaseUrl: dbRow.api_base_url,
  docsUrl: dbRow.docs_url,
  tags: dbRow.tags,
  https: dbRow.https,
  cors: dbRow.cors,
  endpoints: dbRow.endpoints,
  score: dbRow.score, // ADD THIS LINE - Include score in transformation
});

// Cache for performance (optional)
let cachedApis = null;

// Fetch from Supabase but return same structure as before
const fetchApiConfig = async () => {
  if (cachedApis) return cachedApis;

  try {
    const { data, error } = await supabase
      .from("apis")
      .select("*")
      .eq("active", true)
      .order("name");

    if (error) throw error;

    // Transform to match your original structure
    const apiConfig = {};
    data.forEach((row) => {
      const transformed = transformApiData(row);
      apiConfig[row.slug] = transformed;
    });

    cachedApis = apiConfig;
    return apiConfig;
  } catch (error) {
    console.error("Error fetching APIs:", error);
    // Fallback to empty object to prevent crashes
    return {};
  }
};

// NEW FUNCTION: Get top APIs by score for homepage ISR
export const getTopApis = async (limit = 6) => {
  try {
    const { data, error } = await supabase
      .from("apis")
      .select("*")
      .eq("active", true)
      .order("score", { ascending: false }) // Sort by score DESC (highest first)
      .order("name") // Secondary sort for consistency
      .limit(limit); // Server-side limit to top 6

    if (error) throw error;

    return data.map(transformApiData);
  } catch (error) {
    console.error("Error fetching top APIs:", error);
    return [];
  }
};

// Keep your original exports working (for library page, etc.)
export const getAllApis = async () => {
  const config = await fetchApiConfig();
  return Object.values(config);
};

export const getApiBySlug = async (slug) => {
  const config = await fetchApiConfig();
  return config[slug];
};

// For backward compatibility, export the fetch function too
export { fetchApiConfig as apiConfig };
