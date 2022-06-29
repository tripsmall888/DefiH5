<template>
    <div class="content">
        <van-nav-bar :title="$t('message.lang')" class="van-nav-var-style">
            <template #left>
                <van-icon name="down" @click="toUp" />
            </template>
        </van-nav-bar>
        <van-radio-group v-model="state.checked" class="lang-change-style" checked-color="#2457A3" @change="changeLang">
            <van-radio name="en" shape="square" class="van-radio-style" :style="{'opacity':state.checked === 'en'?'1':'0.5'}">English</van-radio>
            <van-radio name="zh" shape="square" class="van-radio-style" :style="{'opacity':state.checked === 'zh'?'1':'0.5'}">简体中文</van-radio>
            <van-radio name="ch" shape="square" class="van-radio-style" :style="{'opacity':state.checked === 'ch'?'1':'0.5'}">繁体中文</van-radio>
        </van-radio-group>
    </div>
</template>
<script lang="ts">
import {
    defineComponent,
    getCurrentInstance,
    onMounted,
    reactive,
} from "vue";
import { useRouter } from "vue-router";
import { NavBar, Icon, RadioGroup, Radio } from "vant";

export default defineComponent({
    components: {
        [NavBar.name]: NavBar,
        [Icon.name]: Icon,
        [RadioGroup.name]: RadioGroup,
        [Radio.name]: Radio,
    },
    setup() {
        const context = getCurrentInstance() as any;
        const router = useRouter();
        const methods = {
            // 返回首页
            toUp() {
                //console.log(router);
                router.push({ name: "/main" });
            },
            changeLang() {
                context.ctx.$i18n.locale = state.checked;
                window.localStorage.setItem('lang',state.checked);
            },
        };
        const state = reactive({
            checked: "zh",
        });
        onMounted(() => {
            state.checked = context.ctx.$i18n.locale;
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
    .lang-change-style {
        padding: 0 18px;
        ::v-deep(.van-radio__label) {
            color: #0c326a;
            font-size: 16px;
        }
        .van-radio-style {
            margin-top: 20px;
            padding-bottom: 15px;
            border-bottom: 1px solid #f1f5fa;
        }
    }
}
</style>