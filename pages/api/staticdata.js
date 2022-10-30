import { loadEvents } from "../../lib/loadEvents";

export default async function handler(req, res) {
  const events = await loadEvents();
  res.status(200).json(events);
}