<template>
  <div class="goods">
    <van-nav-bar
      @click-left="onClickLeft"
      safe-area-inset-top
      class="nav-bar-template"
    >
      <template #title>
        <van-image src="/static/image/logo.png" width="100"></van-image>
      </template>
      <template #left>
        <van-icon name="/static/image/menu.svg" size="30" />
      </template>
    </van-nav-bar>
    <van-swipe class="my-swipe" indicator-color="white">
      <van-swipe-item>
        <van-image src="/static/image/banner.png"></van-image>
        <div class="positons">
          <span>{{$t('message.Join as a metaverse native citizen and share the benefits')}}</span>
          <span class="but">{{$t('message.payoff calculated 10 secs')}}</span>
        </div>
      </van-swipe-item>
    </van-swipe>
    <van-row justify="space-around" class="bgc-color">
      <van-col :span="24">
        <div class="card-background-radius">
          <van-cell>
            <template #title>
              <span class="title-content">{{ $t("message.myViplevel") }}</span>
              <span class="title-value">{{ `V${vipLevel}` }}</span>
            </template>
            <template #value>
              <van-tag color="#DAC57A" class="tag" @click="updateVip">{{
                $t("message.updateVip")
              }}</van-tag>
            </template>
          </van-cell>

          <van-card
            centered
            class="van-card-img-earn"
            :title="$t('message.revenue')"
            >>
            <template #desc>
              <div
                class="template-desc-style"
                style="word-break: break-all;color:#fff;margin-top:20px;"
              >
                {{ `$${earnings}` }}
              </div>
              <van-tag @click="goyield" class="tag-font-style">
                <span>{{ $t("message.yield") }}</span>
              </van-tag>
            </template>
            <!-- <template #price>
              <van-tag mark @click="goyield" class="tag-font-style">
                <span>{{ $t("message.yield") }}</span>
                <van-icon name="arrow" />
              </van-tag>
            </template> -->
          </van-card>
        </div>
      </van-col>
      <!-- <van-col :span="11">
        <van-card
          centered
          class="van-card-img-earn"
          :title="$t('message.myViplevel')"
        >
          <template #desc>
            <div class="template-desc-style">{{ `V${vipLevel}` }}</div>
          </template>
          <template #price>
            <van-tag mark @click="updateVip" class="tag-font-style">
              <span>{{ $t("message.updateVip") }}</span>
              <van-icon name="arrow" />
            </van-tag>
          </template>
        </van-card>
      </van-col> -->
      <!-- <van-col :span="11">
        <van-card
          centered
          class="van-card-img-vip"
          :title="$t('message.revenue')"
          >>
          <template #desc>
            <div class="template-desc-style" style="word-break: break-all">
              {{ `≈$${earnings}` }}
            </div>
          </template>
          <template #price>
            <van-tag mark @click="goyield" class="tag-font-style">
              <span>{{ $t("message.yield") }}</span>
              <van-icon name="arrow" />
            </van-tag>
          </template>
        </van-card>
      </van-col> -->
    </van-row>
    <!-- 搜索框 -->
    <!-- <van-field
      class="van-field-template"
      :placeholder="$t('message.search')"
      v-model="serchText"
      @update:model-value="serch"
    >
      <template #left-icon>
        <van-icon
          name="search"
          @click="onSearch"
          size="20"
          style="padding:0 10px;"
        />
      </template>
    </van-field> -->
    <!-- 参与方式 -->
    <biType ref="biType" />
  </div>
  <!-- 弹出层 -->
  <van-popup
    v-model:show="popupShow"
    position="left"
    :style="{ width: '70%', height: '100%' }"
  >
    <van-card centered class="van-card-img-popup">
      <template #title>
        <div
          class="van-card__title"
          :class="{ 'van-card-style-isActived': !isActivite }"
        >
          <span style="font-size:23px;">Address</span>
          <span>
            <div class="van-card-title-vip">
              <van-icon
                name="/static/image/icon_vip.png"
                size="20"
                style="margin:-2px 0 -5px;"
              ></van-icon>
              <span style="margin-left:3px;color:#F7A924;">{{ vipLevel }}</span>
            </div>
          </span>
        </div>
      </template>
      <template #desc>
        <div
          class="template-desc-style"
          :class="{ 'van-card-style-isActived': !isActivite }"
        >
          <div
            style="word-wrap: break-word;word-break: break-all;color:#A9BDDC"
          >
            {{ isActivite ? ownAddress : "0x000000000000000000000000" }}
          </div>
          <van-button
            plain
            color="#2458A3"
            style="font-size:12px;padding:0;width:80px;height:28px;"
            @click="copyAddress"
            :disabled="!isActivite"
            >{{ $t("message.copy") }}</van-button
          >
        </div>
      </template>
      <template #footer>
        <div class="van-card-footer">
          <div>
            <span>{{ $t("message.state") }}：</span>
            <span v-if="isActivite">{{ $t("message.activated") }}</span>
            <span v-else>{{ $t("message.notactivated") }}</span>
          </div>
          <van-button
            class="van-button-card"
            v-if="!isActivite"
            @click="activitedAccound = true"
            >{{ $t("message.toActivate") }}
            <van-icon name="arrow" />
          </van-button>
        </div>
      </template>
    </van-card>
    <van-list class="van-list-style">
      <van-cell
        icon="/static/image/iconFRE.png"
        :title="'TMT' + $t('message.prices')"
        title-style="margin-left:10px;margin-bottom:5px;"
        :value="'$' + FREprice"
        value-class="value-style-color"
        size="large"
      ></van-cell>

      <van-cell
        icon="/static/image/icon_person.png"
        :title="$t('message.selfPower')"
        title-style="margin-left:10px;margin-bottom:5px;"
        :value="selfPower"
        value-class="value-style-color"
        size="large"
      ></van-cell>
      <van-cell
        :title="$t('message.teampower')"
        class="cell-last"
        :value="teampower"
        value-class="value-style-color"
        title-style="margin-left:10px;"
        size="large"
      >
        <template #icon>
          <van-icon name="medal-o" color="#ee0a24" />
        </template>
      </van-cell>

      <van-cell
        v-for="(item, index) in menus"
        :key="index"
        :title="$t(item.title)"
        :icon="`/static/image${item.icon}`"
        title-style="margin-left:10px;"
        is-link
        size="large"
        @click="goto(item)"
      />
      <!-- <van-cell
        :title="$t('message.allNetDate')"
        class="cell-last"
        title-style="margin-left:10px;"
        is-link
        size="large"
        @click="netShow = true"
      >
        <template #icon>
          <van-icon name="chat-o" color="#ee0a24" />
        </template>
      </van-cell> -->
    </van-list>
  </van-popup>
  <!-- 弹出激活账户弹窗 -->
  <van-popup
    v-model:show="activitedAccound"
    :close-on-click-overlay="false"
    :style="{ height: 'auto', width: '85%', background: 'transparent' }"
  >
    <center class="van-popup-accound">
      <div>{{ $t("message.activateAccound") }}</div>
      <div style="font-size:14px;margin:20px 0 10px;color:#D1DFF0;">
        {{ $t("message.checkInput",{num:inviteSend}) }}
      </div>
      <van-field
        v-model="checkInput"
        :placeholder="$t('message.invite')"
        style="border-radius: 10px;margin-bottom:20px;"
        :disabled="confirmStatus"
      ></van-field>
      <div
        style="color:#FB995A;font-size:12px;text-align:left;margin:5px 0 15px 10px;"
        v-if="!toConfirm"
      >
        {{ $t("message.placeNo") }}
      </div>
      <div
        style="color:#FB995A;font-size:12px;text-align:left;margin:5px 0 15px 10px;"
        v-if="isNotVip"
      >
        {{ $t("message.notVip") }}
      </div>
      <div>
        <van-button @click="activitedAccound = false" class="van-button-card">{{
          $t("message.cancel")
        }}</van-button>
        <van-button
          @click="accoundComfirm"
          class="van-button-card"
          style="color:#0C326A;background-color:#F7A924;margin-left:30px;"
          >{{ $t("message.comfirm") }}</van-button
        >
      </div>
    </center>
  </van-popup>
  <!-- 公告 -->
  <van-popup
    :style="{
      height: '60%',
      width: '70%',
      display: 'flex',
      'flex-direction': 'column',
      'border-radius': '10px',
    }"
    v-model:show="noticeStatus"
  >
    <center style="margin-top:10px;">系统公告</center>
    <p style="flex:1;padding:0 10px;font-size:15px;">
      {{ notice.description }}
    </p>
    <p
      style="text-align:right;margin-right:10%;font-size:14px;margin-bottom:0;"
    >
      {{ notice.createTime }}
    </p>
    <p
      style="text-align:right;margin-right:10%;font-size:14px;margin-top:10px;"
    >
      {{ notice.sign }}
    </p>
    <van-button
      @click="noticeStatus = false"
      style="height:40px;width:100%;background-color:transparent;border-top:0;color:#2458A3;"
      >关闭</van-button
    >
  </van-popup>

  <!-- 全网数据 -->
  <van-popup
    :style="{
      width: '70%',
      display: 'flex',
      'flex-direction': 'column',
      'border-radius': '10px',
      background: 'transparent',
    }"
    v-model:show="netShow"
  >
    <div class="bg-popup-net">
      <center style="margin-top:10px;">全网数据</center>
      <div>
        <span>{{ $t("message.totalPower") }}</span>
        <span>{{ totalhash }}</span>
      </div>
      <div>
        <span>{{ $t("message.totaldestory") }}</span>
        <span>{{ totalburnVal }} TMT</span>
      </div>
      <div>
        <span>{{ $t("message.balanceNums") }}</span>
        <span>10000000 {{ $t("message.power") }}</span>
      </div>
    </div>
  </van-popup>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import biType from "./components/biTypes.vue";
