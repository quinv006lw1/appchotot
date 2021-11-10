<template>
    <Page actionBarHidden="true">
        <StackLayout>
            <ActionBar text="Tin mới" :back="false" backgroundColor="yellow"/>
            <StackLayout>

                <RadListView 
                    v-if="$sell_obj.cat_flag"
                    ref="listView"
                    for="item in cat"
                    @itemTap="onCatTap">
                    <v-template>
                        <GridLayout rows="50" columns="50,*,50">
                            <Label class="fas" col="0" row="0" :text="item.ico | fonticon" verticalAlignment="center" horizontalAlignment="center"></Label>
                            <Label :text="item.name" col="1" row="0" verticalAlignment="center"/>
                            <Label class="fas" :text="'fa-angle-right' | fonticon" col="2" row="0" verticalAlignment="center" horizontalAlignment="center"></Label>
                        </GridLayout>
                    </v-template>
                </RadListView>

                <RadListView 
                    v-if="!$sell_obj.cat_flag && $sell_obj.sub_cat_flag"
                    ref="listView2"
                    for="(item2,index) in sub_cat">
                    <v-template>
                        <RadListView 
                            ref="listView3"
                            for="item3 in item2.cat"
                            @itemTap="onSubCatTap">
                            <v-template>
                                <GridLayout rows="50" columns="*,50" v-show="item2.type == $sell_obj.cat.type">
                                    <Label :text="item3.name" col="0" row="0" verticalAlignment="center"/>
                                    <Label class="fas" :text="'fa-angle-right' | fonticon" col="1" row="0" verticalAlignment="center" horizontalAlignment="center"></Label>
                                </GridLayout>
                            </v-template>
                        </RadListView>
                    </v-template>
                </RadListView>

                <StackLayout class="form" v-if="!$sell_obj.cat_flag && !$sell_obj.sub_cat_flag && $sell_obj.form">

				    <Label class="header" text="Thông tin người đăng" />

                    <StackLayout class="input-field" marginBottom="25">
                        <TextField class="input" hint="Họ tên" autocorrect="false" autocapitalizationType="none" v-model="user.name"
                        returnKeyType="next" fontSize="18" />
                        <StackLayout class="hr-light" />
                    </StackLayout>

                    <StackLayout class="input-field" marginBottom="25">
                        <TextField ref="phone" class="input" hint="sdt" keyboardType="number" v-model="user.phone" returnKeyType="next" fontSize="18" />
                        <StackLayout class="hr-light" />
                    </StackLayout>

                    <StackLayout  class="input-field">
                        <TextField ref="address" class="input" hint="Địa chỉ" v-model="user.address" returnKeyType="done"
                        fontSize="18" />
                        <StackLayout class="hr-light" />
                    </StackLayout>

                    <Button v-show="user.name && user.phone && user.address" text="Next" @tap="onFormTap" class="fab btn btn-active" />
			    </StackLayout>

                <StackLayout v-if="!$sell_obj.cat_flag && !$sell_obj.sub_cat_flag && !$sell_obj.form && $sell_obj.cam">
                    <Label text.decode="&#xf030; " @tap="takePicture" class="take-picture-icon fas" />
                    <Label text="Bạn cần đăng ít nhất một hình" textWrap="true" fontWeight="600" fontSize="18" horizontalAlignment="center"/>
                    <ScrollView class="picture-gallery" orientation="horizontal">
                        <StackLayout orientation="horizontal">
                            <GridLayout rows="100,50" columns="100" v-for="(image,index) in arrayPictures" :key="index">
                                <Image col="0" row ="0" class="gallery-item" :src="image" stretch="aspectFill" width="100" height="100"/>
                                <Button col="0" row ="1" text="Delete" @tap="onCamDeleteTap(image,index)" class="fab btn btn-active" />
                            </GridLayout>
                            
                        </StackLayout>
                        
                    </ScrollView>
                    
                    <Button v-show="arrayPictures.length" text="Next" @tap="onCamTap" class="fab btn btn-active" />
                </StackLayout>

                <StackLayout class="form" v-if="!$sell_obj.cat_flag && !$sell_obj.sub_cat_flag && !$sell_obj.form && !$sell_obj.cam && $sell_obj.prod_form">

				    <Label class="header" text="Thông tin sản phẩm" />

                    <StackLayout class="input-field" marginBottom="25">
                        <TextField class="input" hint="Mời nhập số tiền" keyboardType="number" autocorrect="false" autocapitalizationType="none" v-model="prod.price"
                        returnKeyType="next" fontSize="18" />
                        <StackLayout class="hr-light" />
                    </StackLayout>

                    <StackLayout class="input-field" marginBottom="25">
                        <TextView class="input" hint="Mô tả (trên 10 ký tự)" autocorrect="false" autocapitalizationType="none" v-model="prod.desc"
                        returnKeyType="done" fontSize="18" />
                        <StackLayout class="hr-light" />
                    </StackLayout>

                    <Button v-show="prod.price && prod.price>0 && prod.desc && prod.desc.length > 10" text="Đăng tin ngay" @tap="onPriceTap" class="fab btn btn-active" />
			    </StackLayout>

            </StackLayout>
        </StackLayout>
    </Page>
    
