import ITriggerFactory from "./ITriggerFactory";
import Trigger from "../Triggers/Trigger";
import NoteOnTrigger from "../Triggers/NoteOnTrigger";
export default class NoteOnTriggerFactory implements ITriggerFactory {
  private input: any;
  constructor(input: any) {
    this.input = input;
  }
  listen(triggerFired: (trigger: Trigger) => void) {
    this.input.addListener("noteon", "all", e =>
      triggerFired(new NoteOnTrigger(e))
    );
  }
  stop() {
    this.input.removeListener("noteon", "all");
  }
}
