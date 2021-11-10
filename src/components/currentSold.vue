<template>
    <StackLayout>
        <ActionBar :text="'Đang bán ('+length+')'" :back="false" backgroundColor="yellow"/>
        <ScrollView>
            <StackLayout>
                <GridLayout rows="100" columns="100,*,50" v-for="(i,index) in product" :key="index">
                    <Image :src="i.pic[0]" stretch="fill" col="0" row="0"/>                  
                    <StackLayout col="1" row="0" verticalAlignment="center">
                        <Label :text="i.cat.name" textWrap="true" />
                        <Label :text="i.sub_cat_name" textWrap="true" />
                        <Label :text="i.prod.price" textWrap="true" />          
                    </StackLayout>
                    <StackLayout col="2" row="0" verticalAlignment="center">                      
                        <Label class="fas" textWrap="true" fontSize="18" :text="'fa-edit' | fonticon" @tap="edit(i,index)"/>
                        <Label class="fas" textWrap="true" fontSize="18" :text="'fa-trash' | fonticon" @tap="del(i,index)"/>              
                    </StackLayout>                
                </GridLayout>
            </StackLayout> 
        </ScrollView>
    </StackLayout>
</template>

<script>
import ActionBar from "./ActionBar";
import CreateNews from "./createNews";
import App from "./App";
import Detail from "./detail";
export default {
  name: "tab-local",
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
    createNews(){
      this.$navigateTo(CreateNews)
    },
    edit(i,index){
        this.$navigateTo(Detail, { 
            props: { 
                prod: i,
                index:index,
                editabled:true 
            }
        });
    },
    del(i,index){
        this.$sell_arr.splice(index,1)
        this.$navigateTo(App,{
            props:{selectedIndex:3}
        })
    }
  },
  
};
</script>
<style scoped>


</style>