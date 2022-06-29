import web3Process from "@/components/web3";
import { reactive } from "vue";
import moment from 'moment'
export const notice = `暂无公告`;
export interface depositItem {
  imgURL: string; //icon
  imgName: string; // icon名称
  deposit: string; // 描述
  earn: string;
  arp: string;
  contractObject: string; // 对应合约对象，禁止修改
  authorization: boolean; //是否授权
  balance: number | string; //余额
}
type child = {
  [address: string]: {
    vipLevel?: string;
    child: {
      [address: string]: {
        vipLevel?: string;
      };
    };
  };
};
const depositItems = reactive([
  {
    imgURL: "/static/image/iconFRE.png",
    imgName: "TMT",
    deposit: "TMT",
    earn: "TMT",
    arp: "200",
    dst:false,
    over7:false,
    contractObject: "freTokenContractObject",
    authorization: false,
    balance: "",
    contractName: 'freTokenContractAddress'
  },
  {
    imgURL: "/static/image/BTC.png",
    imgName: "BTC+TMT",
    deposit: "BTC+TMT",
    earn: "TMT",
    arp: "200",
    dst:false,
    over7:false,
    contractObject: "btcTokenContractObject",
    authorization: false,
    balance: "",
    contractName: 'btcTokenContractAddress'
  },
  {
    imgURL: "/static/image/usdt.png",
    imgName: "USDT+TMT",
    deposit: "USDT+TMT",
    earn: "TMT",
    arp: "200",
    dst:false,
    over7:false,
    contractObject: "usdtTokenContractObject",
    authorization: false,
    balance: "",
    contractName: 'usdtTokenContractAddress'
  },
  {
    imgURL: "/static/image/BNB.png",
    imgName: "BNB+TMT",
    deposit: "BNB+TMT",
    earn: "TMT",
    arp: "200",
    dst:false,
    over7:false,
    contractObject: "bnbTokenContractObject",
    authorization: false,
    balance: "",
    contractName: 'bnbTokenContractAddress'
  },
  {
    imgURL: "/static/image/ETH.png",
    imgName: "ETH+TMT",
    deposit: "ETH+TMT",
    earn: "TMT",
    arp: "200",
    dst:false,
    over7:false,
    contractObject: "ethTokenContractObject",
    authorization: false,
    balance: "",
    contractName: 'ethTokenContractAddress'
  },
  
  {
    imgURL: "/static/image/people.png",
    imgName: "PEOPLE+TMT",
    deposit: "PEOPLE+TMT",
    earn: "TMT",
    arp: "200",
    dst:false,
    over7:false,
    contractObject: "peopleContractObject",
    authorization: false,
    balance: "",
    contractName: 'peopleTokenContractAddress'
  },
]);

export const subordinate: child = {};

web3Process().then((web) => {
  depositItems.forEach((item) => {
    web.getDST(item.contractName).then((dst:number)=>{
      let status = false;
      if(Number(dst)>0){
        const unix = moment().unix();
        // status = (unix-dst)/3600 >= 1;
        status = (unix-dst)/86400 >= 7;
      }else if(Number(dst) === 0){
        status=true;
      }
      item.dst = status;
    });
  });
  getChild(web);
  setInterval(() => {
    checkAuth(web);
  }, 600000);
});
export function getChild(web) {
  setTimeout(() => {
    web.getChilders(web.defaultAccount, {
      callback(res = []) {
        res.forEach((i) => {
          subordinate[i] = {
            child: {},
          };
          web.getMyLevel(subordinate[i], "vipLevel");
        });
        Object.keys(subordinate).forEach((i) => {
          web.getChilders(i, {
            callback(res = []) {
              //console.log("res", res);
              res.forEach((k) => {
                Promise.resolve().then((_) => {
                  subordinate[i].child[k] = {};
                  web.getMyLevel(subordinate[i].child[k], "vipLevel");
                });
              });
            },
          });
        });
      },
    });
  });
}
export function checkAuth(web) {
  depositItems.forEach((item) => {
    if (item.contractObject !== "bnbTokenContractObject") {
      web.getBalances(item.contractObject, item, "balance");
      web.getAllowance(item.contractObject, item, "authorization");
    } else {
      web.web3.eth.getBalance(web.defaultAccount).then((res) => {
        item.balance = Number(res / 1e18).toFixed(4);
      });
    }
  });
}
export default depositItems;
