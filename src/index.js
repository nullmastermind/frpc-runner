const dotenv = require("dotenv");
dotenv.config();

const { v4 } = require("uuid");

const generateConfigByPort = ({ localPort, remotePort, name }) => {
  name = name || v4();
  localPort = localPort || remotePort;
  remotePort = remotePort || localPort;

  return `
serverAddr = "${process.env.REMOTE_HOST}"
serverPort = 7000

[[proxies]]
name = "${name}"
type = "tcp"
localIP = "127.0.0.1"
localPort = ${localPort}
remotePort = ${remotePort}
  `;
};

const generateConfigByDomain = ({ localPort, name, customDomain }) => {
  name = name || v4();
  localPort = localPort || 7000;
  customDomain = customDomain || `${name}.dongnv.dev`;

  return `
serverAddr = "${process.env.REMOTE_HOST}"
serverPort = 7000

[[proxies]]
name = "${name}"
type = "http"
localPort = ${localPort}
customDomains = ["${customDomain}"]
  `;
};

console.log(process.env.REMOTE_HOST);
