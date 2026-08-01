import { Hint, RadioRow } from './FormLayout'

export type PlannerAnswer = '' | 'yes' | 'no'

export type PlannerState = {
  hasPlanner: PlannerAnswer
  plannerName: string
  wantsPlanning: boolean
}

export const emptyPlanner: PlannerState = {
  hasPlanner: '',
  plannerName: '',
  wantsPlanning: false,
}

const PLANNER_OPTIONS = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'Not yet' },
]

/**
 * Asks whether the couple already has a planner. Answering "yes" reveals a name
 * field, "not yet" offers planning and coordination through our sister studio.
 */
export function PlannerQuestion({
  value,
  onChange,
  label = 'Are you working with a wedding planner?',
}: {
  value: PlannerState
  onChange: (next: PlannerState) => void
  label?: string
}) {
  return (
    <div className="mb-6">
      <span className="font-sans text-[0.9rem] font-normal text-mf-black/80">{label} *</span>
      <div className="mt-3">
        <RadioRow
          large
          name="hasPlanner"
          options={PLANNER_OPTIONS}
          value={value.hasPlanner}
          onChange={(v) =>
            onChange({
              hasPlanner: v as PlannerAnswer,
              plannerName: '',
              wantsPlanning: false,
            })
          }
        />
      </div>

      {value.hasPlanner === 'yes' ? (
        <input
          type="text"
          placeholder="Who is it? Name or website"
          value={value.plannerName}
          onChange={(e) => onChange({ ...value, plannerName: e.target.value })}
          className="mt-4 w-full max-w-md mf-inline-field"
        />
      ) : null}

      {value.hasPlanner === 'no' ? (
        <div className="mt-4 border border-mf-muted/25 bg-white/50 px-5 py-4">
          <label className="flex cursor-pointer gap-3">
            <input
              type="checkbox"
              checked={value.wantsPlanning}
              onChange={(e) => onChange({ ...value, wantsPlanning: e.target.checked })}
              className="mt-1 h-4 w-4 accent-mf-black"
            />
            <span className="font-sans text-[1rem] leading-snug text-mf-black">
              I&apos;d also like help with planning and coordination
            </span>
          </label>
          <Hint
            large
            text="Full planning and creative direction are handled by our sister studio for destination weddings."
          />
        </div>
      ) : null}
    </div>
  )
}
