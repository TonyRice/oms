import { validateArgout } from 'oms-validate'
import { ConfigSchemaAction } from '~/types'

interface ValidateActionOutputOptions {
  action: ConfigSchemaAction
  actionName: string
  output: any
}

export default function validateActionOutput({ action, actionName, output }: ValidateActionOutputOptions) {
  const errors = validateArgout(action.output as any, output)
  if (errors.length) {
    const error = new Error(`Output validation failed for Action#${actionName}`)
    // @ts-ignore
    error.messages = errors
    throw error
  }
}
