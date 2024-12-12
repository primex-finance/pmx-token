// SPDX-License-Identifier: BUSL-1.1
const { task } = require("hardhat/config");

task("verifyArtifacts", "Verify deployed artifacts on block explorer", require("./verifyArtifacts"));
