import ITriggerFactory from "./ITriggerFactory";
import Trigger from "../Triggers/Trigger";
import NoteOnTriggerFactory from "./NoteOnTriggerFactory";
export default class CompositeTriggerFactory implements ITriggerFactory {
  private factories: ITriggerFactory[] = [];
  constructor(input: any) {
    this.factories.push(new NoteOnTriggerFactory(input));
  }
  listen(triggerFired: (trigger: Trigger) => void) {
    this.factories.forEach(factory => factory.listen(triggerFired));
  }
  stop() {
    this.factories.forEach(factory => factory.stop());
  }
}
