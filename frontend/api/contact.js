import { formHandler } from './_lib.js'

export default formHandler(
  'Contact form',
  (b) => `Contact: ${b.full_name}`,
)