import {
  Col,
  Row,
  NavBar,
  Icon,
  Card,
  Button,
  Tag,
  Field,
  Popup,
  Notify,
  List,
  Cell,
  Image,
  Swipe,
  SwipeItem,
} from "vant";
import { checkAuth } from "./components/typeConfig";
// 调起服务
import web3Process, { WEB } from "@/components/web3";
import { notice } from "../public/notice";

const process = web3Process();
export default defineComponent({
  components: {
    [Col.name]: Col,
    [Row.name]: Row,
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Card.name]: Card,
    [Button.name]: Button,
    [Tag.name]: Tag,
    [Field.name]: Field,
    [Popup.name]: Popup,
    [List.name]: List,
    [Cell.name]: Cell,
    [Image.name]: Image,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    biType,
  },
  data() {
    return {
      vipLevel: "", //vip等级
      earnings: "", // 当前可提取收益
      serchText: "", //搜索币种
      popupShow: false, //弹出层
      ownAddress: "", //钱包地址
      isActivite: false, // 是否激活账户
      toConfirm: false, // 弹窗确认
      isNotVip: false, // 地址是否为vip
      noticeStatus: false, //公告弹窗
      netShow: false, // 全网数据弹窗
      notice: notice,
      pageLoading: false, //加载中
      totalhash: "", //总算力
      totalburnVal: "", //总销毁量
      teampower: "0.0000", //团队收益
      inviteSend:'0',// 邀请奖励数量
      menus: [
        {
          title: "message.community",
          icon: "/icon_community.png",
          name: "/community",
        },
        // {
        //     title: "message.notice",
        //     icon: "/icon_notice.png",
        // },
        {
          title: "message.sharetoFriends",
          icon: "/icon_share.png",
          name: "/share",
        },
        {
          title: "message.language",
          icon: "/icon_ lang.png",
          name: "/lang",
        },
        // {
        //     title: "message.contractSource",
        //     icon: "/icon_open.png",
        //     link: "https://github.com/LZWFRE/contract.git",
        // },
      ],
      selfPower: "", //个人算力
      FREprice: "", //fre价格
      activitedAccound: false, // 激活账户弹窗
      checkInput: "", //邀请地址
      confirmStatus: false, // 激活中
      unstackSubmit: false, //填写邀请地址支付确认弹窗
      targetItem: {}, // 质押、赎回对应数据 *****应该不用
      changeCoin: "0", // 0 btc 对应的数量，这里需要梳理一下
      detail: {
        paymentWallet: "0xcdf28jskljfka dhjsfhh8937591454qyr739738923759", //付款钱包
        collectionAddress: "0xcdf28jskljfka dhjsfhh89375945436qyr739738923759", //收款地址
        minerCost: `0.000337 BTC（$ 0.10）
                    ≈Gas(66214)*Gas Price(5.1 gwei)`, //矿工费
      },
      goyieldStatus: false, //提取收益状态
      web3Provide: {} as WEB,
    };
  },
  created() {
    this.pageLoading = true;
    process.then((web) => {
      this.web3Provide = web;
      this.ownAddress = web.defaultAccount;
      web.getParent(this, "isActivite", {
        callback: (res: boolean) => {
          console.log('isActivite',res)
          if (!res) {
            this.activitedAccound = true;
            if ("address" in this.$route.query) {
              this.checkInput = this.$route.query.address as string;
            }
          }
          this.pageLoading = false;
        },
      });
      web.getMyLevel(this, "vipLevel");
      web.getPendingCoin(this, "earnings");
      setInterval(() => {
        web.getPendingCoin(this, "earnings");
      }, 3000);
      web.getSelfPower(this, "selfPower");
      web.getPrice(this, "FREprice"); // fre当前价格
      web.getTotalHash(this, "totalhash");
      web.burnVal(this, "totalburnVal");
      checkAuth(web); //查询授权
      web.getUserTeamHash(this, "teampower");
      web.inviteSend().then(res=>{
        console.log('res',res)
        this.inviteSend = (res/1e18).toFixed(2)
      })
      // getChild(web)
    });
    let createTime = localStorage.getItem("noticeCreateTime");
    if (!createTime && notice.description) {
      this.noticeStatus = true;
      localStorage.setItem("noticeCreateTime", notice.createTime);
    } else if (notice.createTime && createTime !== notice.createTime) {
      this.noticeStatus = true;
      localStorage.setItem("noticeCreateTime", notice.createTime);
    }
  },
  watch: {
    activitedAccound(val) {
      if (!val) {
        this.checkInput = "";
        this.isNotVip = false;
      }
    },
    checkInput(val) {
      if (!val) {
        this.toConfirm = false;
        this.isNotVip = false;
      }
    },
  },
  methods: {
    /** 展示菜单页 */
    onClickLeft() {
      this.popupShow = true;
    },
    /**升级VIP */
    updateVip() {
      this.$router.push({ name: "/update" });
    },
    /**去提取收益 */
    goyield() {
      if (Number(this.earnings)) {
        this.goyieldStatus = true;
        this.web3Provide.withDrawCredit({
          callback: (res, err) => {
            if (err) {
              Notify({
                type: "danger",
                message: "提取收益失败",
              });
            } else {
              Notify({
                type: "success",
                message: "提取收益成功",
              });
            }
            this.goyieldStatus = false;
          },
        });
      } else {
        Notify({
          type: "warning",
          message: "暂无可提取收益",
        });
      }
    },
    /**搜索币种 */
    onSearch() {},
    /**复制地址 */
    copyAddress() {
      let input = document.querySelector("#copyinput") as any;
      input.setAttribute("value", this.ownAddress);
      input.select();
      document.execCommand("copy");
      Notify({
        type: "success",
        message: (this as any).$t("message.copySuccess"),
      });
    },
    // 邀请地址弹窗确定 发送请求，激活账户`
    accoundComfirm() {
      if (this.checkInput) {
        this.toConfirm = true;
        this.confirmStatus = true;
        const isvalid = this.web3Provide.checkAddress(this.checkInput); // 判断地址是否有效
        if (!isvalid) {
          Notify({
            type: "warning",
            message: "请输入有效地址",
          });
          this.confirmStatus = false;
        } else {
          this.web3Provide.getParent(this.checkInput, undefined, {
            address: this.checkInput,
            callback: (res: string) => {
              console.log('res',res)
              if (Number(res)) {
                this.web3Provide.bindParent(this.checkInput, (res, err) => {
                  console.log(err)
                  if (err) {
                    this.confirmStatus = false;
                    Notify({
                      type: "warning",
                      message: "激活失败",
                    });
                    this.confirmStatus = false;
                  } else {
                    Notify({
                      type: "success",
                      message: "激活成功",
                    });
                    this.activitedAccound = false;
                    this.isActivite = true;
                    this.confirmStatus = false;
                  }
                });
              } else {
                this.isNotVip = true; //请求返回确认是否为vip
                this.activitedAccound = false;
                this.confirmStatus = false;
              }
            },
          });
        }
        // this.unstackSubmit = true; //弹窗支付
      }
    },
    // 跳转
    goto(item: any) {
      item.name && this.$router.push({ name: item.name });
      if (item.title === "message.notice") {
        this.popupShow = false;
        this.noticeStatus = true;
      }
      if ("link" in item) {
        window.open(item.link);
      }
    },
    // 搜索框输入事件
    serch(value) {
      (this.$refs.biType as any).filterBi(value);
    },
  },
});
</script>

