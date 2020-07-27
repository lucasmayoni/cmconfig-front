<template>
    <div class="vendor-filter">
        <b-form inline>
            <b-input
                v-model="inputValue"
                class="mb-2 mr-sm-2 mb-sm-0"
                placeholder="Nombre del Modelo"/>
        </b-form>
    </div>
</template>
<script>

export default {
    name: 'VendorFilter',
    data() {
        return {
            inputValue: ''
        }
    },
    watch: {
        inputValue() {
            this.$emit('searchQuery', this.inputValue);
        }
    },
}
</script>
<style>
.vendor-filter {
    padding-top:20px;
    padding-bottom:20px;
}
</style>
