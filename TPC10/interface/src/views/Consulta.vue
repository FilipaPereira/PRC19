<template>
    <ConsultaFilme :idFilme="$route.params.id"/>
</template>

<script>
// @ is an alias to /src
import ConsultaFilme from '@/components/ConsultaFilme.vue'

export default {
  name: 'FilmeConsulta',
  components: {
    ConsultaFilme
  }
}
</script>
