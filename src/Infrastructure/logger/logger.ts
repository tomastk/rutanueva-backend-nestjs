export class Logger {
  private get timestamp(): string {
    const date = new Date();
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }

  log(message: string) {
    console.log(`${this.timestamp} ${message}`);
  }
  error(message: string) {
    console.error(`${this.timestamp} ${message}`);
  }
  warn(message: string) {
    console.warn(`${this.timestamp} ${message}`);
  }
  debug(message: string) {
    console.debug(`${this.timestamp} ${message}`);
  }
  verbose(message: string) {
    console.log(`${this.timestamp} ${message}`);
  }
}
