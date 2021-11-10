<template>
    <StackLayout>
      <ActionBar text="MyApp" :back="true" backgroundColor="yellow"/>

      <ScrollView>
        <GridLayout orientation="vertical" width="100%" columns="*" rows="*,*,*,*">
          <StackLayout col="0" row="0" backgroundColor="white">
            <GridLayout class="carousel-layout-fix">
              <Carousel
                height="300"
                width="100%"
                pageChanged="myChangeEvent"
                pageTapped="mySelectedEvent"
                indicatorColor="#fff000"
                finite="true"
                bounce="false"
                showIndicator="true"
                verticalAlignment="top"
                android:indicatorAnimation="swap"
                color="black"
                >
                <CarouselItem v-for="(i,index) in dau1" :key="index" id="slide1" backgroundColor="#b3cde0" verticalAlignment="middle">
                  <Image :src="i.imageUrl" stretch="fill" />

                </CarouselItem>
              </Carousel>
            </GridLayout>
        

            <ScrollView orientation="horizontal">
              <StackLayout orientation="horizontal">
                  <GridLayout rows="50,auto" columns="auto"  v-for="(i,index) in dauicon" :key="index" margin="10">
                    <Image row="0" :src="i.imageUrl" stretch="fill" height="50" horizontalAlignment="center" marginTop="20"/>
                    <Label fontSize="15" row="1" :text="i.title" textWrap="true" style="textAlign: center; color:red" marginTop="15"/>
                  </GridLayout>
              </StackLayout>
            </ScrollView>

        </StackLayout>


        <StackLayout
          verticalAlignment="top"
          backgroundColor="white"
          color="black"
          padding="10"
          row="1"
        >
          <GridLayout rows="auto" columns="auto,*,auto">
            <Label fontSize="20" text="Khám phá danh mục" col="0" textWrap="true" />
          </GridLayout>


          <ScrollView orientation="horizontal">
                <GridLayout rows="*" columns="*" orientation="horizontal" marginTop="10"> 
                    <GridLayout rows="*, *" if="rowCount>0" orientation="horizontal">

                      <StackLayout row="0" orientation="horizontal">
                        <card-view class="card" elevation="20"
                        v-for="(i,index) in rowCount" :key="index">
                          <GridLayout class="card-layout" rows="100, auto" columns="10, 200, 10" v-if="Items[(i - 1)].invId % 2 != 0" @tap="seeDetails2(Items[(i - 1)])">
                            <Image v-if="Items[(i - 1)].image" :src="Items[(i - 1) ].image"
                              stretch="fill" col="1" row="0" marginBottom="10" width="100"  horizontalAlignment="center"/>
                            <Label :text="Items[(i - 1) ].name" class row="1" col="1" textAlignment="center"/>
                          </GridLayout>
                        </card-view>
                      </StackLayout>

                      <StackLayout row="1" orientation="horizontal" marginTop="20" >
                          <card-view class="card" elevation="20"
                          v-for="(i,index) in rowCount" :key="index">
                            <GridLayout class="card-layout" rows="100, auto" columns="10, 200, 10" v-if="i != rowCount && Items[(i - 1)+1].invId % 2 ==0 " @tap="seeDetails2(Items[(i - 1)+1])">
                              <Image v-if="Items[(i - 1) +1].image"
                                :src="Items[(i - 1)  + 1].image"
                                stretch="fill" col="1" row="0" marginBottom="10" width="100"  horizontalAlignment="center" />
                              <Label :text="Items[(i - 1)  + 1].name" class row="1" col="1" textAlignment="center"/>     
                            </GridLayout>
                          </card-view>
                      </StackLayout>

                  </GridLayout>
              </GridLayout>
          </ScrollView>

          


        </StackLayout>


        

        <StackLayout verticalAlignment="top"
          backgroundColor="yellow"
          color="black"
          padding="10"
          row="2">
          <GridLayout rows="auto" columns="auto,*,auto">
            <Label fontSize="20" text="Tin Đăng của bạn" col="0" textWrap="true" />
          </GridLayout>
          <StackLayout>
          
            <GridLayout columns="*, *" if="rowCount3>0" v-for="i in rowCount3" :key="i"  orientation="horizontal">
              <card-view class="card" margin="10" col="0" elevation="20" 
              v-if="$sell_arr[(i - 1) * itemsPerRow] && $sell_arr[(i - 1) * itemsPerRow ].cat.name" 
              @tap="seeDetails($sell_arr[(i - 1) * itemsPerRow])"
              >
                <GridLayout class="card-layout" rows="150, auto,auto,auto" columns="*">
                  <Image v-if="$sell_arr[(i - 1) * itemsPerRow].pic" :src="$sell_arr[(i - 1) * itemsPerRow].pic[(i - 1)]"
                    stretch="aspectFill" colspan="3" row="0" />
                  <Label :text="$sell_arr[(i - 1) * itemsPerRow].cat.name" class row="1" />
                  <Label :text="$sell_arr[(i - 1) * itemsPerRow].prod.price | dollars" class row="2" />
                  <Button row="3" text="xem chi tiết" @tap="seeDetails($sell_arr[(i - 1) * itemsPerRow])"
                    class="btn m-t-10 add-button" />
                </GridLayout>
              </card-view>
              <card-view class="card" margin="10" col="1" elevation="20"
                v-if="$sell_arr[(i - 1) * itemsPerRow +1] && $sell_arr[(i - 1) * itemsPerRow +1].cat.name"
                @tap="seeDetails($sell_arr[(i - 1) * itemsPerRow +1])" >
                <GridLayout class="card-layout" rows="150, auto,auto,auto" columns="*">
                  <Image v-if="$sell_arr[(i - 1) * itemsPerRow+1].pic"
                    :src="$sell_arr[(i - 1) * itemsPerRow + 1].pic[(i - 1)]"
                    stretch="aspectFill" row="0" />
                  <Label :text="$sell_arr[(i - 1) * itemsPerRow + 1].cat.name" class row="1" />
                  <Label :text="$sell_arr[(i - 1) * itemsPerRow +1].prod.price | dollars" class row="2"
                  />
                  <Button row="3" text="xem chi tiết" @tap="seeDetails($sell_arr[(i - 1) * itemsPerRow +1])"
                    class="btn m-t-10 add-button" />
                </GridLayout>
              </card-view>
            </GridLayout>
            
            
          </StackLayout>
        </StackLayout>

        <StackLayout 
          verticalAlignment="top"
          backgroundColor="white"
          color="black"
          padding="10"
          row="3">
          <GridLayout rows="auto" columns="auto,*,auto">
            <Label fontSize="20" text="Tin Đăng mới" col="0" textWrap="true" />
          </GridLayout>
          <StackLayout>
          
            <GridLayout columns="*, *" if="rowCount2>0" v-for="i in rowCount2" :key="i"  orientation="horizontal">
              <card-view class="card" margin="10" col="0" elevation="20" 
              v-if="Items[(i - 1) * itemsPerRow] && Items[(i - 1) * itemsPerRow ].name" 
              @tap="seeItem(Items[(i - 1) * itemsPerRow])"
              >
                <GridLayout class="card-layout" rows="150, auto,auto,auto" columns="*">
                  <Image v-if="Items[(i - 1) * itemsPerRow].image" :src="Items[(i - 1) * itemsPerRow].image"
                    stretch="aspectFill" colspan="3" row="0" />
                  <Label :text="Items[(i - 1) * itemsPerRow].name" class row="1" />
                  <Label :text="Items[(i - 1) * itemsPerRow].price | dollars" class row="2" />
                  <Button row="3" text="xem chi tiết" @tap="seeItem(Items[(i - 1) * itemsPerRow])"
                    class="btn m-t-10 add-button" />
                </GridLayout>
              </card-view>
              <card-view class="card" margin="10" col="1" elevation="20"
                v-if="Items[(i - 1) * itemsPerRow +1] && Items[(i - 1) * itemsPerRow +1].name"
                @tap="seeItem(Items[(i - 1) * itemsPerRow +1])" >
                <GridLayout class="card-layout" rows="150, auto,auto,auto" columns="*">
                  <Image v-if="Items[(i - 1) * itemsPerRow+1].image"
                    :src="Items[(i - 1) * itemsPerRow + 1].image"
                    stretch="aspectFill" row="0" />
                  <Label :text="Items[(i - 1) * itemsPerRow + 1].name" class row="1" />
                  <Label :text="Items[(i - 1) * itemsPerRow +1].price | dollars" class row="2"
                  />
                  <Button row="3" text="xem chi tiết" @tap="seeItem(Items[(i - 1) * itemsPerRow +1])"
                    class="btn m-t-10 add-button" />
                </GridLayout>
              </card-view>
            </GridLayout>
            
            
          </StackLayout>
        </StackLayout>

      </GridLayout>
      
    </ScrollView>
  </StackLayout>
