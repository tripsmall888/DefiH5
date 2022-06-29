<template>
    <div class="content">
        <van-nav-bar :title="$t('message.stack')"
                     class="van-nav-var-style">
            <template #left>
                <van-icon name="down"
                          @click="toUp" />
            </template>
        </van-nav-bar>
        <div class="bg">
            <div class="bg-header">
                <div>
                    <van-icon :name="state.coin.imgURL"
                              size="50"></van-icon>
                    <span>{{state.coin.deposit}}</span>
                </div>
                <div>
                    <van-icon name="/static/image/iconFRE.png"
                              size="30"></van-icon>
                    <van-icon v-if="state.coin.imgName !== 'TMT'"
                              style="margin-left:5px;"
                              :name="state.coin.imgURL"
                              size="30"></van-icon>
                </div>
            </div>
            <div class="bg-body">
                <div>
                    <span>{{$t('Deposit')}}</span>
                    <span>{{state.coin.deposit}}</span>
                </div>
                <div>
                    <span>{{$t('APR')}}</span>
                    <span>{{state.coin.earn}}</span>
                </div>
                <div>
                    <span>{{$t('APR-year')}}</span>
                    <span>{{state.coin.arp}}%</span>
                </div>
            </div>
        </div>
        <div>
            <div class="content-body">
                <span v-if="!state.isFRE">{{state.coin.deposit?.split('+')[0]+$t('message.pledge')}}</span>
                <div class="content-body-flex">
                    <template v-if="!state.isFRE">
                        <div class="button-group">
                            <van-button @click="check(80)"
                                        :class="{'ischeck':state.pledge.proportion === 80}">80%</van-button>
                            <van-button @click="check(70)"
                                        :class="{'ischeck':state.pledge.proportion === 70}">70%</van-button>
                            <van-button @click="check(50)"
                                        :class="{'ischeck':state.pledge.proportion === 50}">50%</van-button>
                        </div>
                        <div><span v-loading="state.loadingPower">{{$t('message.explain_five').replace(/\d+/,state.totalPower)}}</span></div>
                    </template>
                    <template v-else>
                        <div><span v-loading="state.loadingPower">{{$t('message.explain_five').replace(/\d+/,state.totalPower)}}</span></div>
                    </template>
                </div>
            </div>
            <van-field v-model="state.pledge.nums"
                       placeholder="输入数量"
                       style="border-bottom:1px solid #D5E1F1;width:90%;margin:10px auto;"
                       type="number"
                       @update:model-value="inputChange">
                <template #extra>{{state.coin.deposit?.split('+')[0]}}</template>
            </van-field>
            <div v-if="state.coin.imgName !== 'TMT'"
                 class="content-body-span">
                {{state.coin.deposit?.split('+')[0]+$t('message.remaining')}}：{{state.coin.balance}} {{state.coin.deposit?.split('+')[0]}}
            </div>
            <div class="content-body-span">
                {{'TMT'+$t('message.remaining')}}：{{state.coins[0].balance}} TMT
            </div>
            <div style="width:90%;margin:40px auto;">
                <van-button style="width:100%;color:#E2EDFE;border-radius:10px;"
                            color="#2458A3"
                            @click="gain">{{$t('message.stack')}}</van-button>
            </div>
        </div>
    </div>
    <!-- 质押弹窗 -->
    <van-popup v-model:show="state.getShow"
               :style="{'border-radius':'10px','height':'33%','width':'80%','background-image':'linear-gradient(#0A4D9A, #0B51A3,#3F72BD)' }">
        <div class="popup-template-style">
            <center>{{$t('message.confirm')}}</center>
            <div class="template-body">
                <span>{{$t('message.power')+'：'+state.power}}</span>
                <span style="margin:15px 0 10px;">{{$t('message.total')}}：</span>
                <template v-if="state.isFRE">
                    <div style="display:flex;align-itmes:center;">
                        <span style="margin-top: 2px;">
                            <van-icon name="/static/image/one.png"
                                      size="15"
                                      style="margin-right:5px;"></van-icon>
                        </span>
                        <span>{{state.pledge.nums}} TMT</span>
                    </div>
                </template>
                <template v-else>
                    <div style="display:flex;margin-bottom:5px;">
                        <van-icon name="/static/image/one.png"
                                  size="15"
                                  style="margin-right:5px;margin-top: 2px;"></van-icon>
                        <span>{{state.pledge.nums}} {{state.coin.deposit?.split('+')[0]}}</span>
                    </div>
                    <div style="display:flex;">
                        <van-icon name="/static/image/two.png"
                                  size="15"
                                  style="margin-right:5px;margin-top: 2px;"></van-icon>
                        <span>{{state.bnbNumber}} TMT</span>
                    </div>
                </template>
            </div>
            <div class="forter-button">
                <van-button color="#628BC9"
                            @click="state.getShow=false">{{$t('message.cancel')}}</van-button>
                <van-button color="#F7A924"
                            @click="confirmBuy">{{$t('message.comfirm')}}</van-button>
            </div>
        </div>
    </van-popup>
