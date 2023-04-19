import { defineStore } from 'pinia'

export const useNavbarStore = defineStore({
  id: 'navbar',
  state: () => {
    return {
      anchorList: [
        {
          anchor: '#home',
          text: 'HOME',
        },
        {
          anchor: '#about',
          text: 'ABOUT',
        },
        {
          anchor: '#team',
          text: 'TEAM',
        },
        {
          anchor: '#portfolio',
          text: 'PORTFOLIO',
        },
        {
          anchor: '#cooperation',
          text: 'COOPERATION',
        }
      ],
      anchor: '#home'
    }
  },
  actions: {
    /** 设置全局锚点
     * @param {String} anchor
     */
    setAnchor(anchor) {
      this.anchor = anchor || ''
    },
    scrollTo(offsetTop) {
      const parent = document.querySelector('#app')
      parent.scrollTo({
        top: offsetTop,
        behavior: 'instant'
      })
    },
    anchorPosition(anchor) {
      const element = document.querySelector(anchor)
      const navHeight = document.querySelector('.navbar-anchor').offsetHeight
      this.scrollTo(anchor == '#home' ? 0 : (element.offsetTop - navHeight))
    }
  }
})
