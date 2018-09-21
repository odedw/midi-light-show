import Trigger from "../Triggers/Trigger";
type TriggerFired = (trigger: Trigger) => void;

export default interface ITriggerFactory {
  listen(triggerFired: TriggerFired);
  stop();
}
