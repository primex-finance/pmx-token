const fs = require("fs");

// SPDX-License-Identifier: BUSL-1.1
module.exports = async function ({ _ }, { run, deployments }) {
  const all = await deployments.all();
  const data = {};
  for (var artifactName in all) {
    // artifactName = "MyOFTAdapter_Implementation"
    console.log(artifactName);
    try {
      await run("verify:verify", {
        address: all[artifactName].address,
        constructorArguments: all[artifactName].args,
        noCompile: true
      });
    } catch (e) {
      data[artifactName] = e;
    }
    // break;
  }
  if (Object.keys(data).length !== 0) {
    fs.writeFileSync("./verify-errors.json", JSON.stringify(data, null, 2));
  }
};
