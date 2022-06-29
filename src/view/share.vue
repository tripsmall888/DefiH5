<template>
    <div class="content">
        <van-nav-bar :title="$t('message.share')"
                     class="van-nav-var-style">
            <template #left>
                <van-icon name="down"
                          @click="toUp" />
            </template>
        </van-nav-bar>
        <div class="bg">
            <van-icon name="/static/image/share_logo.png"
                      size="80"
                      class="bg-icon"></van-icon>
            <div class="bg-card">
                <center>{{$t('message.richScan')}}</center>
                <center style="margin:10px 0 20px;">
                    <div id="qrcode"></div>
                </center>
                <center style="margin: 10px 0;">{{$t('message.orCopy')}}</center>
                <span>{{state.url}}</span>
                <div style="margin-top:15px">
                    <van-button style="width:100%;color:#E2EDFE;"
                                color="#2458A3"
                                @click="copyAddress">{{$t('message.copyInviUrl')}}</van-button>
                </div>

                <div style="color:#0C326A;margin-top:50px;">
                    <center>{{$t('message.inviUrl')}}</center>
                    <div style="display:flex;margin:15px 0">
                        <span style="flex:1">{{state.defaultAccount}}</span>
                        <div style="margin-left:20px;">
                            <van-button class="van-button-bg"
                                        plain
                                        color="#2458A3"
                                        @click="copyAddress">{{$t('message.copy')}}</van-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script lang="ts">
// 调起服务
import web3Process from "@/components/web3";
const process = web3Process();
import {
    defineComponent,
    getCurrentInstance,
    onMounted,
    reactive,
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
} from "vant";
import { useRouter } from "vue-router";

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
    },
    setup() {
        const state = reactive({
            url: "",
            defaultAccount:''
        });
        const ctx = getCurrentInstance() as any;
        const router = useRouter();
        const methods = {
            // 返回首页
            toUp() {
                //console.log(router);
                router.push({ name: "/main" });
            },
            /**复制地址 */
            copyAddress() {
                let input = document.querySelector("#copyinput") as any;
                input.setAttribute("value", state.url);
                input.select();
                document.execCommand("copy");
                Notify({
                    type: "success",
                    message: ctx.proxy.$t("message.copySuccess"),
                });
            },
        };
        onMounted(() => {
            process.then((web) => {
                state.defaultAccount = web.defaultAccount;
                state.url = web.extensionURL();
                new (window as any).QRCode(document.getElementById("qrcode"), {
                    text: state.url,
                    width: 128,
                    height: 128,
                });
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
        ::v-deep(.van-icon){
            transform: rotate(90deg);
            font-size: 26px;
            color: #0c326a;
        }
    }
    .bg {
        background-image: url("/static/image/share_bg.png");
        background-size: 100% 100%;
        height: calc(100vh - 61px);
        width: 100vw;
        .bg-icon {
            display: flex;
            justify-content: center;
            padding-top: 40px;
            position: relative;
            top: 40px;
        }
        .bg-card {
            font-size: 14px;
            color: #a16a0c;
            width: 80%;
            margin: 0 auto;
            background-color: #fff;
            height: 75%;
            border-radius: 10px;
            word-break: break-word;
            padding: 50px 5% 0;

            span {
                font-size: 12px;
                width: 100%;
                word-break: break-all;
            }
            .van-button-bg {
                background-color: #e8eef5;
                font-size: 12px;
                padding: 6px 10px;
                height: auto;
                border: 0;
            }
        }
    }
}
</style>