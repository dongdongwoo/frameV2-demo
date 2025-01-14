import { ethers } from "ethers";

function toBase64URL(base64: string): string {
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

export async function createFarcasterAccountAssociation() {
  // 1. 필요한 변수들 설정
  const _fid = 544677; // 귀하의 Farcaster ID
  const custodyAddress = "0x846228cc7d96dc5bff17b06dc45b9c7683f4435b"; // 귀하의 이더리움 주소
  const privateKey =
    "0x7568f0457a6c61581ec9debf92bcd3b4909c6d0ba1ead73d7f09ad49a7847409"; // 귀하의 개인키

  // 2. Header 생성 및 인코딩
  const header = {
    fid: _fid,
    type: "custody",
    key: custodyAddress,
  };
  const encodedHeader = toBase64URL(
    Buffer.from(JSON.stringify(header), "utf-8").toString("base64")
  );

  // 3. Payload 생성 및 인코딩
  const payload = {
    domain: "https://frame-v2-demo-tau.vercel.app", // 귀하의 도메인
  };
  const encodedPayload = toBase64URL(
    Buffer.from(JSON.stringify(payload), "utf-8").toString("base64")
  );

  // 4. 서명 생성
  const wallet = new ethers.Wallet(privateKey);
  const messageToSign = `${encodedHeader}.${encodedPayload}`;
  const signature = await wallet.signMessage(messageToSign);
  const encodedSignature = toBase64URL(
    Buffer.from(signature, "utf-8").toString("base64")
  );

  // 5. 결과물 생성
  // Compact 형식
  const compactJfs = `${encodedHeader}.${encodedPayload}.${encodedSignature}`;

  const { type } = JSON.parse(
    Buffer.from(
      encodedHeader.replace(/-/g, "+").replace(/_/g, "/"),
      "base64"
    ).toString("utf-8")
  );

  if (type !== "custody") {
    throw new Error("Invalid type");
  }

  const valid = ethers.verifyMessage(
    encodedHeader + "." + encodedPayload,
    signature
  );

  if (!valid) {
    throw new Error("Invalid signature");
  }

  // JSON 형식 (farcaster.json에 들어갈 형식)
  const jsonJfs = {
    accountAssociation: {
      header: encodedHeader,
      payload: encodedPayload,
      signature: encodedSignature,
    },
  };

  console.log("Compact Format:", compactJfs);
  console.log("JSON Format:", JSON.stringify(jsonJfs, null, 2));

  return jsonJfs;
}
