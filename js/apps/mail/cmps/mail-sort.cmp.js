// export default {
//     template: `
//     <div class = "mail-sort">
//         <select @change = "sort" value="None">
//             <option>None</option>
//             <option v-model="sortBy.Title">Title</option>
//             <option v-model="sortBy.Date">Date</option>
//         </select>
//     </div>
//     `,

//     data(){
//         return {
//             filterBy:{
//                 Title:'',
//                 Date:'',

//             }
//         }
//     },
//     methods: {
//         sort() {
//             this.$emit('sorted', { ...this.sortBy });
//         },
//     },
// }