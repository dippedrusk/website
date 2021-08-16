module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("static");

  return {
    dir: {
      input: "templates",
      includes: "_includes", // default
      output: "_site", // default
    },
  };
};
