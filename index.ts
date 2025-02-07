import crc from "crc";
import { Buffer } from "buffer";
import QRCode from "qrcode";

class staticQRIS {
  private originalQRIS: string;
  
  constructor(qris: string) {
    if (!qris) {
      throw new Error("QRIS string cannot be empty.");
    }
    this.originalQRIS = qris;
  }
  
  private calculateCRC16(qrisString: string): string {
    const buffer = Buffer.from(qrisString, "utf-8");
    const crc16 = crc.crc16ccitt(buffer, 0xFFFF).toString(16).toUpperCase();
    return crc16.padStart(4, "0");
  }

  public generate(amount: number): string {
    if (amount <= 0) {
      throw new Error("Amount must be greater than 0");
    }

    const amountStr = amount.toString();
    const amountTag = `54${String(amountStr.length).padStart(2, "0")}${amountStr}5802ID`;
    const qris = this.originalQRIS.slice(0, -4).replace(/010211/, "010212"); 
    const parts = qris.split("5802ID");

    if (parts.length < 2) {
      throw new Error("QRIS format is incorrect");
    }

    const finalQRIS = parts[0] + amountTag + parts[1];
    return finalQRIS + this.calculateCRC16(finalQRIS);
  }

  public async generateBase64(amount: number, size: number = 300): Promise<string> {
    const qrCodeString = this.generate(amount);
    return await QRCode.toDataURL(qrCodeString, { width: size, margin: 2 });
  }

}

module.exports = staticQRIS;
module.exports.default = staticQRIS;
