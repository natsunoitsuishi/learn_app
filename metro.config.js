const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// 添加忽略路径
config.watchFolders = [__dirname];
config.resolver.blockList = [
    /.*\/docker\/.*/,
    /.*\/node_back\/.*/,
];

module.exports = config;