const { parseHTML } = require("linkedom");
const { readFileSync } = require("fs");

function getAlt(src) {
  // assumes we will always have an extension
  var f = src.replace(/.[^.]+$/, ".txt").replace(/^\//, "");
  return readFileSync(f, (err, data) => {
    if (err) throw err;
    return data.toString();
  });
}

const processImage = (img) => {
  img.setAttribute("decoding", "async");
  img.setAttribute("loading", "lazy");
  img.setAttribute("class", "img-fluid");
  if (!img.hasAttribute("alt")) {
    var alt = getAlt(img.getAttribute("src"));
    img.setAttribute("alt", alt);
    img.setAttribute("title", alt);
  }
};

const imgPerf = (content) => {
  const { document } = parseHTML(content);
  const images = document.querySelectorAll("img");

  if (images.length > 0) {
    images.forEach(processImage);
    return document.toString();
  }

  return content;
};

module.exports = {
  initArguments: {},
  configFunction: (eleventyConfig) => {
    eleventyConfig.addTransform("imgPerf", imgPerf);
  },
};