</template>
<script lang="ts">
import web3Process, { WEB } from "@/components/web3";
const process = web3Process();
import { defineComponent, onMounted, reactive } from "@vue/runtime-core";
import {
    NavBar,
    Tag,
    Card,
    Icon,
    Button,
    Popup,
    Slider,
    Divider,
    Field,
    Notify,
} from "vant";
import { getCurrentInstance } from "vue";
import { useRouter, useRoute } from "vue-router";
import coins, { depositItem } from "../components/typeConfig";

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
        [Field.name]: Field,
    },
    setup() {
        const { ctx } = getCurrentInstance() as any;
        const state = reactive({
            url: "https:www.meiye.artwebsearchkeyword=%E5%88%86%E4%BA%AB&pn=1",
            coin: {} as depositItem,
            coins,
            pledge: {
                proportion: 50, //质押比例
                nums: "", //输入数量
                remaining: "", // 其余币种的余额
                freRemaining: "", // fre币余额
            },
            getShow: false, //确认购买弹窗
            power: "", // 选择等级之后的算力
            bnbNumber: 0.0, //bnb价格
            freNumber: "", //fre价格
            isFRE: false, // 是否质押fre
            totalPower: "0", //获取的算力
            loadingPower: false, // 获取算力中
            depositState: false, // 质押中
            web3provide: {} as WEB,
        });
        const router = useRouter();
        const route = useRoute();
        const methods = {
            // 返回首页
            toUp() {
                //console.log(router);
                router.push({ name: "/main" });
            },
            // 获取
            gain() {
                if (state.depositState) {
                    return;
                }
                if (state.pledge.nums) {
                    const tokenAddress = state.coin.contractObject.replace(
                        "Object",
                        "Address"
                    );
                    state.web3provide.getLpPayfre(
                        tokenAddress,
                        String(state.pledge.nums),
                        state.pledge.proportion,
                        {
                            callback(res) {
                                state.bnbNumber = res;
                                if (
                                    Number(state.bnbNumber) >
                                    Number(state.coins[0].balance)
                                ) {
                                    Notify({
                                        type: "warning",
                                        message: ctx.$t("message.plcheck"),
                                    });
                                } else {
                                    state.getShow = true;
                                }
                            },
                        }
                    );
                    state.web3provide.getDepositPower(
                        tokenAddress,
                        String(state.pledge.nums),
                        state.isFRE?'50':state.pledge.proportion,
                        {
                            callback(res) {
                                //console.log("算力", res);
                                state.power = res;
                            },
                        }
                    );
                } else {
                    Notify({
                        type: "warning",
                        message: "请输入质押数量",
                    });
                }
            },
            // 确认质押
            confirmBuy() {
                state.depositState = true;
                state.getShow = false;
                const tokenAddress = state.coin.contractObject.replace(
                    "Object",
                    "Address"
                );
                state.web3provide.deposit(
                    tokenAddress,
                    String(state.pledge.nums),
                    state.pledge.proportion,
                    {
                        callback(res, err) {
                            if (err) {
                                Notify({
                                    type: "warning",
                                    message: "质押失败",
                                    duration: 1000,
                                });
                            } else {
                                Notify({
                                    type: "success",
                                    message: "质押成功",
                                    duration: 1000,
                                });
                                state.getShow = false;
                                setTimeout(() => {
                                    methods.toUp();
                                }, 500);
                            }
                            state.depositState = false;
                        },
                    }
                );
            },
            // 选择质押比例
            check(pledge) {
                state.pledge.proportion = pledge;
                methods.getPower();
            },
            //
            inputChange(value) {
                if (
                    (state.coin as any).contractObject ===
                    "freTokenContractObject"
                ) {
                    if (Number(value) > Number(state.coins[0].balance)) {
                        state.pledge.nums = state.coins[0].balance;
                    }
                } else {
                    if (value > (state.coin as any).balance) {
                        //console.log((state.coin as any).balance);
                        state.pledge.nums = (state.coin as any).balance;
                    }
                }
                if (value < 0) {
                    state.pledge.nums = "0";
                }
            },
            getPower() {
                if (state.isFRE) {
                    state.totalPower = "210";
                } else {
                    state.loadingPower = true;
                    state.web3provide.getHashRateByPct(
                        state.pledge.proportion,
                        {
                            callback(res) {
                                state.loadingPower = false;
                                state.totalPower = res;
                            },
                        }
                    );
                }
            },
        };
        onMounted(() => {
            state.coin =
                coins.find((i) => i.deposit === route.params.coin) ||
                ({} as depositItem);
            if (state.coin.deposit === "TMT") {
                state.pledge.proportion = 100;
                state.isFRE = true;
            }
            process.then((web) => {
                state.web3provide = web;
                methods.getPower();
            });
        });
        return {
            ...methods,
            state,
        };
    },
});
</script>
<style lang="less" scoped>
.content {
    ::v-deep(.van-hairline--bottom)::after {
        border-bottom-width: 0;
    }

    .van-nav-var-style {
        padding-top: 15px;
        height: 46px;
        ::v-deep(.van-nav-bar__title) {
            color: #0c326a;
            font-size: 18px;
        }
        ::v-deep(.van-icon) {
            transform: rotate(90deg);
            font-size: 26px;
            color: #0c326a;
        }
    }
    .bg {
        background-image: url("/static/image/zy_card_bg.png");
        background-size: 100% 100%;
        width: 80%;
        margin: 20px auto;
        padding: 10px 20px 0;
        color: #fff;
        padding-bottom: 70px;
        .bg-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            & > div {
                display: flex;
                align-items: center;
                span {
                    margin-left: 20px;
                    font-size: 18px;
                }
            }
        }
        .bg-body {
            display: flex;
            justify-content: space-between;
            margin-left: 50px;
            margin-top: 10px;
            & div {
                display: flex;
                flex-direction: column;
                text-align: center;
                & > span:first-child {
                    font-size: 12px;
                    color: #d6dce6;
                }
            }
        }
    }
    .content-body {
        width: 90%;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        color: #0c326a;

        .content-body-flex {
            flex: 1;
            justify-content: flex-end;
            text-align: right;
            .button-group {
                display: flex;
                flex-direction: row;
                justify-content: flex-end;

                .ischeck {
                    background-color: #2458a3;
                    color: #fff;
                }
                button {
                    margin-left: 5px;
                    color: #2458a3;
                    border: 1px solid #2458a3;
                    height: auto;
                    padding: 5px 10px;
                }
            }
            div {
                margin-top: 5px;
                color: #8598b4;
                font-size: 13px;
            }
        }
    }
    .content-body-span {
        color: #7d91af;
        font-size: 14px;
        text-align: right;
        margin-top: 5px;
        margin-right: 5%;
    }
}
.popup-template-style {
    box-sizing: border-box;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 20px 20px;
    color: #ffffff;

    .template-body {
        display: flex;
        flex-direction: column;
        color: #d6e1f0;
        font-size: 16px;
        padding-left: 20%;
        margin-top: 20px;
        justify-content: center;
    }
    .forter-button {
        flex: 1;
        width: 100%;
        align-self: flex-end;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-end;
        ::v-deep(button) {
            width: 45%;
            border-radius: 10px;
            height: 37px;
        }
    }
}
</style>