class EncryptionAndDecryption {

    constructor({ crypto, algorithm }) {
        this.crypto = crypto;
        this.algorithm = algorithm;
        this.key = this.crypto.randomBytes(32);
        this.iv = this.crypto.randomBytes(16);
    }

    encrypt(input) {
        const cipher = this.crypto.createCipheriv(this.algorithm, Buffer.from(this.key), this.iv);
        let encrypted = cipher.update(input.originalData);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return { iv: this.iv.toString('hex'), encryptedData: encrypted.toString('hex') , key: this.key};
    }

    decrypt(input) {
        const iv = Buffer.from(input.iv, 'hex');
        const encryptedText = Buffer.from(input.encryptedData, 'hex');
        const decipher = this.crypto.createDecipheriv(this.algorithm, Buffer.from(input.key), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    }
}

module.exports = EncryptionAndDecryption;