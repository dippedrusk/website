const { parseHTML } = require("linkedom");

const processImage = (img) => {
  img.setAttribute("decoding", "async");
  img.setAttribute("loading", "lazy");
};

const imgPerf = async (content) => {
  const { document } = parseHTML(content);
  const images = document.querySelectorAll("img");

  if (images.length > 0) {
    images.forEach(processImage);
    return document.documentElement.innerHTML;
  }

  return content;
};

module.exports = {
  initArguments: {},
  configFunction: async (eleventyConfig) => {
    eleventyConfig.addTransform("imgPerf", imgPerf);
  },
};
