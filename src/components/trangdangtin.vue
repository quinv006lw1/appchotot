<template>
    <StackLayout>
        <ActionBar text="Đăng tin" :back="false" backgroundColor="yellow"/>
        <GridLayout rows="*" columns="*" backgroundColor="white">
          <Button col="0" row="0" text="Nhấn để tạo tin mới" @tap="createNews" verticalAlignment="center" horizontalAlignment="center"/>
        </GridLayout>
    </StackLayout>
</template>

<script>
import ActionBar from "./ActionBar";
import CreateNews from "./createNews";
export default {
  name: "tab-localhost",
  components: {
    ActionBar,
  },
  data() {
    return {
      searchbar:false
    }
  },
  methods: {
    createNews(){
      this.$navigateTo(CreateNews)
    }
  },
  
};
</script>
<style scoped>


</style>