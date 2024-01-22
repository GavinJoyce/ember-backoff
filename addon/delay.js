import Em from "ember";
import { later } from "@ember/runloop";

export default function (milliseconds) {
  if (milliseconds === undefined) {
    milliseconds = 2000;
  }

  return new Em.RSVP.Promise(function (resolve) {
    later(this, resolve, milliseconds);
  });
}
