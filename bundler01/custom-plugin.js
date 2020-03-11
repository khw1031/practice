class CustomPlugin {
  apply(compiler) {
    // compiler.hooks.done.tap("Custom Plugin", stats => {
    //   console.log(stats);
    //   console.log("\nCustom Plugin: done");
    // });

    compiler.plugin("emit", (compilation, callback) => {
      const { assets } = compilation;
      const sourceKeys = Object.keys(assets);

      for (const key of sourceKeys) {
        const source = assets[key].source();
        assets[key].source = () => {
          const banner = [
            "/**",
            "* 이것은 Banner Plugin이 처리한 결과 입니다.",
            "* key: " + key,
            "* /",
          ].join("\n");
          return banner + "\n\n" + source;
        };
      }

      callback();
    });
  }
}

module.exports = CustomPlugin;
