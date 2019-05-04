<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
export default {
    // async created() {
    // 	const loading = this.$loading();
    // 	try {
    // 		await this.$store.dispatch("getMe");
    // 	} catch (e) {
    // 		window.location.replace('/login')
    // 	} finally {
    // 		loading.close();
    // 	}
    // }
};
</script>

<style lang="scss">
#app {
    background: $--background-color-base;
}
</style>
