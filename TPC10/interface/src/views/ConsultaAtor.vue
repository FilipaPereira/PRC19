<template>
    <ConsultaAtor :idAtor="$route.params.id"/>
</template>

<script>
// @ is an alias to /src
import ConsultaAtor from '@/components/ConsultaAtor.vue'

export default {
  name: 'AtorConsulta',
  components: {
    ConsultaAtor
  }
}
</script>
