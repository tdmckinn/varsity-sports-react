import * as React from 'react'

import './styles/DraftGrade.scss'

const DraftGrade = ({ grade }: { grade: string }) => (
  <div className="draft-grade">{grade}</div>
)

export default DraftGrade

// {/* <script lang="ts">
// import Vue from 'vue'

// export default Vue.extend({
//   props: {
//     grade: String
//   }
// })
// </script> */}
