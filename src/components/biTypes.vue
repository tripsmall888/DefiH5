<template>
  <div class="content">
    <van-nav-bar class="nav-bar-template">
      <template #right>
        <van-tag round class="nav-bar-right-text">{{
          $t("message.price") + "≈$" + state.frePrice
        }}</van-tag>
      </template>
      <template #left>
        <span class="nav-bar-left-text">{{ $t("message.way") }}</span>
      </template>
    </van-nav-bar>
    <van-card
      v-for="(item, index) in state.currencys"
      :key="index"
      :title="item.imgName"
      class="van-card-template"
    >
      <template #thumb>
        <van-icon :name="item.imgURL" size="50"></van-icon>
      </template>
      <template #desc>
        <div class="car-desc-flex">
          <span> Deposit:{{ item.deposit }}</span>
          <span>APY</span>
        </div>
        <div class="car-desc-flex">
          <span>Earn:{{ item.earn }}</span>
          <span class="car-desc-text">{{ item.arp }}%</span>
        </div>
      </template>
      <template #footer>
        <div class="van-card-footer">
          <div>
            <van-icon name="/static/image/iconFRE.png" size="25"></van-icon>
            <van-icon
              v-show="item.imgName !== 'TMT'"
              :name="item.imgURL"
              size="25"
            ></van-icon>
          </div>
          <div>
            <van-button
              class="van-button-card"
              style="color: #2458a3"
              @click="unstack(item)"
              >{{ $t("message.unstack") }}</van-button
            >
            <van-button
              class="van-button-card"
              color="#2458A3"
              @click="stack(item)"
              >{{ $t("message.stack") }}</van-button
            >
          </div>
        </div>
      </template>
    </van-card>
  </div>
  <!-- 赎回未质押弹窗 -->
  <van-popup
    v-model:show="state.yieldStatus"
    :style="{ height: 'auto', width: '85%', background: 'transparent' }"
    :close-on-click-overlay="false"
  >
    <center class="van-popup-yield">
      <van-icon name="/static/image/top_icon.png" size="80"></van-icon>
      <div>{{ $t("message.notyieldLP") }}</div>
    </center>
  </van-popup>
  <!-- 赎回已质押弹窗 -->
  <van-popup
    v-model:show="state.confirmUnstackStatus"
    :style="{ height: 'auto', width: '80%', background: 'transparent' }"
    :close-on-click-overlay="false"
  >
    <div>
      <div class="van-popup-unstack">
        <center style="margin-bottom: 10px">
          {{ $t("message.confirmUnstack") }}
        </center>
        <div
          class="popup-unstack-flex"
          style="margin: 10px 0 10px"
          v-if="state.targetItem.deposit !== 'TMT'"
        >
          <span>{{
            $t("message.stacked") +
              state.targetItem.deposit.split("+")[0] +
              $t("message.num")
          }}</span>
          <span
            >{{ state.unstackNum }}
            {{ state.targetItem.deposit.split("+")[0] }}</span
          >
        </div>
        <div class="popup-unstack-flex" style="margin: 10px 0 10px">
          <span>{{ $t("message.yieldFREnumbers") }}</span>
          <span
            >{{
              state.targetItem.deposit === "TMT"
                ? state.unstackNum
                : state.targetNum
            }}
            TMT</span
          >
        </div>
        <div class="popup-unstack-flex">
          <span>{{ $t("message.totalYield") }}</span>
          <span>{{ state.totalYieldNum }}</span>
        </div>
        <div style="margin: 20px 0">
          <van-slider
            v-model="state.sliderValue"
            @change="changeUnstack"
            bar-height="10px"
            active-color="#CCA96D"
          />
        </div>
        <div style="text-align: right; color: #acc5de; font-size: 14px">
          {{ state.sliderValue }}%
        </div>
        <div style="margin-bottom: 25px">
          <p>{{ $t("message.explain") }}：</p>
          <p>{{ $t("message.explain_four") }}</p>
        </div>
        <div style="display: flex; justify-content: space-between">
          <van-button
            @click="state.confirmUnstackStatus = false"
            class="van-button-card"
            style="color:#C0D0E9;background-color;#628BC9;"
            >{{ $t("message.cancel") }}</van-button
          >
          <van-button
            @click="submit"
            class="van-button-card"
            style="color: #0c326a; background-color: #f7a924"
            >{{ $t("message.comfirm") }}</van-button
          >
        </div>
      </div>
    </div>
  </van-popup>

  <!-- 授权访问 -->
  <van-popup
    v-model:show="state.assetStatus"
    :style="{ height: 'auto', 'border-radius': '10px', width: '90%' }"
  >
    <div
      class="popup-template-asset"
      :style="{ 'pointer-events': state.authStatus ? 'none' : '' }"
    >
      <img
        src="/static/image/authorbg.png"
        style="width: 100%; height: 160px"
      />
      <div style="width: 100%; height: 160px" class="popup-template-asset-body">
        <center>{{ $t("message.needAuthAsset") }}</center>
        <div class="child-div">
          <span>TMT{{ $t("message.asset") }}</span>
          <van-button
            @click="goAuth(state.currencys[0].contractObject)"
            class="van-button-asset"
            v-if="!state.currencys[0].authorization"
          >
            <van-loading
              v-if="state.TMTauthorization"
              type="spinner"
              size="20"
            ></van-loading>
            <span v-else>{{ $t("message.authorization") }}</span></van-button
          >
          <van-icon
            name="/static/image/class_checked.png"
            size="25"
            style="margin-right: 20px"
            v-else
          ></van-icon>
        </div>
        <div
          class="child-div"
          v-if="
            state.targetItem.contractObject !== 'bnbTokenContractObject' &&
              state.targetItem.contractObject !== 'freTokenContractObject'
          "
        >
          <span>{{
            state.targetItem?.imgName?.split("+")[0] + $t("message.asset")
          }}</span>
          <van-button
            @click="goAuth(state.targetItem.contractObject)"
            class="van-button-asset"
            v-if="!state.targetItem.authorization"
          >
            <van-loading
              v-if="state.notTMTauthorization"
              type="spinner"
              size="20"
            ></van-loading>
            <span v-else>{{ $t("message.authorization") }}</span>
          </van-button>
          <van-icon
            name="/static/image/class_checked.png"
            size="25"
            style="margin-right: 20px"
            v-else
          ></van-icon>
        </div>
      </div>
    </div>
  </van-popup>
