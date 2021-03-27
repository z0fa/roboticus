import nacl from "tweetnacl";

export default function (
  body: string,
  signature: string,
  timestamp: string,
  clientPublicKey: string
): boolean {
  try {
    const message = Buffer.from(timestamp + body, "utf-8");

    const signatureData = Buffer.from(signature, "hex");
    const publicKeyData = Buffer.from(clientPublicKey, "hex");

    return nacl.sign.detached.verify(message, signatureData, publicKeyData);
  } catch (error) {
    console.error(error);

    return false;
  }
}
