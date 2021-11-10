<template>
    <Page class="page" actionBarHidden="true">
      <TabView :selectedIndex="selectedIndex" androidTabsPosition="bottom" selectedTabTextColor="orange" androidSelectedTabHighlightColor="blue" class="fas tab-title" borderRadius="50">
            <TabViewItem :title="'\uf015 \n Trang chủ'">
                <tab-global></tab-global>           
            </TabViewItem>
             <TabViewItem :title="'\uf328 \n Đăng tin'">
                <tab-localhost></tab-localhost>
            </TabViewItem>
            <TabViewItem :title="'\uf007 \n Tôi bán'">
                <tab-local></tab-local>
            </TabViewItem>
        </TabView>            
	</Page>    
</template>

<script>
import Homepage from "@/components/Homepage";
import Trangdangtin from "@/components/trangdangtin";
import CurrentSold from "@/components/currentSold";
export default {
//   name: "dashboard-page",
  components: {
    "tab-global": Homepage,
    "tab-localhost": Trangdangtin,
    "tab-local": CurrentSold,
  },
  props:["selectedIndex"],
  data(){
    return{
      selectedIndex:''
    }
  },
  computed: {
  },
  methods: {

  },
};
</script>
<style scoped>

</style>