export default abstract class Trigger {
  public type: string;
  abstract get key(): string;
  constructor(type: string) {
    this.type = type;
  }
}
