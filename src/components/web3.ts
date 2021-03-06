const web3 = require('web3').default;
// import Axios from "axios";
// import depositItems from '@/components/typeConfig'
let singleton: Promise<any>;
type options = {
  address?: string;
  callback: Function;
};

// const window:any = Window
export class WEB {
  defaultAccount: string = "";
  version: string = "";
  web3?: any;

  freTokenContractAddress = "0xA9ef15CF0D72Bf6ae5e408967fa9A03A8e21129f";
  freMinerContractAddress = "0x38b95Ce5473e057859cD25140d16886b7f67bC87";

  bnbTokenContractAddress = "0x0000000000000000000000000000000000000002";
  usdtTokenContractAddress = "0x55d398326f99059ff775485246999027b3197955";
  ethTokenContractAddress = "0x2170ed0880ac9a755fd29b2688956bd959f933f8";
  btcTokenContractAddress = "0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c";
  peopleTokenContractAddress = "0x2c44b726ADF1963cA47Af88B284C06f30380fC78";

  freTokenContractAbi: any = [{ "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "getOwner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "maxSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "recipient_", "type": "address" }, { "internalType": "uint256", "name": "amount_", "type": "uint256" }], "name": "mint", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "setOwner", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }];
  freMinerContractAbi: any =[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"address","name":"inviter","type":"address"}],"name":"BindingParents","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"tokenaddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"pct","type":"uint256"}],"name":"TakedBack","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"tradetoken","type":"address"}],"name":"TradingPooladded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"tokenaddress","type":"address"},{"indexed":true,"internalType":"address","name":"useraddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"hashb","type":"uint256"}],"name":"UserBuied","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"userlevel","type":"uint256"}],"name":"VipChanged","type":"event"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"blocknum","type":"uint256"},{"internalType":"uint256","name":"pendingreward","type":"uint256"}],"name":"ChangeWithDrawPoint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"InitalContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"address","name":"parent","type":"address"}],"name":"SetParentByAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"pct","type":"uint256"}],"name":"TakeBack","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"WithDrawCredit","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"_lphash","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_maxcheckpoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"_userInfos","outputs":[{"internalType":"uint256","name":"selfhash","type":"uint256"},{"internalType":"uint256","name":"teamhash","type":"uint256"},{"internalType":"uint256","name":"userlevel","type":"uint256"},{"internalType":"uint256","name":"pendingreward","type":"uint256"},{"internalType":"uint256","name":"lastblock","type":"uint256"},{"internalType":"uint256","name":"lastcheckpoint","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"_userLphash","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"_userlevelhashtotal","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"address","name":"tradecontract","type":"address"},{"internalType":"uint256","name":"rate","type":"uint256"},{"internalType":"uint256","name":"pctmin","type":"uint256"},{"internalType":"uint256","name":"pctmax","type":"uint256"}],"name":"addTradingPool","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"parent","type":"address"}],"name":"bindParent","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"burnVal","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"newlevel","type":"uint256"}],"name":"buyVip","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"newlevel","type":"uint256"}],"name":"buyVipPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"changeOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"dppct","type":"uint256"}],"name":"deposit","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"dst","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"address","name":"tradecontract","type":"address"},{"internalType":"uint256","name":"rate","type":"uint256"},{"internalType":"uint256","name":"pctmin","type":"uint256"},{"internalType":"uint256","name":"pctmax","type":"uint256"}],"name":"fixTradingPool","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getCurrentCheckPoint","outputs":[{"internalType":"uint256[1]","name":"","type":"uint256[1]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"lptoken","type":"address"}],"name":"getExchangeCountOfOneUsdt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getFeeOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"pct","type":"uint256"}],"name":"getHashRateByPct","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"lpscale","type":"uint256"}],"name":"getLpPayfre","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMinerPoolAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getMyChilders","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"address","name":"tokenaddress","type":"address"}],"name":"getMyLpInfo","outputs":[{"internalType":"uint256[3]","name":"","type":"uint256[3]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getParent","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getPendingCoin","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"lpscale","type":"uint256"}],"name":"getPower","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalHash","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"lptoken","type":"address"}],"name":"getTradingPool","outputs":[{"components":[{"internalType":"contract LpWallet","name":"poolwallet","type":"address"},{"internalType":"uint256","name":"hashrate","type":"uint256"},{"internalType":"address","name":"tradeContract","type":"address"},{"internalType":"uint256","name":"minpct","type":"uint256"},{"internalType":"uint256","name":"maxpct","type":"uint256"}],"internalType":"struct FreMiner.PoolInfo","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"useraddress","type":"address"}],"name":"getUserLasCheckPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getUserLevel","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getUserSelfHash","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getUserTeamHash","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"lptoken","type":"address"}],"name":"getWalletAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"inviteSend","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"address","name":"userAddress","type":"address"},{"internalType":"uint256","name":"pct","type":"uint256"}],"name":"isTakeBack","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastdst","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minTakeBack","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_inviteSend","type":"uint256"}],"name":"setInviteSend","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newLastdst","type":"uint256"}],"name":"setLastdst","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_minTakeBack","type":"uint256"}],"name":"setMinTakeBack","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"pct","type":"uint256"},{"internalType":"uint256","name":"rate","type":"uint256"}],"name":"setPctRate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]
  usdtTokenContractAbi: any = [
    {
      inputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        { indexed: true, internalType: "address", name: "to", type: "address" },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      constant: true,
      inputs: [],
      name: "_decimals",
      outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "_name",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "_symbol",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        { internalType: "address", name: "owner", type: "address" },
        { internalType: "address", name: "spender", type: "address" },
      ],
      name: "allowance",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "approve",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [{ internalType: "address", name: "account", type: "address" }],
      name: "balanceOf",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
      name: "burn",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "decimals",
      outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "subtractedValue", type: "uint256" },
      ],
      name: "decreaseAllowance",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "getOwner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "addedValue", type: "uint256" },
      ],
      name: "increaseAllowance",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
      name: "mint",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "name",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "owner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "symbol",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "totalSupply",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { internalType: "address", name: "recipient", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "transfer",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { internalType: "address", name: "sender", type: "address" },
        { internalType: "address", name: "recipient", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "transferFrom",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
      name: "transferOwnership",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  ethTokenContractAbi: any = [
    {
      inputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        { indexed: true, internalType: "address", name: "to", type: "address" },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      constant: true,
      inputs: [],
      name: "_decimals",
      outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "_name",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "_symbol",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        { internalType: "address", name: "owner", type: "address" },
        { internalType: "address", name: "spender", type: "address" },
      ],
      name: "allowance",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "approve",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [{ internalType: "address", name: "account", type: "address" }],
      name: "balanceOf",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
      name: "burn",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "decimals",
      outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "subtractedValue", type: "uint256" },
      ],
      name: "decreaseAllowance",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "getOwner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "addedValue", type: "uint256" },
      ],
      name: "increaseAllowance",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
      name: "mint",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "name",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "owner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "symbol",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "totalSupply",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { internalType: "address", name: "recipient", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "transfer",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { internalType: "address", name: "sender", type: "address" },
        { internalType: "address", name: "recipient", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "transferFrom",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
      name: "transferOwnership",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  btcTokenContractAbi: any = [
    {
      inputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        { indexed: true, internalType: "address", name: "to", type: "address" },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      constant: true,
      inputs: [],
      name: "_decimals",
      outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "_name",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "_symbol",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        { internalType: "address", name: "owner", type: "address" },
        { internalType: "address", name: "spender", type: "address" },
      ],
      name: "allowance",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "approve",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [{ internalType: "address", name: "account", type: "address" }],
      name: "balanceOf",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
      name: "burn",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "decimals",
      outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "subtractedValue", type: "uint256" },
      ],
      name: "decreaseAllowance",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "getOwner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "addedValue", type: "uint256" },
      ],
      name: "increaseAllowance",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
      name: "mint",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "name",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "owner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "symbol",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "totalSupply",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { internalType: "address", name: "recipient", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "transfer",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { internalType: "address", name: "sender", type: "address" },
        { internalType: "address", name: "recipient", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "transferFrom",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
      name: "transferOwnership",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  peopleContractAbi: any = [
    {
      inputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        { indexed: true, internalType: "address", name: "to", type: "address" },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      constant: true,
      inputs: [],
      name: "_decimals",
      outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "_name",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "_symbol",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        { internalType: "address", name: "owner", type: "address" },
        { internalType: "address", name: "spender", type: "address" },
      ],
      name: "allowance",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "approve",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [{ internalType: "address", name: "account", type: "address" }],
      name: "balanceOf",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
      name: "burn",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "decimals",
      outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "subtractedValue", type: "uint256" },
      ],
      name: "decreaseAllowance",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "getOwner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "addedValue", type: "uint256" },
      ],
      name: "increaseAllowance",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
      name: "mint",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "name",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "owner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "symbol",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "totalSupply",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { internalType: "address", name: "recipient", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "transfer",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { internalType: "address", name: "sender", type: "address" },
        { internalType: "address", name: "recipient", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "transferFrom",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
      name: "transferOwnership",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  freTokenContractObject;
  freMinerContractObject;
  usdtTokenContractObject;
  ethTokenContractObject;
  btcTokenContractObject;
  peopleContractObject;

  constructor(w, account) {
    this.web3 = w;
    this.defaultAccount = account;
    this.init();
  }

  static async build() {
    let web3Provider;
    console.log(web3, window);
    if (window.ethereum) {
      web3Provider = window.ethereum;
      try {
        await window.ethereum.enable();
      } catch (error) {
        console.error("User denied account access");
      }
    } else if ("web3" in window) {
      web3Provider = (window as any).web3.currentProvider;
    } else {
      web3Provider = new (window as any).Web3.providers.HttpProvider(
        "https://bsc-dataseed1.binance.org/"
      );
    }
    // const _web3 = new web3(web3Provider);
    const _web3 = new (window as any).Web3(web3Provider);
    const [defaultAccount] = await _web3.eth.getAccounts();
    // if(!defaultAccount){
    //   alert('????????????bsc???????????????????????????')
    // }
    return new WEB(_web3, defaultAccount);
  }
  init() {
    this.version = this.web3.version;
    this.freTokenContractObject = new this.web3.eth.Contract(
      this.freTokenContractAbi,
      this.freTokenContractAddress
    );
    this.freMinerContractObject = new this.web3.eth.Contract(
      this.freMinerContractAbi,
      this.freMinerContractAddress
    );
    this.usdtTokenContractObject = new this.web3.eth.Contract(
      this.usdtTokenContractAbi,
      this.usdtTokenContractAddress
    );
    this.ethTokenContractObject = new this.web3.eth.Contract(
      this.ethTokenContractAbi,
      this.ethTokenContractAddress
    );
    this.btcTokenContractObject = new this.web3.eth.Contract(
      this.btcTokenContractAbi,
      this.btcTokenContractAddress
    );
    this.peopleContractObject = new this.web3.eth.Contract(
      this.peopleContractAbi,
      this.peopleTokenContractAddress
    )
  }

  async callFreMinerContractMethod(methodName, args, callback) {
    const myContract = this.freMinerContractObject;
    let callSend = "send";
    this.freMinerContractAbi.forEach(function (val: any) {
      if (val.name === methodName) {
        callSend = /payable/.test(val.stateMutability) ? "send" : "call";
      }
    });
    try {
      const res = await (myContract.methods[methodName](...args)
      // eslint-disable-next-line no-unexpected-multiline
      [callSend]({
        from: this.defaultAccount,
      }))
      return callback && callback(res);
    } catch (err) {
      console.error('err', err)
      console.log(methodName)
      return Promise.reject(err)
    }
  }

  /**
   * ?????????????????????????????????????????????16???????????????????????????????????????
   * @param value ??????
   */
  public getNumberToString(value: number) {
    const str = value.toString();
    //??????16?????????e?????????????????????????????????
    if (str.indexOf("e") != -1) {
      //e??????
      const eIndex = str.indexOf("e");
      //???????????????
      let pIndex = str.indexOf(".");
      //??????????????????, 400000000...?????????????????????????????????
      const bHavePoint = pIndex;
      //???????????????
      pIndex = pIndex == -1 ? 0 : pIndex;
      //???????????????????????????
      const small = eIndex - pIndex - 1;
      //e???????????????
      let result = str.substr(0, eIndex);
      //??????e?????????????????????????????????????????????
      if (bHavePoint != -1) {
        result = result.replace(".", "");
      }
      //e???????????????
      const eNum = str.substr(eIndex + 2, str.length);
      //???????????????0??????
      const len = parseInt(eNum) - small;
      for (let i = 0; i < len; i++) {
        result += "0";
      }
      //??????????????????
      return result;
    } else {
      //?????????????????????????????????
      return value.toString();
    }
  }
  // ????????????????????????
  getBalances(
    contractObject: string,
    obj: object,
    property: string,
    option?: options
  ) {
    this[contractObject].methods
      .balanceOf(this.defaultAccount)
      .call({ from: this.defaultAccount })
      .then((res) => {
        obj[property] = Number(res / 1e18).toFixed(4);
      })
      .catch(err => {
        console.log('getBalances', err)
      })
  }
  // ?????????????????????
  async getDST(res: string): Promise<number> {
    const result = await this.freMinerContractObject.methods
      .dst(this[res],this.defaultAccount)
      .call({ from: this.defaultAccount })
    return result;
  }
  async isTakeBack(res: string,pct:number): Promise<boolean> {
    const result = await this.freMinerContractObject.methods
      .isTakeBack(this[res],this.defaultAccount,pct)
      .call({ from: this.defaultAccount })
    return result;
  }

  // ?????????????????? ??????????????????????????????
  getAllowance(
    contractObject: string,
    obj: object,
    property: string,
    option?: options
  ) {
    this[contractObject].methods
      .allowance(this.defaultAccount, this.freMinerContractAddress)
      .call({ from: this.defaultAccount })
      .then((res) => {
        obj[property] = res > 0;
      })
      .catch(err => {
        console.log('getAllowance', err)
      })
  }

  // ??????
  approve(contractObject: string, option?: options) {
    const max =
      "115792089237316195423570985008687907853269984665640564039457584007913129639935";
    this[contractObject].methods
      .approve(this.freMinerContractAddress, max)
      .send({ from: this.defaultAccount })
      .then((res) => {
        //console.log("approve res=", res);
        option?.callback(res);
      })
      .catch((err) => {
        console.log("approve error=", err);
        option?.callback(null, true);
        // Notify({
        //     type: "warning",
        //     message: "???????????????",
        // });
      });
  }

  // ????????????
  getMyLevel(obj, property) {
    this.callFreMinerContractMethod(
      "getUserLevel",
      [this.defaultAccount],
      (res) => {
        obj[property] = res;
      }
    );
  }

  // ???????????????????????????FRE????????????
  buyVipPrice(newlevel, obj, property, option?: options) {
    this.callFreMinerContractMethod(
      "buyVipPrice",
      [this.defaultAccount, newlevel],
      (res) => {
        //console.log(res / 1e18);
        obj[property] = (res / 1e18).toFixed(4);
        option && option.callback();
      }
    );
  }

  // ????????????
  async buyVip(newlevel, option?: options) {
    const depositItems = require('@/components/typeConfig').default
    if (!depositItems[0].authorization) {
      await this.freTokenContractObject.methods.approve(this.freMinerContractAddress, '115792089237316195423570985008687907853269984665640564039457584007913129639935').send({ from: this.defaultAccount })
    }
    this.callFreMinerContractMethod("buyVip", [newlevel], (res) => {
      option && option.callback(res);
    }).catch((err) => {
      console.log(err, "err");
      alert("??????????????????");
    });
    if (newlevel > 7 || newlevel < 0) {
      alert("??????????????????");
      return;
    }
  }

  // ????????????????????????
  inviteSend(){
    const {inviteSend} = this.freMinerContractObject.methods;
    return inviteSend().call();
  }
  // ?????????????????????
  changePrice(res: number): string {
    // eslint-disable-next-line no-unexpected-multiline
    const arr = /\d+e-(\d+)/.exec(String(res)) as any;
    let num = String(res).replace(".", "");
    for (let k = arr[1]; k > 1; k--) {
      num = "0" + num;
    }
    const strArr = ("0." + num).split("");
    strArr.length = Number(arr[1]) + 4;
    return strArr.join("");
  }
  // ??????FRE????????????USDT????????????
  getPrice(obj: object, property: string, option?: options) {
    this.callFreMinerContractMethod(
      "getExchangeCountOfOneUsdt",
      [this.freTokenContractAddress],
      (res) => {
        if (/e-/.test(String(1e18 / res))) {
          obj[property] = this.changePrice(1e18 / res);
        } else {
          obj[property] = parseFloat(String(1e18 / res)).toFixed(4);
        }
        option && option.callback(obj[property]);
      }
    );
  }

  // ????????????
  getSelfPower(obj, property) {
    this.callFreMinerContractMethod(
      "getUserSelfHash",
      [this.defaultAccount],
      (res) => {
        let num = String(res / 1e18);
        if (/e-/.test(String(res / 1e18))) {
          num = this.changePrice(res / 1e18);
        } else {
          num = (res / 1e18).toFixed(4);
        }
        //console.log(res, num);
        obj[property] = num;
      }
    );
  }

  // ??????????????????
  public getParent(obj: object, property: string, option?: options): void;
  public getParent(address: string, property?: string, option?: options): void;
  getParent(adds: any, property?: any, option?: any) {
    this.callFreMinerContractMethod(
      "getParent",
      [option?.address ? option.address : this.defaultAccount],
      (res) => {
        if (typeof adds === "string") {
          option && option.callback(res);
        } else {
          if (typeof adds[property] === "boolean") {
            adds[property] = Boolean(Number(res));
            if (option) {
              option.callback(Boolean(Number(res)));
            }
          } else {
            adds[property] = res;
            option?.callback(res);
          }
        }
      }
    );
  }

  // ??????????????????
  getChilders(address = this.defaultAccount, option?: options) {
    this.callFreMinerContractMethod("getMyChilders", [address], (res) => {
      //console.log(res);
      option?.callback(res);
    });
  }

  // ????????????
  getPendingCoin(obj, property) {
    this.callFreMinerContractMethod(
      "getPendingCoin",
      [this.defaultAccount],
      (res_fre) => {
        this.callFreMinerContractMethod(
          "getExchangeCountOfOneUsdt",
          [this.freTokenContractAddress],
          (res_price) => {
            let fre = res_fre / res_price;
            if (/e-/.test(String(fre))) {
              fre = this.changePrice(fre) as any;
            }
            obj[property] = Number(fre).toFixed(4);
          }
        );
      }
    );
  }

  // ????????????
  withDrawCredit(option?: options) {
    this.callFreMinerContractMethod("WithDrawCredit", [], (res) => {
      //console.log("WithDrawCredit res=", res);
      option?.callback(res);
    }).catch((err) => {
      option?.callback(null, err);
      //console.log("WithDrawCredit error=", err);
    });
  }

  // ????????????
  //pct???????????????10000-1000000
  takeBack(tokenAddress, pct, option?: options) {
    //console.log(pct, "pct");
    if (pct < 10000 || pct > 1000000) {
      alert("???????????????????????????");
      return;
    }
    this.callFreMinerContractMethod(
      "TakeBack",
      [this[tokenAddress], pct],
      (res) => {
        //console.log("TakeBack res=", res);
        option?.callback();
      }
    ).catch((err) => {
      option?.callback(null, true);
    });
  }

  // ??????????????????
  getUserTeamHash(obj, property) {
    this.callFreMinerContractMethod(
      "getUserTeamHash",
      [this.defaultAccount],
      (res) => {
        obj[property] = (res / 1e18).toFixed(4);
      }
    );
  }

  // // ????????????
  // deposit(tokenAddress, amount, dppct, option?: options) {
  //   this.callFreMinerContractMethod(
  //     "deposit",
  //     [this[tokenAddress], (amount * 1e18).toString(), dppct],
  //     (res) => {
  //       option?.callback();
  //     }
  //   ).catch((err) => {
  //     option?.callback(null, err);
  //   });
  // }

  // ????????????
  deposit(tokenAddress, amount, dppct, option?: options) {
    // eslint-disable-next-line prefer-rest-params
    console.log(arguments);
    if (tokenAddress == "bnbTokenContractAddress") {
      this.freMinerContractObject.methods
        .deposit(this[tokenAddress], 0, dppct)
        .send({
          from: this.defaultAccount,
          value: this.getNumberToString(amount * 1e18),
        })
        .then((res) => {
          option?.callback();
        })
        .catch((err) => {
          option?.callback(null, err);
        });
    } else {
      this.callFreMinerContractMethod(
        "deposit",
        [this[tokenAddress], this.getNumberToString(amount * 1e18), dppct],
        (res) => {
          option?.callback();
        }
      ).catch((err) => {
        console.error(err);
        option?.callback(null, err);
      });
    }
  }

  // ??????????????????
  getDepositPower(tokenAddress, amount, dppct, option?: options) {
    // eslint-disable-next-line prefer-rest-params
    console.log(arguments);
    this.callFreMinerContractMethod(
      "getPower",
      [this[tokenAddress], this.getNumberToString(amount * 1e18), dppct],
      (res) => {
        //console.log(res / 1e18);
        let num = String(res / 1e18);
        if (/e-/.test(String(res / 1e18))) {
          num = this.changePrice(res / 1e18);
        } else {
          num = (res / 1e18).toFixed(4);
        }
        option?.callback(num);
      }
    );
  }

  // ?????????????????????????????????FRE
  getLpPayfre(tokenAddress, amount, dppct, option?: options) {
    this.callFreMinerContractMethod(
      "getLpPayfre",
      [this[tokenAddress], this.getNumberToString(amount * 1e18), dppct],
      (res) => {
        //console.log(res / 1e18);
        option?.callback((res / 1e18).toFixed(4));
      }
    );
  }
  // ??????????????????
  getMyLpInfo(tokenAddress, option?: options) {
    this.callFreMinerContractMethod(
      "getMyLpInfo",
      [this.defaultAccount, this[tokenAddress]],
      (res) => {
        option?.callback(res);
      }
    );
  }

  //????????????????????????
  bindParent(parent, callback?: Function) {
    this.callFreMinerContractMethod("bindParent", [parent], (res) => {
      callback ? callback(res) : "";
    }).catch((err) => {
      callback && callback(null, err);
    });
  }

  // ?????????????????????
  checkAddress(addr: string): boolean | unknown {
    try {
      return this.web3.utils.checkAddressChecksum(addr) as boolean;
    } catch (err) {
      //console.log(err);
    }
  }

  // ?????????????????????
  getHashRateByPct(pct: number, option?: options) {
    try {
      this.callFreMinerContractMethod("getHashRateByPct", [pct], (res) => {
        option ? option.callback(res) : "";
      });
    } catch (err) {
      //console.log(err);
    }
  }

  // ????????????
  extensionURL(): string {
    let url = "";
    if (window.location.protocol == "") {
      url =
        "https://" +
        window.location.origin +
        "/" +
        "?address=" +
        this.defaultAccount;
    } else {
      url = window.location.origin + "/" + "?address=" + this.defaultAccount;
    }
    return url;
  }
  // ?????????
  getTotalHash(obj, property) {
    this.callFreMinerContractMethod("getTotalHash", [], (res) => {
      console.log("res", res);
      obj[property] = (res / 1e18).toFixed(4);
    }).catch((err) => {
      console.log(err);
    });
  }

  //????????????
  burnVal(obj, property) {
    this.callFreMinerContractMethod("burnVal", [], (res) => {
      console.log(res);
      obj[property] = (res / 1e18).toFixed(4);
    }).catch((err) => {
      console.log(err);
    });
  }
}
export default () => {
  if (!singleton) singleton = WEB.build();
  return singleton;
};
