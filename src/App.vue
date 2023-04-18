<script setup>
import { useNavbarStore } from '@/store/modules/navbar'
import { onMounted, onUnmounted } from 'vue'

const navbarStore = useNavbarStore()

const anchorPosition = anchor => {
  navbarStore.anchorPosition(anchor)
}

let parent = null
let offsetTopList = []

const setOffsetTopList = () => {
  const mainEl = document.querySelector('#main')

  offsetTopList = navbarStore.anchorList.map((item, index) => {
    const element = document.querySelector(item.anchor)
    return {
      offsetTop: index === 0 ? mainEl.offsetTop : element.offsetTop,
      anchor: item.anchor
    }
  })
}

const scrollHandle = ({ target }) => {
  const curScrollTop = target.scrollTop
  let flag = true
  const len = offsetTopList.length
  const min = offsetTopList[0].offsetTop
  if (curScrollTop < min) {
    navbarStore.setAnchor('')
    return
  }
  const navHeight = document.querySelector('.navbar-anchor').offsetHeight
  for (let i = len - 1; i >= 0; i--) {
    const curReference = offsetTopList[i].offsetTop // 当前参考值
    if (flag && curScrollTop >= curReference - navHeight) {
      flag = false
      navbarStore.setAnchor(offsetTopList[i].anchor)
    }
  }
}

const bannerLoaded = () => {
  setOffsetTopList();
}

onMounted(() => {
  setOffsetTopList()
  parent = document.querySelector('#app')
  parent.addEventListener('scroll', scrollHandle)
  window.onresize = () => {
    setOffsetTopList()
  }
})

onUnmounted(() => {
  parent.removeEventListener('scroll', scrollHandle)
})
</script>
<template>
  <div class="navbar-anchor">
    <img class="logo" src="@/assets/logo.png" />
    <ul class="navbar-anchor-list">
      <li class="navbar-anchor-item" :class="{ active: item.anchor === navbarStore.anchor }"
        v-for="(item, index) in navbarStore.anchorList" :key="index" @click="anchorPosition(item.anchor)">
        <a class="navbar-anchor-item-link">
          <span class="navbar-anchor-item-text">{{ item.text }}</span>
        </a>
      </li>
    </ul>
  </div>
  <div class="main-container" id="main">
    <div class="content" id="home">
      <img class="banner" src="@/assets/banner.png" @load=" bannerLoaded()" />
    </div>
    <div class="content" id="about">
      <h2>ABOUT</h2>
    </div>
    <div class="content" id="team">
      <h2>TEAM</h2>
    </div>
    <div class="content" id="portfolio">
      <h2>PORTFOLIO</h2>
    </div>
    <div class="content" id="cooperation">
      <h2>COOPERATION</h2>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navbar-anchor {
  height: 102px;
  padding: 0 360px;
  background: rgba(0,0,0,0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .logo {
    width: 135px;
    height: 36px;
  }

  .navbar-anchor-list {
    display: flex;
    align-items: center;

    .navbar-anchor-item {
      margin-left: 60px;
      color: rgba(255, 255, 255, 0.5);

      &:first-child {
        margin-left: 0;
      }

      &.active {
        color: rgba(255, 255, 255, 1);
      }

      .navbar-anchor-item-text {

        font-size: 20px;

      }
    }
  }
}

.main-container {
  .content {
    height: 1500px;
    padding: 0 360px;
    text-align: center;
    overflow: hidden;
    h2 {
      display: block;
      margin-top: 100px;
    }
  }

  #home {
    height: auto;
    padding: 0;
    .banner {
      width: 100%;
    }
  }
}</style>