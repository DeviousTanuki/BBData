export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/11ty/**/*.css");
  eleventyConfig.addPassthroughCopy("src/11ty/**/*.svg");
  eleventyConfig.addPassthroughCopy("src/11ty/**/*.jpg");
  eleventyConfig.addPassthroughCopy("src/11ty/**/*.jpeg");
  eleventyConfig.addPassthroughCopy("src/11ty/**/*.js");
  eleventyConfig.addPassthroughCopy("src/11ty/**/*.woff2");
  eleventyConfig.addGlobalData("BASE_URL", process.env.BASE_URL || "/");
  return {
    dir: {
      input: "src/11ty",
      output: "_site",
    }
  };
}