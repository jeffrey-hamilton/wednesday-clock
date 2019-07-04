export const Days = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6
};

export class ClockNode {
  public char: string;
  public on: boolean;

  public constructor(char: string, on: boolean = false) {
    this.char = char;
    this.on = on;
  }
}
