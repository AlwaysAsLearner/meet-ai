import { DEFAULT_PAGE } from '@/constants'
import { parseAsInteger, parseAsString, parseAsStringEnum, useQueryStates } from 'nuqs'
import { MeetingStatus } from '../types'


/* Url binded to your application code */
export const useMeetingsFilters = () => {
    return useQueryStates({
        search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
        page: parseAsInteger.withDefault(DEFAULT_PAGE).withOptions({ clearOnDefault: true }),
        status: parseAsStringEnum(Object.values(MeetingStatus)).withOptions({ clearOnDefault: true }),
        agentId: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
    })
}