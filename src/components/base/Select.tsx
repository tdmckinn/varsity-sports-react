import * as React from 'react'
import ReactSelect from 'react-select'
import { Props } from 'react-select/lib/Select'

interface VsfSelectProps extends Props {}

const Select = (props: VsfSelectProps) => (
  <ReactSelect backspaceRemovesValue={false} {...props} />
)

export default Select

// {/* <template>
//   <v-select
//     label="value"
//     :inputId="id"
//     :placeholder="placeholder"
//     :options="items"
//     :onChange="onChange"
//   >
//   </v-select>
// </template> */}

// {/* <script lang="ts">
// import Vue from 'vue'

// export default Vue.extend({
//   props: {
//     id: String,
//     items: Array,
//     placeholder: String,
//   },
//   data() {
//     return {
//       isActive: false
//     }
//   },
//   methods: {
//     onChange(item) {
//       this.$emit('input', item.value || item)
//     }
//   }
// })
// </script>
//  */}
