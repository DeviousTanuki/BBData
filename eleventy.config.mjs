export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/11ty/css");
  eleventyConfig.addGlobalData("BASE_URL", process.env.BASE_URL || "/");
  return {
    dir: {
      input: "src/11ty",
      output: "_site",
    }
  };
}