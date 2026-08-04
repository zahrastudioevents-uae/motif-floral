import { formHandler } from './_lib.js'

export default formHandler(
  'Quote request, event',
  (b) => `Quote (Events): ${b.full_name}`,
)
