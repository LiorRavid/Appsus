export default {
    template: `
    <!-- <div class = "mail-filter"> -->
    <div class="mail-filter flex justify-center">
        <div class="box">
                <div class="btn-search"></div>
                <input v-model="filterBy.search" @input="filter" type="text" placeholder="search">
                <select  v-model="filterBy.isRead" @change = "filter" value="All">
                    <option>All</option>
                    <option>Read</option>
                    <option>Un-Read</option>
                </select>
        </div>
    </div>
    `,

    data() {
        return {
            filterBy: {
                isRead: '',
                search: '',

            }
        }
    },
    methods: {
        filter() {
            this.$emit('filtered', {...this.filterBy });
        },
    },
}