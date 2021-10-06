const { JSDOM } = require("jsdom");

const processImage = async (img) => {
  if (img.tagName == "IMG") {
    img.setAttribute("decoding", "async");
    img.setAttribute("loading", "lazy");
  }
};

const imgPerf = async (rawContent) => {
  let content = rawContent;

  const dom = new JSDOM(content);
  const images = [...dom.window.document.querySelectorAll("img,amp-img")];

  if (images.length > 0) {
    await Promise.all(images.map((i) => processImage(i)));
    content = dom.serialize();
  }

  return content;
};

module.exports = {
  initArguments: {},
  configFunction: async (eleventyConfig) => {
    eleventyConfig.addTransform("imgPerf", imgPerf);
  },
};
