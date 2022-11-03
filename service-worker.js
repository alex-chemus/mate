/* eslint-disable */
import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'

precacheAndRoute(self.__WB_MANIFEST)

const matchCallback = ({ url }) => {
  return url.origin !== 'https://alex-chemus.github.io'
}

const handlerCallback = async ({ request }) => {
  console.log('handle fetch request')
  try {
    const response = await fetch(request)
    return response
  } catch (error) {
    console.log('failed to fetch')
    return new Response(JSON.stringify({
      status: 'offline'
    }))
  }
}

registerRoute(matchCallback, handlerCallback)
