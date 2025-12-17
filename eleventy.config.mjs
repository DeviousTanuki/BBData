export default function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/11ty/css");
    eleventyConfig.addGlobalData("baseUrl", process.env.ELEVENTY_ENV === "production" ? "/BBData/" : "/");
    return {
        dir: {
            input: "src/11ty",
            output: "_site",
        }
    };
}