</template>
<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  useContext,
} from "@vue/runtime-core";
import {
  NavBar,
  Tag,
  Card,
  Icon,
  Button,
  Popup,
  Slider,
  Divider,
  Notify,
  Loading,
} from "vant";
import { useRouter } from "vue-router";
import typeConfig, { checkAuth } from "./typeConfig";
import web3Process, { WEB } from "@/components/web3";
const process = web3Process();

export default defineComponent({
  components: {
    [NavBar.name]: NavBar,
    [Tag.name]: Tag,
    [Card.name]: Card,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Popup.name]: Popup,
    [Slider.name]: Slider,
    [Divider.name]: Divider,
    [Loading.name]: Loading,
  },
  setup() {
    const router = useRouter();
    const { expose } = useContext();
    const state = reactive({
      TMTauthorization: false,
      notTMTauthorization: false,
      frePrice: "0.0000", //fre币当前价格
      currencys: typeConfig,
      yieldStatus: false, //未质押弹窗
      confirmUnstackStatus: false, //确认赎回弹窗
      targetNum: "", // 质押其余币种的数量
      unstackNum: "", //质押fre数量
      totalYieldNum: "", // 质押获得的总算力
      sliderValue: 0, //滑块百分比
      targetItem: {
        dst: false,
      }, // 质押、赎回对应数据
      changeCoin: "0", // 0 btc 对应的数量，这里需要梳理一下
      assetStatus: false, //授权访问资产弹窗
      authStatus: false, //授权中
      submitStatus: false, // 赎回状态
      web3provide: {} as WEB,
    });
    const methods = {
      // 质押
      stack: (item) => {
        state.web3provide.getParent("state", "", {
          callback: (res: boolean) => {
            console.log(!res);
            if (!Number(res)) {
              Notify({
                type: "warning",
                message: "请激活账号后重试",
              });
            } else {
              state.targetItem = item;
              // bnb 不用授权
              if (item.contractObject === "bnbTokenContractObject") {
                if (state.currencys[0].authorization) {
                  router.push({
                    name: "/stack",
                    params: {
                      coin: (state.targetItem as any).deposit,
                    },
                  });
                }
              } else if (
                state.currencys[0].authorization &&
                item.authorization
              ) {
                router.push({
                  name: "/stack",
                  params: {
                    coin: (state.targetItem as any).deposit,
                  },
                });
              }
              state.assetStatus = true;
            }
          },
        });
      },
      // 赎回
      unstack: (item) => {
        state.targetItem = item;
        const tokenAddress = (state.targetItem as any).contractObject.replace(
          "Object",
          "Address"
        );
        if (!state.targetItem.dst) {
          Notify({
            type: "warning",
            message: "质押时间不足7天",
            // message: "质押时间不足1小时",
          });
          return;
        }
        state.web3provide.getMyLpInfo(tokenAddress, {
          callback(res) {
            //console.log(res);
            // 计算质押算力
            if (Number(res[0] / 1e18)) {
              // 已质押
              state.targetNum = (res[1] / 1e18).toFixed(4);
              state.unstackNum = (res[0] / 1e18).toFixed(4);
              state.totalYieldNum = (res[2] / 1e18).toFixed(4);
              state.confirmUnstackStatus = true;
            } else {
              // 未质押
              state.yieldStatus = true;
              setTimeout(() => {
                state.yieldStatus = false;
              }, 1500);
            }
          },
        });
      },
      // 赎回滑块拉动事件回调
      changeUnstack(value) {
        state.sliderValue = value;
        //console.log(value);
      },
      // 赎回确定
     async submit() {
        state.submitStatus = true;
        const tokenAddress = (state.targetItem as any).contractObject.replace(
          "Object",
          "Address"
        );
        const bool = await state.web3provide.isTakeBack(tokenAddress,state.sliderValue * 10000);
        if(!bool){
          Notify({
            type: "warning",
            message: "赎回数量不足10TMT",
          });
          return ;
        }
        state.web3provide.takeBack(tokenAddress, state.sliderValue * 10000, {
          callback(res, err) {
            state.submitStatus = false;
            if (err) {
              Notify({
                type: "warning",
                message: "质押赎回失败",
              });
            } else {
              Notify({
                type: "success",
                message: "质押赎回成功",
              });
              state.confirmUnstackStatus = false;
            }
          },
        });
      },
      // 授权按钮
      goAuth(contractObject: string) {
        state.authStatus = true; // 修改授权中
        if (contractObject !== "bnbTokenContractObject") {
          if (contractObject === "freTokenContractObject") {
            state.TMTauthorization = true;
          } else {
            state.notTMTauthorization = true;
          }
          state.web3provide.approve(contractObject, {
            callback(res, err) {
              //console.log(res, err);
              if (err) {
                if (contractObject === "freTokenContractObject") {
                  state.TMTauthorization = false;
                } else {
                  state.notTMTauthorization = false;
                }
                state.authStatus = false; // 修改授权中
                return;
              }
              state.authStatus = false;
              Notify({
                type: "success",
                message: "授权成功！",
              });
              if (contractObject === "freTokenContractObject") {
                state.TMTauthorization = false;
                state.currencys[0].authorization = true;
                if (
                  (state.targetItem as any).contractObject ===
                  "freTokenContractObject"
                ) {
                  (state.targetItem as any).authorization = true;
                }
              } else {
                state.notTMTauthorization = false;
                // 将对应的代币授权改为true
                (state.targetItem as any).authorization = true;
              }
              // 如果fre授权跟代币都已授权则跳转质押页面
              if (
                state.currencys[0].authorization &&
                (state.targetItem as any).authorization
              ) {
                checkAuth(state.web3provide);
                router.push({
                  name: "/stack",
                  params: {
                    coin: (state.targetItem as any).deposit,
                  },
                });
              }
            },
          });
        }
      },
      //筛选币种方法
      filterBi(value) {
        if (value) {
          let reg = new RegExp(value, "i");
          state.currencys = typeConfig.filter((item) => reg.test(item.deposit));
        } else {
          state.currencys = typeConfig;
        }
      },
    };
    expose({
      filterBi: methods.filterBi,
    });
    onMounted(() => {
      process.then((web) => {
        state.web3provide = web;
        web.getPrice(state, "frePrice");
        setInterval(() => {
          web.getPrice(state, "frePrice");
        }, 30000);
        checkAuth(state.web3provide);
      });
    });
    return {
      state,
      ...methods,
    };
  },
});
</script>
<style lang="less" scoped>
.content {
  background-color: #fff;
  border-radius: 10px 10px 0 0;
  padding-bottom: 50px;

  ::v-deep(.van-hairline--bottom)::after {
    border-bottom-width: 0;
  }
  .nav-bar-template {
    border-radius: 40px 40px 0 0;

    .nav-bar-right-text {
      background-color: #edf1f7;
      color: #2458a3;
      padding: 5px 10px;
    }
    .nav-bar-left-text {
      font-size: 18px;
    }
  }

  .van-card-template {
    ::v-deep(.van-card__header) {
      padding: 0 15px;
      padding-top: 9px;
      margin-bottom: -20px;
    }
    ::v-deep(.van-card__content) {
      margin-left: -30px;
    }
    ::v-deep(.van-card__title) {
      font-size: 16px;
    }
    background-color: #fff;
    width: 90%;
    margin: 0 auto 20px;
    border: 1px #f4f8fd solid;
    border-radius: 5px;
    box-shadow: 0px 7px 10px #f4f8fd;
    padding: 10px 0;

    .car-desc-flex {
      display: flex;
      justify-content: space-between;
      color: #8598b4;
      font-size: 14px;

      .car-desc-text {
        color: #0c326a;
        font-size: 16px;
      }
    }
    .van-card-footer {
      padding: 0 15px;
      display: flex;
      text-align: left;
      justify-content: space-between;
      padding-top: 5px;
      border-top: 1px solid #f4f8fd;
    }
    .van-button-card {
      height: auto;
      padding: 5px 20px;
      border-radius: 25px 25px;
    }
  }
}
.van-popup-yield {
  border-radius: 10px;
  padding: 20px 0 20px;
  background-color: #ffffff;
  color: #2458a3;
}
.van-popup-unstack {
  background-image: url("/static/image/sh_top_bgc.png");
  background-size: 100% 100%;
  padding: 25px 22px 15px;
  color: #cedae8;

  .popup-unstack-flex {
    font-size: 14px;
    color: #d1dff0;
    display: flex;
    justify-content: space-between;
  }
  p {
    margin: 2px 0;
    color: #f7a924;
    font-size: 14px;
  }
  ::v-deep(.van-slider__button) {
    background-color: #f7a924;
  }
  .van-button-card {
    height: auto;
    padding: 0.7rem 2.6rem;
    border-radius: 10px;
  }
}
.popup-template-asset {
  font-size: 14px;
  color: #0c326a;
  position: relative;

  ::v-deep(.van-loading__spinner--spinner) {
    // margin-top: 160px;
    // margin-left: 45%;
  }
  .van-button-asset {
    height: auto;
    padding: 4px 18px;
    border-radius: 15px 15px;
    background-color: #ffffff;
    color: #2d6097;
    border: 1px solid #80a1d0;
  }
  .popup-template-asset-body {
    height: 140px;

    center {
      padding-top: 10px;
      font-size: 18px;
    }
    .child-div {
      display: flex;
      justify-content: space-between;
      width: 80%;
      margin: 24px auto 0;
      & > span {
        color: #5788d1;
      }
    }
  }
}
</style>
