export interface FaultData {
  code: number;
  name: string;
  message: string;
  dev?: string;
}
export default class Fault extends Error implements FaultData {
  code: number;
  dev?: string;

  constructor(code: number, name: string, message: string, dev?: string) {
    super(JSON.stringify({ code, name, message, dev }));
    this.name = name;
    this.code = code;
    this.dev = dev;

    Object.setPrototypeOf(this, Fault.prototype);
  }
}
