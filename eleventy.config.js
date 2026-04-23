const pluginNavigation = require("@11ty/eleventy-navigation");

module.exports = function(eleventyConfig) {
  // Plugins
  eleventyConfig.addPlugin(pluginNavigation);

  // Passthrough copy for static assets
  eleventyConfig.addPassthroughCopy("src/assets");

  // Watch Tailwind
  eleventyConfig.addWatchTarget("./src/assets/css/");

  // Shortcode: Current Year
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  // Filter: JSON stringify for debugging
  eleventyConfig.addFilter("json", (value) => JSON.stringify(value, null, 2));

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
