const backendHost = 'http://localhost'
const port=`3090`;
const hostingPort = `3092`;
const gatewayPort = `3093`;

export const API_ROOT = `${backendHost}:${port}`;
export const HOSTING_ROOT = `${backendHost}:${hostingPort}`;
export const GATEWAY_ROOT = `${backendHost}:${gatewayPort}`;
export const S3_ROOT = `https://lilach-s3-bucket.s3.eu-west-2.amazonaws.com`;
