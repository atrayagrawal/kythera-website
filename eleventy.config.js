const pluginNavigation = require("@11ty/eleventy-navigation");

module.exports = function(eleventyConfig) {
  // Plugins
  eleventyConfig.addPlugin(pluginNavigation);

  // Passthrough copy for static assets
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/robots.txt");

  // Watch Tailwind
  eleventyConfig.addWatchTarget("./src/assets/css/");

  // Shortcode: Current Year
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  // Filter: JSON stringify for debugging
  eleventyConfig.addFilter("json", (value) => JSON.stringify(value, null, 2));

  // Filter: Find offering by ID
  eleventyConfig.addFilter("findOffering", (offerings, id) => {
    return offerings.find(offering => offering.id === id);
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    pathPrefix: "/kythera-website/"
  };
};
