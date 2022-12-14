<script lang="ts" setup>
import { AuthButton } from '@/UI'
import {
  GoogleAuthButton, VkAuthButton, AppleAuthButton,
  FacebookAuthButton, LandingHeader, LandingFooter,
  LandingSlider
} from '@/features/landing'
import { useStore } from 'vuex'
import { IState } from '@/store/types'

const { state } = useStore<IState>()
</script>


<template>
  <main :class="state.theme">
    <div class="header-container">
      <landing-header />
    </div>

    <section class="main-container">
      <h2 :class="[state.theme, 'uppercase']">Начни бесплатно</h2>

      <div class="grid-container">
        <div class="buttons-container">
          <h1 :class="state.theme">На пути к будущему</h1>
          <h3 :class="state.theme">Стантье частю Mate прямо сейчас!</h3>

          <div class="buttons-wrapper">
            <div class="media-buttons">
              <google-auth-button />
              <vk-auth-button />
              <apple-auth-button />
              <facebook-auth-button />
            </div>

            <div class="div-separator">или</div>

            <auth-button :centered="true" :primary="true">
              Войти в аккаунт
            </auth-button>

            <div class="no-akk">
              <p class="text" :class="state.theme">Ещё нет аккаунта?</p>
              <auth-button :centered="true" :text-accent="true">
                Зарегистрировать аккаунт
              </auth-button>
            </div>
          </div>
        </div>

        <div class="preview-container">
          <landing-slider />
        </div>
      </div>
    </section>
    <img class="line-separator" src="@/assets/line-separator.svg" alt="" />

    <div class="footer-container">
      <landing-footer />
    </div>
  </main>
</template>


<style lang="scss" scoped>
@import '@/styles/style.scss';

main {
  min-height: 100vh;
  padding: 53px 0 15px;

  &.light {
    background-color: var(--light);
  }

  &.dark {
    background-image: linear-gradient(86.16deg, #2A2837 48.48%, #353840 97.23%);
  }
}

.header-container {
  margin-bottom: 140px;
}

.main-container {
  @include container;
  padding: 0 34px;
}

h1 {
  font-family: var(--ff-ubuntu);
  font-weight: var(--fw-bold);
  font-size: 58px;
  margin-bottom: 26px;
  color: var(--text-color);
}

h2 {
  font-family: var(--ff-ubuntu);
  font-weight: var(--fw-bold);
  font-size: 20px;
  margin-bottom: 64px;
  margin-bottom: 13px;

  &.light {
    color: #ABB2BE;
  }

  &.dark {
    color: var(--gray-2);
  }

  &.uppercase {
    text-transform: uppercase;
  }
}

h3 {
  font-family: var(--ff-ubuntu);
  font-weight: var(--fw-bold);
  font-size: 20px;
  color: var(--text-color);
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.buttons-wrapper {
  width: fit-content;
  margin-top: 49px;
}

.media-buttons {
  display: grid;
  grid-auto-flow: row;
  grid-gap: 13px;
  width: fit-content;
}

.div-separator {
  height: 50px;
  width: min-content;
  font-family: var(--ff-ubuntu);
  font-weight: var(--fw-meduim);
  font-size: 16px;
  color: var(--gray-1);
  @include flex(center, center);
  margin: 0 auto;
}

.no-akk {
  margin-top: 57px;

  .text {
    font-size: 16px;
    font-weight: var(--fw-medium);
    font-family: var(--ff-ubuntu);
    margin-bottom: 16px;
    color: var(--text-color);
  }
}

.line-separator {
  position: absolute;
  z-index: 0;
  top: 0;
  left: 50%;
  transform: translateX(-70%);
}

.preview-container {
  @include flex(flex-start, center, column);
}

.footer-container {
  margin-top: 58px;
}
</style>
