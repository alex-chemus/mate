<script lang="ts" setup>
import { ref, defineProps } from 'vue'
import { Logo } from '@/ui'
import { useTheme } from '@/utils'

defineProps<{
  fullName: string,
  img?: string,
  followers: string,
  following: string,
  nickname: string
}>()

const theme = useTheme()

/*const fullName = ref('Александр Соромотин')
const img = ref<string | null>(null)
const followers = ref('6 млн')
const following = ref('67')
const nickname = ref('alexandersoromotin')*/
//const bio = ref('Привет, я являюсь представителем компании FINDCREEK, а также создателем платформы FINDCREEK Mate. Изо дня в день мы трудимся только ради вас! ')
</script>

<template>
  <section class="card-section" :class="theme">
    <button class="more-button">
      <svg width="25" height="25" viewBox="0 0 25 25">
        <use href="@/assets/imgs/tabler-sprite.svg#tabler-dots-vertical" />
      </svg>
    </button>

    <img src="@/assets/imgs/profile-card-img.png" alt="FINDCREEK" class="banner-img" />

    <div class="profile-container">
      <div class="content-container">
        <div class="content-wrapper" :class="theme">
          <h5>{{ followers }}</h5>
          <p>Подписчиков</p>
        </div>

        <img v-if="img" :src="img" :alt="fullName" class="avatar" />
        <div v-else class="placeholder" />

        <div class="content-wrapper" :class="theme">
          <h5>{{ following }}</h5>
          <p>Подписок</p>
        </div>
      </div>

      <h3 class="fullname" :class="theme">{{ fullName }}</h3>
      <p class="nickname" :class="theme">@{{ nickname }}</p>

      <button class="button logo-button" :class="theme">
        <div class="logo">
          <logo height="19" width="15" />
        </div>
        <strong>FINDCREEK</strong>
      </button>

      <button class="button edit-button" :class="theme">
        <span>Редактировать профиль</span>
      </button>

      <div class="separator" />

      <!--<p class="bio" :class="theme">{{ bio }}</p>-->
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/assets/styles/style.scss';

.card-section {
  border-radius: 13px;
  overflow: hidden;
  border: 1px solid color.change($gray-1, $alpha: .25);
  position: relative;

  &.dark {
    background-color: var(--dark-theme-color-2);
  }

  &.light {
    background-color: var(--light);
  }
}

.more-button {
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 0 0 0 10px;
  padding: 6px;
  background-color: color.change($gray-1, $alpha: .1);
  color: var(--gray-1);
}

.banner-img {
  border-bottom: 1px solid color.change($gray-1, $alpha: .25);
  background-color: var(--light);
}

.profile-container {
  @include flex(flex-start, center, column);
  padding: 0 17px;
}

.content-container {
  //@include flex(space-between, center);
  display: grid;
  grid-template-columns: 1fr max-content 1fr;
  align-items: center;
  align-self: stretch;
  margin: 32px 0 12px;
}

.content-wrapper {
  @include flex(flex-start, center, column);

  h5 {
    margin: 0;
    margin-bottom: 10px;
    font-family: var(--ff-noto-sans);
    font-weight: var(--fw-bold);
    font-size: 16px;
  }

  &.light h5 {
    color: var(--dark-2);
  }

  &.dark h5 {
    color: var(--light);
  }

  p {
    font-size: 12px;
    font-family: var(--ff-ubuntu);
    font-weight: var(--fw-medium);
    margin: 0;
  }

  &.light p {
    color: var(--gray-1);
  }

  &.dark p {
    color: var(--gray-3);
  }
}

.avatar,
.placeholder {
  border-radius: 100vmax;
  width: 95px;
  height: 95px;
}

.avatar {
  object-fit: cover;
}

.placeholder {
  background-color: var(--gray-1);
}

.fullname {
  font-family: var(--ff-ubuntu);
  font-size: 16px;
  font-weight: var(--fw-medium);
  margin: 0;
  margin-bottom: 3px;

  &.dark {
    color: var(--light);
  }

  &.light {
    color: var(--dark-2);
  }
}

.nickname {
  font-family: var(--ff-noto-sans);
  font-size: 12px;
  margin: 0;
  margin-bottom: 18px;

  &.dark {
    color: var(--gray-3);
  }

  &.light {
    color: var(--gray-1);
  }
}

.button {
  background-color: transparent;
  @include flex(center, center);
  position: relative;
  align-self: stretch;
  padding: 7px;
  margin-bottom: 10px;

  &.light {
    border: 1px solid color.change($gray-1, $alpha: .2);

    strong {
      color: var(--dark-2)
    }
  }

  &.dark {
    border: 1px solid color.change($gray-3, $alpha: .5);

    strong {
      color: var(--light);
    }
  }

  .logo {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 5px;
    height: 19px;
  }

  strong {
    font-family: var(--ff-montserrat);
    font-size: 13px;
    font-weight: var(--fw-bold);
  }
}

.logo-button {
  border-radius: 8px;
}

.edit-button {
  border-radius: 10px;
  padding: 16px 0;

  span {
    font-family: var(--ff-ubuntu);
    font-size: 14px;
  }

  &.dark span {
    color: var(--light);
  }

  &.light span {
    color: #4d4d4d;
  }
}

.separator {
  height: 1px;
  background-color: color.change($gray-1, $alpha: .2);
  margin-bottom: 12px;
}

.bio {
  text-align: center;
  margin: 18px 0;
  font-family: var(--ff-ubuntu);
  font-size: 14px;
  line-height: 160%;

  &.dark {
    color: var(--light);
  }

  &.light {
    color: var(--dark-2);
  }
}
</style>
