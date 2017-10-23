<template>
    <div id="app" class="container-fluid">
        <div class="hero is-primary">
            <div class="container">
                <div class="hero-body">
                    <h1 class="title">
                       <router-link :to="'/'">My Blog</router-link>
                    </h1>
                </div>
            </div>
        </div>
        <div class="container">
            <router-view/>
        </div>
    </div>
</template>

<script>
export default {
    name: 'app'
};
</script>

<style lang="scss">
@import "~bulma";
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
