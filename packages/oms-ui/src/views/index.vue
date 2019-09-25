<template>
  <div id="oms">
    <Words size="medium">
      <Flex column flex="1" height="100%" v-bind:class="{'oms-content-hidden': !!activeModal}">
        <OMSHeader />
        <Flex row :flex="1" overflow="hidden">
          <OMSLeft />
          <OMSCenter />
          <OMSRight />
        </Flex>
        <OMSFooter />
      </Flex>
      <Modals />
    </Words>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Flex from '~/components/Flex.vue'
import Words from '~/components/Words.vue'

import OMSHeader from './OMSHeader.vue'
import OMSCenter from './OMSCenter.vue'
import OMSRight from './OMSRight.vue'
import OMSLeft from './OMSLeft.vue'
import OMSFooter from './OMSFooter.vue'

import Modals from './Modals/index.vue'

export default {
  components: { Flex, Words, OMSHeader, OMSCenter, OMSRight, OMSLeft, OMSFooter, Modals },
  computed: {
    ...mapGetters({
      activeModal: 'getActiveModal',
    }),
  },
}
</script>

<style lang="less">
.oms-content-hidden {
  filter: blur(2px);
}
</style>