<style lang="less" scoped>
@detached-ruleset: {
  .template-desc-style() {
    color: #fff;
    font-size: 18px;
    margin: 5px 0 10px;
  }
  .tag-font-style() {
    background-color: rgba(255, 255, 255, 0.5);
    color: #e8effd;
    padding: 5px 10px 5px 40px;
    display: flex;
    align-items: center;
    margin-left: -20px;
    span {
      margin-right: 10px;
    }
  }
};

.goods {
  background-color: #cfd3fb;
  height: 100vh;
  width: 100vw;
  .positons{
    position:absolute;
    bottom: 0;
    font-size: .7em;
    background: rgba(0, 0, 0, 0.5);
    left: 0;
    right: 0;
    padding: 10px 20px;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .but{
      background: #FF9D23;
      padding: 4px 6px;
    }
  }
  ::v-deep(.van-hairline--bottom)::after {
    border-bottom-width: 0;
  }
  .nav-bar-template {
    padding-top: 10px;
    background: #cad2ff;
    .nav-bar-template-title {
      color: #2458a3;
      font-size: 23px;
    }
  }
  .bgc-color {
    background-color: transparent;
    .card-background-radius {
      background: #ffff;
      display: flex;
      flex-direction: column;
      padding: 20px;
      border-radius: 15px;
      margin: 0 0 15px;
      ::v-deep(.van-cell) {
        padding: 0;
      }
      .tag {
        padding: 5px 10px;
        border-radius: 6px;
        font-size: 1.1em;
      }
      .title-content {
        font-weight: 700;
      }
      .title-value {
        font-weight: 700;
        color: #dac57a;
        margin-left: 20px;
        font-size: 1.4em;
      }
    }
  }
  .van-card {
    background-size: 100% 100%;
    color: #ffffff;
    font-size: 15px;
    overflow: hidden;
    height: 100%;

    ::v-deep(.van-card__header) {
      height: 100%;
    }
    ::v-deep(.van-card__bottom) {
      flex: 1;
      display: flex;
      align-items: flex-end;
    }
    ::v-deep(.van-card__content) > div {
      margin-top: 10px;
    }
  }

  @detached-ruleset();
  .van-card-img-earn {
    background-image: url("/static/image/shouyi.png");
    &:extend(.van-card);
    .template-desc-style {
      .template-desc-style();
      font-size: 22px;
    }
    .tag-font-style {
      //   .tag-font-style();
      position: absolute;
      background: #fff;
      color: #0b79ff;
      padding: 5px 15px;
      border-radius: 15px 0 0 15px;
      right: -20px;
      top: 15px;
      font-size: 1.1em;
    }
  }
  .van-card-img-vip:extend(.van-card-img-earn) {
    font-size: 1.1em;
    background-image: url("/static/image/background_earnings.png");
    &:extend(.van-card);
    .template-desc-style {
      .template-desc-style();
      color: #ffffff;
    }
    .tag-font-style {
      .tag-font-style();
    }
  }

  // 输入框
  .van-field-template {
    background-color: transparent;
  }
}
.van-card-img-popup {
  //   background-image: linear-gradient(to left, #5788d1, #124896, #0c326a);
  background-image: url("/static/image/shouye.png");
  background-size: 100% 100%;
  width: 90%;
  margin: 10px auto 0;
  border-radius: 10px;
  color: #fff;
  overflow: hidden;
  box-shadow: 0 10px 15px #b9ceec;

  .van-card-style-isActived {
    background-color: rgba(255, 255, 255, 0.2);
    opacity: 0.2;
  }
  .van-card__title {
    margin: -23px -14px 0px;
    padding: 23px 14px 6px;
    display: flex;
    align-items: center;

    .van-card-title-vip {
      display: flex;
      align-items: center;
      margin-left: 10px;
      background-color: #406ba9;
      padding: 0 4px;
    }
  }
  .template-desc-style {
    margin: 0 -14px -6px;
    padding: 0 14px 6px;
    padding-top: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .van-card-footer {
    margin: 0 -14px -6px;
    padding: 0 14px 6px;

    & > div {
      font-size: 13px;
    }
    display: flex;
    align-items: center;
    justify-content: space-between;
    .van-button-card {
      border: 0;
      font-size: 12px;
      height: auto;
      padding: 5px;
      background-color: #f7a924;
      color: #0c326a;
    }
  }
}
.van-list-style {
  margin-top: 50px;
  font-size: 16px;
  ::v-deep(.van-cell__left-icon) {
    margin-top: 3px;
  }
  ::v-deep(.van-cell__value) {
    color: #f7a924;
  }

  .cell-last {
    ::v-deep(.van-icon) {
      margin-top: 3px;
      font-size: 18px;
    }
  }
}
.van-popup-accound {
  background-image: url("/static/image/top_background.png");
  background-size: 100% 100%;
  padding: 20px 15px 10px;
  color: #fff;

  .van-button-card {
    height: auto;
    padding: 11px 40px;
    border-radius: 5px;
    background: #628bc9;
    border: 0;
    color: #c0d0e9;
  }
}

.popup-template {
  display: flex;
  flex-direction: column;

  .popup-template-header {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: #27497b;
    height: 50px;
    .header-icon {
      position: absolute;
      right: 5px;
      padding: 0 10px;
    }
  }
  .popup-group {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    color: #2457a3;
    & div {
      flex: 1;
      padding: 18px;
      border-bottom: 1px solid #e6eaf0;
    }
    & div:last-of-type {
      border-bottom: 0;
      margin-bottom: 10px;
    }
    ::v-deep(.van-radio__label) {
      margin-left: 15px;
      color: #2457a3;
    }
  }
  .popup-body-grid {
    display: grid;
    grid-template-columns: 30% 70%;
    grid-template-rows: repeat(3, 50px);
    word-break: break-all;
    font-size: 14px;
    & span {
      height: 100%;
      border-bottom: 1px solid #e6eaf0;
      display: flex;
      align-items: center;
    }
    & span:nth-child(2n + 1) {
      color: #7c90af;
    }
    & span:nth-child(2n)::after {
      background-color: #e6eaf0;
    }
  }
}

.bg-popup-net {
  background-image: url("/static/image/background_vip.png");
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  color: #fff;

  div {
    display: flex;
    justify-content: space-between;
    padding: 15px 20px;
  }
}
</style>