</template>

<script>
import ActionBar from "./ActionBar";
import Detail from "./detail";
import Filter from "./filter";
import SeeItem from "./seeItem";
export default {
  name: "local-tab",
  components: {ActionBar},
  data() {
    return {
      items: ["A", "B", "C", "D", "E", "F"],
      searchText: "",
      searchQuery: "",
      dau1: [
        {
          imageUrl: "~/assets/images/dau2.jpg"
        },
        {
          imageUrl: "~/assets/images/dau3.jpg"
        },
        {
          imageUrl: "~/assets/images/dau4.jpg"
        },
        {
          imageUrl: "~/assets/images/dau5.jpg"
        },
        {
          imageUrl: "~/assets/images/dau6.jpg"
        },
        {
          imageUrl: "~/assets/images/dau7.jpg"
        },
        {
          imageUrl: "~/assets/images/dau8.jpg"
        }
      ],
      dauicon: [
        {
          imageUrl: "~/assets/images/1.jpg",
          title: "Chợ tốt ưu đãi",
        },
        {
          imageUrl: "~/assets/images/2.jpg",
          title: "Nạp đồng tốt",
        },
        {
          imageUrl: "~/assets/images/3.jpg",
          title: "Tin đăng đã lưu",
        },
        {
          imageUrl: "~/assets/images/4.jpg",
          title: "Vòng quay may mắn",
        },
        {
          imageUrl: "~/assets/images/5.jpg",
          title: "Tìm kiếm đã lưu",
        },
        
      ],


      dau2: [
        {
          imageUrl: "~/assets/images/dau2.jpg",
          name: "Sedan",
          price: "$76/day",
          img: "~/assets/images/2019-Porsche-911-coupe-red-press-image.jpg",
          icon: "fa-heart",
          icons: "fa-cog",
          iconss: "fa-user",
          content: "Luxury",
          detail: "Automatic Transection",
          status: "Yes",
          prices: "$76",
          door: 2,
          seats: 2,
          luggage: 3
        }
      ],


      khampha: [
        {
          title: "Bất động sản",
          imageUrl: "~/assets/images/nha.png"
        },
        // {
        //   title: "Việc làm",
        //   imageUrl: "~/assets/images/lam.png"
        // },
        {
          title: "Xe cộ",
          imageUrl: "~/assets/images/xeco.png"
        },
        {
          title: "Thú cưng",
          imageUrl: "~/assets/images/cho.png"
        },
        {
          title: "Đồ điện tử",
          imageUrl: "~/assets/images/ddtpng.png"
        },
        {
          title: "Đồ gia dụng, nội thất",
          imageUrl: "~/assets/images/gd.png"
        },
        // {
        //   title: "Đồ ăn, thực phẩm",
        //   imageUrl: "~/assets/images/ta.png"
        // },
        // {
        //   title: "Tủ lạnh, Máy lạnh",
        //   imageUrl: "~/assets/images/ml.png"
        // },
        {
          title: "Giải trí, thể thao",
          imageUrl: "~/assets/images/giaitri.png"
        },
        {
          title: "thời trang, đồ dùng",
          imageUrl: "~/assets/images/thoitrang.png"
        },
        // {
        //   title: "Mẹ và bé",
        //   imageUrl: "~/assets/images/mb.png"
        // },
        // {
        //   title: "Đồ dùng văn phòng",
        //   imageUrl: "~/assets/images/vp.png"
        // },
        // {
        //   title: "dịch vụ, du lịch",
        //   imageUrl: "~/assets/images/dv.png"
        // },
        // {
        //   title: "Tất cả",
        //   imageUrl: "~/assets/images/tc.png"
        // },
        // {
        //   title: "Cho tặng miễn phí",
        //   imageUrl: "~/assets/images/qua.png"
        // },

      ],
      // searchText: "",
      // searchQuery: ""
      Items: [
        {
          invId: 1,
          name: "Bất động sản",
          image: "~/assets/images/nha.png",
          price: 999,
          type:'bds',
          description:
            "This round bottle is made of opaque bright rose glass.  It has a mid-length neck, stands about seven inches tall, and the ink on its label has been washed off."
        },
        // {
        //   invId: 2,
        //   name: "Việc làm",
        //   image: "~/assets/images/lam.png",
        //   price: 1499,
        //   description:
        //     "This round bottle is made of opaque chartreuse glass.  It has a mid-length neck, stands about six inches tall, and the ink on its label has been washed off."
        // },
        {
          invId: 3,
          name: "Xe cộ",
          image: "~/assets/images/xeco.png",
          price: 499,
          type:'xe',
          description:
            "This coffin-shaped bottle is made of opaque lilac glass.  It has a long neck, stands about five inches tall, and it has no label."
        },
        {
          invId: 4,
          name: "Thú cưng",
          image: "~/assets/images/cho.png",
          price: 299,
          type:'tc',
          description:
            "This cylindrical bottle is made of transparent bright turquoise glass.  It has a mid-length neck, stands about twelve inches tall, and it has a simple printed label."
        },
        {
          invId: 6,
          name: "Đồ điện tử",
          image: "~/assets/images/ddtpng.png",
          price: 899,
          type:'ddt',
          description:
            "This teardrop-shaped bottle is made of translucent bright purple glass.  It has a mid-length neck, stands about eleven inches tall, and most of its label has been torn off."
        },
        // {
        //   invId: 6,
        //   name: "Đồ gia dụng, nội thất",
        //   image: "~/assets/images/gd.png",
        //   price: 899,
        //   description:
        //     "This teardrop-shaped bottle is made of translucent bright purple glass.  It has a mid-length neck, stands about eleven inches tall, and most of its label has been torn off."
        // },
        // {
        //   invId: 7,
        //   name: "Đô ăn, ẩm thực đường phố",
        //   image: "~/assets/images/ta.png",
        //   price: 899,
        //   description:
        //     "This teardrop-shaped bottle is made of translucent bright purple glass.  It has a mid-length neck, stands about eleven inches tall, and most of its label has been torn off."
        // },
        // {
        //   invId: 8,
        //   name: "Tủ lạnh, máy lạnh, máy giặt",
        //   image: "~/assets/images/ml.png",
        //   description:
        //     "This teardrop-shaped bottle is made of translucent bright purple glass.  It has a mid-length neck, stands about eleven inches tall, and most of its label has been torn off."
        // },
        {
          invId: 9,
          name: "Giải trí",
          image: "~/assets/images/giaitri.png",
          type:'gt',
          description:
            "This teardrop-shaped bottle is made of translucent bright purple glass.  It has a mid-length neck, stands about eleven inches tall, and most of its label has been torn off."
        },
        {
          invId: 10,
          name: "Thời trang, đồ dùng cá nhân",
          image: "~/assets/images/thoitrang.png",
          type:'tt',
          description:
            "This teardrop-shaped bottle is made of translucent bright purple glass.  It has a mid-length neck, stands about eleven inches tall, and most of its label has been torn off."
        },
        // {
        //   invId: 11,
        //   name: "Mẹ và bé",
        //   image: "~/assets/images/mb.png",
        //   description:
        //     "This teardrop-shaped bottle is made of translucent bright purple glass.  It has a mid-length neck, stands about eleven inches tall, and most of its label has been torn off."
        // },
        // {
        //   invId: 12,
        //   name: "Đồ dùng văn phòng, công nghiệp",
        //   image: "~/assets/images/vp.png",
        //   description:
        //     "This teardrop-shaped bottle is made of translucent bright purple glass.  It has a mid-length neck, stands about eleven inches tall, and most of its label has been torn off."
        // },
        //  {
        //   invId: 13,
        //   name: "Du lịch, dịch vụ",
        //   image: "~/assets/images/vp.png",
        //   description:
        //     "This teardrop-shaped bottle is made of translucent bright purple glass.  It has a mid-length neck, stands about eleven inches tall, and most of its label has been torn off."
        // },
        //  {
        //   invId: 14,
        //   name: "Tất cả danh mục",
        //   image: "~/assets/images/tc.png",
        //   description:
        //     "This teardrop-shaped bottle is made of translucent bright purple glass.  It has a mid-length neck, stands about eleven inches tall, and most of its label has been torn off."
        // },
        // {
        //   invId: 15,
        //   name: "Cho tặng miễn phí",
        //   image: "~/assets/images/qua.png",
        //   description:
        //     "This teardrop-shaped bottle is made of translucent bright purple glass.  It has a mid-length neck, stands about eleven inches tall, and most of its label has been torn off."
        // }
      ],
      itemsPerRow: 2
    };
  },
  methods: {
    
    myChangeEvent: function(args) {
      var changeEventText = "Page changed to index: " + args.index;
      console.log(changeEventText);
    },
    seeDetails(i) {
      this.$navigateTo(Detail, {
        transition: {
          name: "slide",
          duration: "200"
        },
        props: {
          prod: i,
          index:'',
          editabled:false 
        }
      });
    },
    seeDetails2(i) {
      this.$navigateTo(Filter, {
        transition: {
          name: "slide",
          duration: "200"
        },
        props: {
          prod: i,
        }
      });
    },
    seeItem(i){
      this.$showModal(SeeItem, {
        transition: {
          name: "slide",
          duration: "200"
        },
        props: {
          i: i,
        }
      });
    },
    onTextChanged(event) {
      this.searchText = this.searchQuery;
    },
    onsubmit() {
      this.searchText = this.searchQuery;
    }
  },
  computed: {
    rowCount: function() {
      return Math.ceil(this.Items.length);
    },
    rowCount2: function() {
      return Math.ceil(this.Items.length/this.itemsPerRow);
    },
    rowCount3: function() {
      return this.$sell_arr?Math.ceil(this.$sell_arr.length/this.itemsPerRow):0;
    },
    filters: {
      dollars: num => `$${num / 100}`
    },
    filterList: function() {
      var newarray = this.$sell_arr?this.$sell_arr:[],
        searchText = this.searchText;
      if (!searchText) {
        return newarray;
      }
      searchText = searchText.trim().toLowerCase();
      newarray = newarray.filter(function(item) {
        if (item.cat.name.toLowerCase().indexOf(searchText) !== -1) {
          return item;
        }
      });
      return newarray;
    }
  },
  mounted(){

  }
};
</script>
<style scoped>
.logo {
  margin-bottom: 12;
  height: 90;
  font-weight: bold;
  horizontal-align: center;
}
.header {
  horizontal-align: center;
  font-size: 25;
  font-weight: 600;
  margin-bottom: 70;
  text-align: center;
  color: #66a59a;
}
</style>