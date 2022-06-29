<template>
    <div class="content">
        <van-nav-bar :title="$t('message.buyVip')"
                     class="van-nav-var-style">
            <template #left>
                <van-icon name="down"
                          @click="toUp" />
            </template>
        </van-nav-bar>
        <div style="padding:20px 18px;">
            <div style="display:flex;color:#5C7395;margin-bottom:10px;align-items:center;">
                <span>{{$t('message.mylevel')}}</span>
                <span>
                    <div class="van-card-title-vip">
                        <van-icon name="/static/image/icon_vip.png"
                                  size="25"
                                  style="margin:-2px 0 -5px;"></van-icon>
                        <span style="margin-left:3px;color:#F7A924;">{{state.vipLevel}}</span>
                    </div>
                </span>
            </div>
            <div class="level-card-template">
                <div class="level-card-header">
                    <span>{{$t('message.select')}}</span>
                    <div>
                        <span>V{{state.checked}}</span>
                        <van-icon name="/static/image/icondown.png"
                                  size="20"
                                  @click="state.show = true"></van-icon>
                    </div>
                </div>
                <div class="level-card-body">
                    <template v-if="state.loading">
                        <van-loading type="spinner"
                                     color="#fff"
                                     style="margin:20px 0" />
                    </template>
                    <template v-else>
                        <center>{{$t('message.needDestory')}}</center>
                        <center>{{state.destoryfre}} TMT</center>
                    </template>
                </div>
                <div style="margin-top:10px;font-size:16px;">
                    {{$t('message.balance')}}：{{state.mineCoin}} TMT
                </div>
            </div>
            <div style="font-size:16px;margin:30px 0 10px;">
                {{$t('message.total')}}：{{state.destoryfre}} TMT
            </div>
            <van-button @click="onget"
                        class="button-get">{{$t('message.get')}}</van-button>
            <div style="margin-top:30px;">
                <p>{{$t('message.explain')}}：</p>
                <p>{{$t('message.explain_first')}}</p>
                <p>{{$t('message.explain_second')}}</p>
                <p>{{$t('message.explain_thire')}}</p>
            </div>
        </div>
        <van-popup v-model:show="state.show"
                   position="bottom"
                   :style="{ height: 'auto','border-radius':'10px 10px 0 0 ' }"
                   :close-on-click-overlay="false">
            <div class="popup-template">
                <div class="popup-template-header">
                    <center>{{$t('message.select')}}</center>
                    <van-icon name="cross"
                              class="header-icon"
                              @click="state.show= false" />
                </div>
                <van-radio-group v-model="state.checked"
                                 class="popup-group">
                    <van-radio :name="i"
                               v-for="i in 7"
                               :key="i"
                               shape="square"
                               checked-color="#2457A3"
                               :style="{'opacity':state.checked===i?'1':'0.5'}"
                               :disabled="i<state.vipLevel">{{$t('message.upgrade')+'V'+i}}</van-radio>
                </van-radio-group>
            </div>
        </van-popup>
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, watchEffect } from "vue";
import { useRouter } from "vue-router";
import {
    NavBar,
    Icon,
    Popup,
    RadioGroup,
    Radio,
    Button,
    Loading,
    Notify,
} from "vant";
import web3Process, { WEB } from "@/components/web3";
const process = web3Process();
export default defineComponent({
    components: {
        [NavBar.name]: NavBar,
        [Icon.name]: Icon,
        [Popup.name]: Popup,
        [RadioGroup.name]: RadioGroup,
        [Radio.name]: Radio,
        [Button.name]: Button,
        [Loading.name]: Loading,
    },
    setup() {
        const router = useRouter();
        const methods = {
            // 返回首页
            toUp() {
                //console.log(router);
                router.push({ name: "/main" });
            },
            // 获取
            onget() {
                if (Number(state.mineCoin) < Number(state.destoryfre)) {
                    Notify({
                        type: "warning",
                        message: "超过余额",
                    });
                } else {
                    // state.getShow = true;
                    // 购买等级
                    if (state.checked) {
                        state.web3Provide.buyVip(state.checked, {
                            callback: () => {
                                Notify({
                                    type: "success",
                                    message: "购买成功！",
                                });
                                state.web3Provide.getMyLevel(state, "vipLevel");
                            },
                        });
                    }
                }
            },
        };
        const state = reactive({
            vipLevel: "", //vip等级
            destoryfre: 0, //需要销毁的fre数量
            mineCoin: 0, // FRE余额
            show: false,
            checked: 0, //选择vip 等级
            freNumber: "", //fre价格
            loading: false, //获取销毁数量中
            web3Provide: {} as WEB,
        });
        watchEffect(() => {
            // 调用计算销毁fre算法
            if (!state.show) {
                // 查询所需销毁代币数量
                if (state.web3Provide.buyVipPrice) {
                    state.loading = true;
                    state.web3Provide.buyVipPrice(
                        state.checked,
                        state,
                        "destoryfre",
                        {
                            callback: () => {
                                state.loading = false;
                            },
                        }
                    );
                }
            }
        });
        onMounted(() => {
            process.then((web) => {
                state.web3Provide = web;
                web.getMyLevel(state, "vipLevel");
                web.getBalances("freTokenContractObject", state, "mineCoin");
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
    color: #0c326a;
    .van-nav-var-style {
        padding-top: 15px;

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
    ::v-deep(.van-hairline--bottom)::after {
        border-bottom-width: 0;
    }
    .van-card-title-vip {
        display: flex;
        align-items: center;
        margin-left: 10px;
        background-color: #f1f5fa;
        padding: 0 4px;
    }
    .level-card-template {
        display: flex;
        flex-direction: column;
        min-height: 190px;
        border-radius: 10px;
        background-image: url("/static/image/card_backg.png");
        background-size: 100% 100%;
        padding: 10px 10px;
        color: #e2edfe;
        .level-card-header {
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #779cd1;
            padding-bottom: 5px;
            margin: 20px 0;
        }
        .level-card-body {
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: #5788d1;
            padding: 10px 0;
            border-radius: 10px;
            & > center {
                margin-bottom: 10px;
            }
        }
    }
    .popup-template {
        height: 100%;
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
    }
    .button-get {
        background-color: #2458a3;
        color: #e2edfe;
        border-radius: 10px;
        width: 100%;
    }
    & p {
        margin: 2px 0;
        color: #8a9cb7;
        font-size: 14px;
    }
}
</style>