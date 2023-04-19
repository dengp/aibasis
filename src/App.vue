<script setup>
import { useNavbarStore } from '@/store/modules/navbar'
import { useTeamStore } from '@/store/modules/team.js'
import { onMounted, onUnmounted } from 'vue'

const navbarStore = useNavbarStore()
const teamStore = useTeamStore()

const anchorPosition = anchor => {
  navbarStore.anchorPosition(anchor)
}

let changeNav = false;
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
      changeNav = i > 0;
    }
  }
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
  <div class="navbar-anchor" :class="{ 'navbar-anchor_dark': changeNav }">
    <img class="logo" :src="`/src/assets/logo${changeNav ? '_dark' : ''}.png`" @click="anchorPosition('#home')" />
    <ul class="navbar-anchor-list">
      <li class="navbar-anchor-item"
        v-for="(item, index) in navbarStore.anchorList" :key="index" @click="anchorPosition(item.anchor)">
        <a class="navbar-anchor-item-link">
          <span class="navbar-anchor-item-text">{{ item.text }}</span>
        </a>
        <div class="under_line" :class="{ 'under_line_dark': changeNav }" v-if="item.anchor === navbarStore.anchor"></div>
      </li>
    </ul>
  </div>
  <div class="main-container" id="main">
    <div class="content" id="home">
      <img class="banner" src="@/assets/banner.png" />
    </div>
    <div class="content" id="about">
      <h2>ABOUT</h2>
      <div class="title_under_line"></div>
      <p>
        AIbasis was established in 2018 by Ming Lei, one of the founding members of Baidu. AIbasis is a Singapore-based,
        pre-seed, seed stage fund that focuses on emerging technologies.</p>

      <p>AIbasis has invested in 60+ startups specializing in frontier areas such as Artificial Intellegence, Robotics,
        SaaS, Biotech, Synthetic Biology, AI Drug Discovery and Renewable Energy. About 90% of our portfolio companies
        were spun out from or have founders who are alumni of Stanford, MIT, Harvard, Berkeley and other prestigious
        universities. </p>

      <p> With our technical expertise, large network and years of experience in the technology industry, we support
        early-stage tech companies and young talents from the ground up. We invite visionary founders to tap into our
        market insights, resources, and decades of experience to turn ambitious plans into a tangible and successful
        future.
      </p>
    </div>
    <div class="content" id="team">
      <h2>TEAM</h2>
      <div class="title_under_line"></div>
      <div class="persons">
        <div v-for="(item, index) in teamStore.teamData" :key="index" class="person">
          <img :src="`/src/assets/team_${index + 1}.png`" />
          <div class="info">
            <span class="name">{{ item.name }}</span>
            <span class="position">{{ item.position }}</span>
          </div>
          <div class="intro">
            <span class="name">{{ item.name }}</span>
            <span class="con">{{ item.intro }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="content" id="portfolio">
      <h2>PORTFOLIO</h2>
      <div class="title_under_line"></div>
      <div class="imgs">
        <img src="@/assets/portfolio_1.png" />
        <img src="@/assets/portfolio_2.png" />
        <img src="@/assets/portfolio_3.png" />
        <img src="@/assets/portfolio_4.png" />
      </div>
    </div>
    <div class="content" id="cooperation">
      <h2>COOPERATION</h2>
      <div class="title_under_line"></div>
      <img src="@/assets/cooperation.png" />
    </div>
  </div>
  <div class="footer">
    <div class="footer_content">
      <p>contact US<span>EMAIL : MLIC@PKU.EDU.CN</span></p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$mainContentPadding: 0 360px;
.navbar-anchor {
  height: 102px;
  padding: $mainContentPadding;;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;

  .logo {
    width: 135px;
    height: 36px;
    cursor: pointer;
  }

  .navbar-anchor-list {
    display: flex;
    align-items: center;

    .navbar-anchor-item {
      margin-left: 60px;
      color: #ffffff;
      font-size: 20px;
      position: relative;
      padding-bottom: 8px;
      font-family: 'DINPro-Bold';
      font-weight: bold;
      &:first-child {
        margin-left: 0;
      }

      .under_line {
        position: absolute;
        bottom: 0;
        left: 50%;
        margin-left: -10.5px;
        width: 21px;
        height: 3px;
        background: #ffffff;
        &.under_line_dark {
          background: #4E62E8;
        }
      }
    }
  }

  &.navbar-anchor_dark {
    background: #ffffff;
    box-shadow: 0px 10px 30px 0px rgba(31, 32, 36, 0.1);

    .navbar-anchor-item {
      color: #212226;
    }
  }
}

.main-container {
  .content {
    padding: $mainContentPadding;
    text-align: center;
    overflow: hidden;

    h2 {
      display: block;
      font-family: 'Helvetica Neue Bold';
      font-size: 48px;
      font-weight: bold;
    }
    
    .title_under_line {
      width: 50px;
      height: 4px;
      background: #4E62E8;
      margin-top: 26px;
      margin: 0 auto;
    }

    &#home {
      height: auto;
      padding: 0;
      .banner {
        width: 1920px;
        height: 701px;
      }
    }

    &#about {
      padding-top: 100px;
      p {
        text-align: left;
        font-size: 20px;
        font-family: 'HelveticaNeue-Light';
        font-weight: 300;
        color: #212226;
        line-height: 32px;
        margin-top: 32px;
        &:first-child {
          margin-top: 42px;
        }
      }
    }

    &#team {
      padding-top: 120px;
      .persons {
        margin-top: 49px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-content: center;
        .person {
          position: relative;
          margin-top: 30px;
          img {
            width: 380px;
            height: 380px;
          }
          .info {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 36px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .name {
              font-size: 48px;
              font-family: 'HelveticaNeue-Bold, HelveticaNeue';
              font-weight: bold;
              color: #FFFFFF;
              line-height: 48px;
            }
            .position {
              font-size: 16px;
              font-family: 'PingFangSCSemibold-, PingFangSCSemibold';
              font-weight: normal;
              color: #FFFFFF;
              line-height: 16px;
              margin-top: 10px;
            }
          }
          .intro {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: #4E62E8;
            border-radius: 20px;
            display: flex;
            flex-direction: column;
            align-content: center;
            justify-content: center;
            opacity: 0;
            .name {
              font-size: 48px;
              font-family: 'HelveticaNeue-Bold, HelveticaNeue';
              font-weight: bold;
              color: #FFFFFF;
              line-height: 48px;
            }
            .con {
              font-size: 15px;
              font-family: 'HelveticaNeue';
              color: #FFFFFF;
              line-height: 22px;
              margin-top: 26px;
            }
          }
          &:hover {
            .intro {
              opacity: 1;
            }
          }
        }
      }
    }

    &#portfolio {
      margin-top: 120px;
      padding-top: 100px;
      padding-bottom: 99px;
      background: #F0F2F7;
      .imgs {
        margin-top: 79px;
        display: flex;
        justify-content: space-between;
        align-content: center;
        img {
          width: 262px;
          height: 182px;
        }
      }
    }

    &#cooperation {
      margin-top: 100px;
      img {
        width: 1200px;
        height: 308px;
        margin: 100px 0 130px 0;
      }
    }

  }
}

.footer {
  background: #4E62E8;
  padding-bottom: 100px;
  .footer_content {
    height: 196px;
    padding: $mainContentPadding;
    background: #F0F2F7;
    display: flex;
    justify-content: center;
    align-items: center;    
    p {
      font-size: 20px;
      font-family: 'HelveticaNeue';
      color: #212226;
      line-height: 24px;
      span {
        font-size: 20px;
        font-family: 'HelveticaNeue-Bold, HelveticaNeue';
        font-weight: bold;
        color: #212226;
        line-height: 25px;
        margin-left: 39px;
      }
    }
  }
}
</style>