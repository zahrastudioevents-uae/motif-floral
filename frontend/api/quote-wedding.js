import { formHandler } from './_lib.js'

const label = (b) => (b.form_type === 'elopement' ? 'Elopement' : 'Wedding')

export default formHandler(
  (b) => `Quote request, ${label(b).toLowerCase()}`,
  () => '🌸 Motif Floral Wedding Quote',
)
