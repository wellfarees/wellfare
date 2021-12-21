export abstract class Cron {
  public interval: string;

  constructor(interval: string) {
    this.interval = interval;
  }

  public abstract exec(): void;
}
