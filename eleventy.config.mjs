export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/11ty/css");

  return {
    dir: {
      input: "src/11ty",
      output: "_site",
    }
  };
}