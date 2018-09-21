import Trigger from "./Trigger";
type NoteOnEvent = {
  channel: number;
  note: {
    number: number;
    name: string;
    octave: number;
  };
};

export default class NoteOnTrigger extends Trigger {
  channel: number;
  number: number;
  constructor(e: NoteOnEvent) {
    super("NoteOn");

    this.number = e.note.number;
    this.channel = e.channel;
  }

  get key(): string {
    return `${this.type}-${this.channel}-${this.number}`;
  }
}
