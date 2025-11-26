const path = require("path");

module.exports = {
    webpack: {
        alias: {
            "@": path.resolve(__dirname, "src"),
            "@components": path.resolve(__dirname, "src/components"),
            "@hooks": path.resolve(__dirname, "src/hooks"),
            "@domain": path.resolve(__dirname, "src/domain"),
            "@api": path.resolve(__dirname, "src/api"),
            "@utils": path.resolve(__dirname, "src/utils"),
            "@styles": path.resolve(__dirname, "src/styles"),
        },
    },
};
