const { parseHTML } = require("linkedom");

const processImage = (img) => {
  img.setAttribute("decoding", "async");
  img.setAttribute("loading", "lazy");
};

const imgPerf = (content) => {
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
  configFunction: (eleventyConfig) => {
    eleventyConfig.addTransform("imgPerf", imgPerf);
  },
};
