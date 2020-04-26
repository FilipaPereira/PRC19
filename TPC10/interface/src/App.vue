<template>
  <v-app>
    <v-content>
      <router-view></router-view>
      <div width="100%" class="ma-4 indigo darken-4 white--text" dark>
      Cinemateca PRC2020 {{ new Date().getFullYear() }}
      </div>
    </v-content>
  </v-app>
</template>
