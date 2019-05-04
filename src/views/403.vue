<template>
    <div class="error-403">
        <h1>对不起, 您无权访问该页面<br />或进行该操作</h1>
        <img />
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.error-403 {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}
h1 {
    color: $--color-text-regular;
    font-weight: 300;
    font-size: 3em;
    text-align: center;
}
</style>
