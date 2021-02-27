import { get } from '@/utils/httpHelper'

export default {
  vehicles: {
    getYears: () => {
      return get({ endpoint: `years/` })
    },
    getMakes: ({ year }) => {
      return get({ endpoint: `makes/`, query: `?year=${year}` })
    },
    getModels: ({ year, make }) => {
      return get({ endpoint: `/`, query: `?year=${year}&make=${make}` })
    }
  }
}
