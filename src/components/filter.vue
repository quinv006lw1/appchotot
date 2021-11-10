<template>
	<Page actionBarHidden="true">
    <StackLayout>
        <ActionBar :text="prod.name" :goback="true" :back="false" backgroundColor="yellow"/>
        <ScrollView>
            <RadListView 
                    v-if="$sell_obj.cat_flag"
                    ref="listView"
                    for="i in product"
                    @itemTap="seeDetails">
                    <v-template>
                        <GridLayout rows="100" columns="100,*" v-show="i.cat.type == prod.type">
                            <Image :src="i.pic[0]" stretch="fill" col="0" row="0"/>  
							<StackLayout col="1" row="0" verticalAlignment="center">
								<Label :text="i.cat.name" textWrap="true" />
								<Label :text="i.sub_cat_name" textWrap="true" />
								<Label :text="i.prod.price" textWrap="true" />          
							</StackLayout>
                        </GridLayout>
                    </v-template>
            </RadListView>
        </ScrollView>
    </StackLayout>
	</Page>
</template>

<script>
import ActionBar from "./ActionBar";
import CreateNews from "./createNews";
import App from "./App";
import Detail from "./detail";
export default {
  props:["prod"],
  components: {
    ActionBar,
  },
  data() {
    return {
      searchbar:false,
      length:this.$sell_arr.length,
      product:this.$sell_arr?this.$sell_arr:[]
    }
  },
  methods: {
    seeDetails({item}) {
      this.$navigateTo(Detail, {
        transition: {
          name: "slide",
          duration: "200"
        },
        props: {
          prod: item,
          index:'',
          editabled:false 
        }
      });
    },
  },
  
};
</script>
<style scoped>


</style>