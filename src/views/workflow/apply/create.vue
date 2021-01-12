<template>
		<apply-detail :is-edit="false" />
</template>

<script>
    import ApplyDetail from './../components/ApplyDetail'
    export default {
        name: "create",
        components: { ApplyDetail },
    }
</script>