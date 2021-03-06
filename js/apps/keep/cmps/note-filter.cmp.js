export default {
    template: `
        <div class="note-filter">
            <div>
                <span></span>
                <input @input="filter" v-model="filterBy.str" type="text" placeholder="Search...">
                <select  @change="filter" v-model="filterBy.type" name="type" id=""><option selected value="" >all</option>
                    <option value="note-txt">Text</option>
                    <option value="note-img">Image</option>
                    <option value="note-video">Video</option>
                    <option value="note-todos">List</option>
                </select>
</div>
        </div>
    `,
    data() {
        return {
            filterBy: {
                str: '',
                type: '',
            }
        };
    },
    methods: {
        filter() {
            console.log('', this.filterBy.type);
            this.$emit('filtered', {...this.filterBy });
            //deep copy
            // this.$emit('filtered', JSON.parse(JSON.stringify(this.filterBy)));
        }
    }
}