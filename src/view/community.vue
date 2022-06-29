<template>
    <div class="content">
        <van-nav-bar :title="$t('message.community')" class="van-nav-var-style">
            <template #left>
                <van-icon name="down" @click="toUp" />
            </template>
        </van-nav-bar>
        <div class="van-card__title" :class="{'van-card-style-isActived':!isActivite}">
            <div style="display:flex;align-items:center;">
                <span style="font-size:18px;">{{$t('message.upervisor')}}</span>
                <span>
                    <div class="van-card-title-vip">
                        <van-icon name="/static/image/icon_vip.png" size="25" style="margin:-2px 0 -5px;"></van-icon>
                        <span style="margin-left:3px;color:#F7A924;">{{state.vipLevel}}</span>
                    </div>
                </span>
            </div>
            <div style="word-break: break-all;font-size:14px;color:#BDCDE7;margin:5px 0 15px;">{{state.ownAddress}}</div>
        </div>

        <div class="van-tabs-template">
            <div class="van-tabs-style">
                <div>
                    <van-button style="border-radius:10px 0 15px 0;" :class="{'button-active-actived':state.active}" @click="changeTabs(true)">{{$t('message.introduce')}}</van-button>
                    <van-button style="border-radius:0 10px 0 15px;" :class="{'button-active-actived':!state.active}" @click="changeTabs(false)">{{$t('message.suggested')}}</van-button>
                </div>
            </div>
            <!-- 地址 -->
            <van-card v-for="(item,index) in Object.keys(currencys)" :key="index" class="van-card-template">
                <template #title>
                    <div style="display:flex;align-items:center;">
                        <span style="font-size:18px;">{{`地址${index+1}`}}</span>
                        <span>
                            <span class="van-card-title-vip">
                                <van-icon name="/static/image/icon_vip.png" size="25" style="margin:-2px 0 -5px;"></van-icon>
                                <span style="margin-left:3px;color:#F7A924;font-size:16px;">{{currencys[item].vipLevel}}</span>
                            </span>
                        </span>
                    </div>
                </template>
                <template #thumb>
                    <van-icon name="/static/image/wdsq_icon.png" size="50"></van-icon>
                </template>
                <template #desc>
                    <div class="car-desc-flex">
                        <span style="word-break: break-all;"> {{item}}</span>
                        <van-button color="#E9EEF5" style="font-size:12px;padding:0;width:50px;height:23px;color:#2D5FA6" @click="oncopy(item)">{{$t('message.copy')}}</van-button>
                    </div>
                </template>
                <template #footer>
                    <div class="van-card-footer" v-if="state.active">
                        <span>{{$t('message.directly')+'：'+Object.keys(currencys[item].child).length}}</span>
                    </div>
                </template>
            </van-card>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted } from "@vue/runtime-core";
import { reactive } from "vue";
import { NavBar, Icon, Tab, Tabs, Card, Button, Notify } from "vant";
import {subordinate} from '../components/typeConfig'
import { useRouter } from "vue-router";
// 调起服务
import web3Process, { WEB } from "@/components/web3";
const process = web3Process();
export default defineComponent({
    components: {
        [NavBar.name]: NavBar,
        [Icon.name]: Icon,
        [Tab.name]: Tab,
        [Tabs.name]: Tabs,
        [Card.name]: Card,
        [Button.name]: Button,
    },
    computed:{
        currencys(){
            if(this.state.active){
                return (this as any).state.currencys
            }else{
                let child = {}
                Object.keys((this as any).state.currencys).forEach(i=>{
                    const real = (this as any).state.currencys[i].child
                    Object.keys(real).forEach(k=>{
                        child[k]=real[k]
                    })
                })
                return child
            }
        }
    },
    setup() {
        const { ctx } = getCurrentInstance() as any;
        const state = reactive({
            vipLevel: 0, // vip等级
            ownAddress: "", //钱包地址
            active: true, //tabs
            currencys:subordinate,
            web3Provide: {} as WEB,
        });
        const router = useRouter();
        const methods = {
            // 切换tabs
            changeTabs(type: boolean) {
                state.active = type;
            },
            // 复制
            oncopy(address: string) {
                let input = document.querySelector("#copyinput") as any;
                input.setAttribute("value", address);
                input.select();
                document.execCommand("copy");
                Notify({
                    type: "success",
                    message: ctx.$t("message.copySuccess"),
                });
            },
            // 返回首页
            toUp() {
                //console.log(router);
                router.push({ name: "/main" });
            },
        };
        onMounted(()=>{
            process.then((web) => {
            state.web3Provide = web;
            web.getParent(state, "ownAddress");
            web.getMyLevel(state, "vipLevel");
            //console.log('subordinate',subordinate)
        });
        })
        return {
            state,
            ...methods,
        };
    },
});
</script>
<style lang="less" scoped>
.content {
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
    background-image: url("/static/image/wdsq_bg@2x.png");
    background-size: 110% 110%;
    background-position: center;
    display: flex;
    flex-direction: column;

    ::v-deep(.van-hairline--bottom::after) {
        border-bottom-width: 0;
    }
    .van-nav-var-style {
        padding-top: 15px;
        background-color: transparent;
        ::v-deep(.van-nav-bar__title) {
            color: #fff;
            font-size: 18px;
        }
        ::v-deep(.van-icon) {
            transform: rotate(90deg);
            font-size: 26px;
            color: #fff;
        }
    }
    .van-card__title {
        color: #fff;
        padding: 10px 18px;
        .van-card-title-vip {
            display: flex;
            align-items: center;
            margin-left: 10px;
            background-color: #406ba9;
            padding: 0 4px;
        }
    }
    .van-tabs-template {
        border-radius: 10px 10px 0 0;
        background-color: #fff;
        margin: 30px 18px 20px;
        flex: 1;

        .van-tabs-style {
            border-radius: 10px 10px 0 0;
            ::v-deep(.van-button--default) {
                border: 0;
                background-color: #dbe3f3;
                width: 50%;
                font-size: 16px;
                color: #2458a3;
                border-radius: 10px 10px 0 0;
                opacity: 0.5;
            }
            ::v-deep(.van-button)::before {
                background-color: transparent;
            }

            .button-active-actived {
                opacity: 1;
                background-color: transparent;
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
            margin:0 auto 20px;
            border: 1px #f4f8fd solid;
            border-radius: 5px;
            box-shadow: 0px 7px 10px #f4f8fd;
            padding: 10px 0;

            .car-desc-flex {
                display: flex;
                justify-content: space-between;
                color: #8598b4;
                font-size: 14px;

                .car-desc-button {
                }
            }
            .van-card-title-vip {
                display: flex;
                align-items: center;
                margin-left: 10px;
                background-color: #e9eef5;
                padding: 0 4px;
            }
            .van-card-footer {
                color: #99a9c1;
                padding: 0 15px;
                margin-top: 15px;
                display: flex;
                text-align: left;
                justify-content: space-between;
                padding-top: 5px;
                border-top: 1px solid #f4f8fd;
            }
        }
    }
}
</style>