</template>

<script>
import ActionBar from "./ActionBar";
import CreateNews from "./createNews";
import App from "./App";
const cameraModule = require("nativescript-camera");
import * as http from "http";
export default {
    name: "tab-localhost",
    components: {
        ActionBar,
    },
    data() {
        return {
            searchbar:false,
            user:{},

            arrayPictures: [],

            pictureFromCamera: null,
            textPicture: "Take a Picture",

            prod:{},

            searchedText: "",
            searchQuery: "",

            cat:[
                {
                    name:'Bất động sản',
                    type:"bds",
                    ico:"fa-building"
                },
                {
                    name:'Xe cộ',
                    type:"xe",
                    ico:"fa-motorcycle"
                },
                {
                    name:'Đồ điện tử',
                    type:"ddt",
                    ico:"fa-tv"
                },
                {
                    name:'Thú cưng',
                    type:"tc",
                    ico:"fa-dog"
                },
                {
                    name:'Giải trí',
                    type:"gt",
                    ico:"fa-gamepad"
                },
                {
                    name:'Thời trang',
                    type:"tt",
                    ico:"fa-tshirt"
                },
            ],
            sub_cat:[
                {
                    type:"bds",
                    cat:[
                        {
                            name:"Nhà ở"
                        },
                        {
                            name:"Chung cư"
                        },
                        {
                            name:"Phòng trọ"
                        }
                    ]
                },
                {
                    type:"xe",
                    cat:[
                        {
                            name:"Xe máy"
                        },
                        {
                            name:"Ô tô"
                        },
                        {
                            name:"Xe đạp"
                        }
                    ]
                },
                {
                    type:"ddt",
                    cat:[
                        {
                            name:"Điện thoại"
                        },
                        {
                            name:"Laptop"
                        },
                        {
                            name:"máy tính"
                        }
                    ]
                },
                {
                    type:"tc",
                    cat:[
                        {
                            name:"Chó"
                        },
                        {
                            name:"Mèo"
                        },
                        {
                            name:"Gà"
                        }
                    ]
                },
                {
                    type:"Giải trí",
                    cat:[
                        {
                            name:"Sách"
                        },
                        {
                            name:"Game"
                        },
                        {
                            name:"Nhạc cụ"
                        }
                    ]
                },
                {
                    type:"tt",
                    cat:[
                        {
                            name:"Quần"
                        },
                        {
                            name:"Áo"
                        },
                        {
                            name:"Đồng hồ"
                        }
                    ]
                },
            ],
        }
    },
    methods: {
        createNews(){
            this.$navigateTo(CreateNews,{
                transition: {
                    name:'slide',
                    duration: 200
                }
            })
        },
        onCatTap({ item }) {

            this.$sell_obj.cat=item;
            this.$sell_obj.cat_flag=false;
            this.$sell_obj.sub_cat_flag=true;

            this.createNews();
        },

        onSubCatTap({item}){
            this.$sell_obj.sub_cat_name=item.name;
            this.$sell_obj.sub_cat_flag=false;
            this.$sell_obj.form=true;

            this.createNews();
            
        },

        onFormTap(){
            this.$sell_obj.form=false;
            this.$sell_obj.cam = true;
            this.$sell_obj.user = this.user

            this.createNews();
        },
        onCamTap(){
            this.$sell_obj.cam = false;
            this.$sell_obj.prod_form = true;
            this.$sell_obj.pic = this.arrayPictures;

            this.createNews();
        },
        onPriceTap(){
            this.$sell_obj.prod_form = false;
            this.$sell_obj.prod = this.prod;
            this.$sell_obj.cat_flag = true;
            this.$sell_arr.unshift({ ...this.$sell_obj });

            this.$sell_obj = {};
            this.$navigateTo(App);
        },
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
                    that.arrayPictures.unshift(imageAsset)
                })
                .catch(err => {
                    console.log("Error -> " + err.message);
                });
        },
        onCamDeleteTap(e,index){
            this.arrayPictures.splice(index, 1);
        }
    },
    mounted(){
        cameraModule.requestPermissions().then( 
            success => { 
            },
            failure => {
            }
        )
    }
};
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