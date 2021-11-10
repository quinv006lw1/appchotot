<template>
    <Page actionBarHidden="true">
      <StackLayout>
        <ActionBar :text="editabled?'Chỉnh sửa tin đăng':'Chi tiết tin đăng'" :back="false" :goback="true" backgroundColor="yellow"/>
        <ScrollView>
          <StackLayout>

            <Label text.decode="&#xf030; " @tap="takePicture" class="take-picture-icon fas" v-if="editabled"/>
            <Label class="header" text="Hình sản phẩm" />
            <ScrollView class="picture-gallery" orientation="horizontal">
              <StackLayout orientation="horizontal">
                  <GridLayout rows="100,50" columns="100" v-for="(image,index) in prod.pic" :key="index">
                      <Image col="0" row ="0" class="gallery-item" :src="image" stretch="aspectFill" width="100" height="100"/>
                      <Button col="0" row ="1" text="Delete" @tap="onCamDeleteTap(image,index)" class="fab btn btn-active" v-if="editabled"/>
                  </GridLayout>       
              </StackLayout>                        
            </ScrollView>

            <StackLayout class="form">
              <Label class="header" text="Thông tin người đăng" />
                <StackLayout class="input-field" marginBottom="25">
                    <Label text="Họ tên" textWrap="true" />
                    <TextField class="input" hint="Họ tên" autocorrect="false" autocapitalizationType="none"
                    returnKeyType="next" fontSize="18" :editable="editabled" :text="prod.user.name" v-model="prod.user.name" />
                    <StackLayout class="hr-light" />
                </StackLayout>

                <StackLayout class="input-field" marginBottom="25">
                    <Label text="SDT" textWrap="true" />
                    <TextField ref="phone" class="input" hint="SDT" keyboardType="number" :text="prod.user.phone" returnKeyType="next" fontSize="18" :editable="editabled" v-model="prod.user.phone" />
                    <StackLayout class="hr-light"  />
                </StackLayout>

                <StackLayout  class="input-field">
                    <Label text="Địa chỉ" textWrap="true" />
                    <TextField ref="address" class="input" hint="Địa chỉ" :text="prod.user.address" returnKeyType="done"
                    fontSize="18" :editable="editabled" v-model="prod.user.address"/>
                    <StackLayout class="hr-light" />
                </StackLayout>
            </StackLayout>
              <StackLayout class="form">

                <Label class="header" text="Thông tin sản phẩm" />

                <StackLayout class="input-field" marginBottom="25">
                    <Label text="Giá sản phẩm" textWrap="true" />
                    <TextField class="input" hint="Mời nhập số tiền" keyboardType="number" autocorrect="false" autocapitalizationType="none" :text="prod.prod.price"
                    returnKeyType="next" fontSize="18" :editable="editabled" v-model="prod.prod.price"/>
                    <StackLayout class="hr-light" />
                </StackLayout>

                <StackLayout class="input-field" marginBottom="25">
                    <Label text="Mô tả sản phẩm" textWrap="true" />
                    <TextView class="input" hint="Mô tả (trên 10 ký tự)" autocorrect="false" autocapitalizationType="none" :text="prod.prod.desc"
                    returnKeyType="done" fontSize="18" :editable="editabled" v-model="prod.prod.desc"/>
                    <StackLayout class="hr-light" />
                </StackLayout>
            </StackLayout>
            <Button v-if="editabled && prod.pic.length > 0 && prod.user.name && prod.user.phone && prod.user.address && prod.prod.price && prod.prod.desc" text="Cập nhật" @tap="update" class="fab btn btn-active" />

          </StackLayout>
        </ScrollView>
        
      </StackLayout>
    </Page>
    
</template>
<script>
// import View from "./view"
import ActionBar from "./ActionBar";
import App from "./App";
const cameraModule = require("nativescript-camera");
export default {
  components: {
    ActionBar,
  },
  props:["prod","editabled","index"],
  data(){
    return{
      // editabled:'',
    }
  },
  methods:{
    takePicture() {
      let that = this;
      cameraModule
          .takePicture({
              width: 300,
              height: 300, 
              keepAspectRatio: true,
              saveToGallery: false 
          })
          .then(imageAsset => {
              that.prod.pic.unshift(imageAsset)
          })
          .catch(err => {
              console.log("Error -> " + err.message);
          });
    },
    onCamDeleteTap(e,index){
        this.prod.pic.splice(index, 1);
    },
    update(){
      this.$sell_arr[this.index].pic = this.prod.pic;
      this.$sell_arr[this.index].user.name = this.prod.user.name;
      this.$sell_arr[this.index].user.phone = this.prod.user.phone;
      this.$sell_arr[this.index].user.address = this.prod.user.address;
      this.$sell_arr[this.index].prod.price = this.prod.prod.price;
      this.$sell_arr[this.index].prod.desc = this.prod.prod.desc;
      this.$navigateTo(App,{
            props:{selectedIndex:3}
      })
    }
  }
}
</script>
<style scoped>
/*----------------form*/
.form {
		margin-left: 30;
		margin-right: 30;
		flex-grow: 2;
		vertical-align: middle;
	}

	.logo {
		margin-bottom: 12;
		height: 90;
		font-weight: bold;
	}

	.header {
		horizontal-align: center;
		font-size: 25;
		font-weight: 600;
		margin-top: 70;
		margin-bottom: 70;
		text-align: center;
		color: #D51A1A;
	}

	.input-field {
		margin-bottom: 25;
	}

	.input {
		font-size: 18;
		placeholder-color: #A8A8A8;
	}

	.input-field .input {
		font-size: 54;
	}

	.btn-primary {
		height: 50;
		margin: 30 5 15 5;
		background-color: #D51A1A;
		border-radius: 5;
		font-size: 20;
		font-weight: 600;
	}

	.login-label {
		horizontal-align: center;
		color: #A8A8A8;
		font-size: 16;
	}

	.sign-up-label {
		margin-bottom: 20;
	}

	.bold {
		color: #000000;
	}
/*---------------camera */
.take-picture-icon {
    horizontal-align: center;
    background-color: rgb(105, 105, 241);
    padding: 12;
    border-width: 1.2;
    border-color: black;
    border-radius: 14;
    margin-top: 20;
    margin-bottom: 20;
    color: white;
    font-size: 30;
    padding-left: 20;
}

.picture-gallery {
    margin-top: 20;
}

.gallery-item {
    margin: 10;
}
</style>