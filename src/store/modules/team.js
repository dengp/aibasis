import { defineStore } from 'pinia'

export const useTeamStore = defineStore({
  id: 'team',
  state: () => {
    return {
      teamData: [
        {
          pic: 'team_1',
          name: 'Ming Lei',
          position: 'Founding Partner',
          intro: '简介',
          mobileIntro: [
            'Mr. Ming Lei is one of Baidu seven Co-Founders. He was in charge of Baidu Search Engine Research and Development, made Baidu the best Chinese search engine in the world.',
            'Ming founded Kuwo in year 2005. As CEO and Chairman, Ming led Kuwo to be one of top 3 music platforms in China, which listed in NYSE in 2018.',
            'Ming is active in AI related research and investment. He is the director of AI Innovation Center in Peking University. At same time, he has invested more than 30 AI related start-ups.',
            'Ming got MBA degree in year 2005 from Stanford Business School. He serves as Director of Peking University Alumni Association, and Vic President of Stanford Club of Beijing.'
          ]
        },
        {
          pic: 'team_2',
          name: 'Di Li',
          position: 'Founding Partner',
          intro: '',
          mobileIntro: [
            'Di is the founding partner of AIbasis, with years of experience in investing in cutting-edge technology. He serves as a special advisor at the Artificial Intelligence Innovation Centre（AIIC） of the Peking University  and teaches courses on Demand Analysis, Product Design, and Mental Models. ',
            'In 2003, Di earned a Bachelor degree from Peking University, and he has since been a seasoned serial entrepreneur in the internet and mobile industries, with nearly 20 years of experience in product design. He was the lead product manager of Kuwo Music, one of the leading music streaming service in China with 200 million monthly active users, and one that merged with Tencent Music Group which got listed on NASDAQ in 2018.',
          ]
        },
        {
          pic: 'team_3',
          name: 'XIN DU',
          position: 'Chief Financial Officer',
          intro: '',
          mobileIntro: []
        },
        {
          pic: 'team_4',
          name: 'Jena Zhang',
          position: 'Investment Director',
          intro: '',
          mobileIntro: []
        },
        {
          pic: 'team_5',
          name: 'Le Zhan',
          position: 'Operation Director',
          intro: '',
          mobileIntro: []
        },
        {
          pic: 'team_6',
          name: 'Sherry Zhai',
          position: 'Global Investment Research Analyst',
          intro: '',
          mobileIntro: []
        },
      ],
    }
  },
})
