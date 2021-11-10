<template>
    <Page actionBarHidden="true">
      <StackLayout>
        <ActionBar text="Xem tin đăng mới" :back="false" :goback="true" backgroundColor="yellow"/>
        <StackLayout>
        <Image :src="i.image" stretch="fill" />
          <Label :text="i.name" textWrap="true"  class="name"/>
          <Label :text="'Thuộc thể loại: ' + i.type" textWrap="true" />
          <Label :text="i.description" textWrap="true" />
        </StackLayout>
    </StackLayout>
    </Page>
    
</template>

<script>
import ActionBar from "./ActionBar";
export default {
    props:['i'],
  components: {
    ActionBar,
  },
  data() {
    return {

    }
  },
  methods: {

  },
  
};
</script>
<style scoped>
Image{
    width: 70%;
    height:200px
}
Label
{
    font-size:25px;
    margin-left:10px
}
.name{
    color:red;
    text-align:center;
    margin: 10px 10px;
    font-size:30px;
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

}

</style>