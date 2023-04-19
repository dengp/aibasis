import { defineStore } from 'pinia'

export const useTeamStore = defineStore({
  id: 'team',
  state: () => {
    return {
      teamData: [
        {
          name: 'Ming Lei',
          position: 'Founding Partner',
          intro: 'Ming Lei intro'
        },
        {
          name: 'Di Li',
          position: 'Founding Partner',
          intro: 'Di Li intro'
        },
        {
          name: 'Jena Zhang',
          position: 'Investment Director',
          intro: 'Jena Zhang intro'
        },
        {
          name: 'Le Zhan',
          position: 'Director of Operatio',
          intro: 'Le Zhan intro'
        },
        {
          name: 'XIN DU',
          position: 'Chief Financial Officer',
          intro: 'XIN DU intro'
        },
        {
          name: 'Sherry Zhai',
          position: 'Global Investment Research Analyst',
          intro: 'Sherry Zhai intro'
        },
      ],
    }
  },
})
