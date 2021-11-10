<template>
<StackLayout>
    <SearchBar
        v-model="searchQuery"
        @textChange="onTextChanged"
        @submit="onSubmit"
        textFieldBackgroundColor="white"
        ref="searchBar"
        v-if="back"
      />
      <GridLayout class="action-bar" rows="*" columns="50,*,50" v-if="!back">
        <!-- <Label v-if="!back" col="0" row="0" class="fas" @tap="$navigateBack()" :text="'\uf060'" textAlignment="center" verticalAlignment="center"/> -->
        <Label v-if="goback" col="0" row="0" class="fas" @tap="$navigateBack()" :text="'\uf060'" verticalAlignment="center" horizontalAlignment="center"/>
        <Label col="1" row="0" class="header" :text="text" textAlignment="center" />
        <Label col="2" row="0" class="fas"/>
      </GridLayout>
</StackLayout>
</template>

<script>

export default {
  // name: "actionbar-component",
  component:{

  },
  props: {
    text: {},
    back: {
      type: Boolean,
      default: true
    },
    goback: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      searchbar: true
    };
  },
  methods: {
    toggleSearch() {
      this.searchbar = !this.searchbar;
    }
  },
  mounted(){
    setTimeout(()=>this.$refs.searchBar && this.$refs.searchBar.nativeView.dismissSoftInput(),2000)
  }
};
</script>
<style>
.action-bar {
  background-color: yellow;
  color: #131426;
  font-weight: bold;
  font-size: 20;
  font-family: "Quicksand";
  height: 30;
}
</style>