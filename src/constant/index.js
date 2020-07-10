import Home from '../views/home/home'

/**
 *   @fileoverview Route 结构说明
 *   @param  {object[]}  menu   左侧显示的菜单项
 *   @param  {string}    menu[].title  用于面包屑和菜单栏
 *   @param  {Node}    menu[].icon    菜单栏的图标
 *   @param  {string}    menu[].key     指定路由
 *   @param  {string}    menu[].className   菜单的类名
 *   @param  {node}      component   这个 key 指定路由展示的 组件
 *   @param  {object[]}  subs        下一级的路由  同menu
 *   @param  {object[]}  others      不在菜单中展示的路由  同menu
 */ 
const allRoutes = {
    menus: [
        {
            title: '首页',
            key: '/app/index',
            icon: 'home',
            className:'_ab_Home', 
            component: Home
        },
        // {
        //     title: "待办任务",
        //     key: 'customer',
        //     className:'_ab_customer', 
        //     subs: [
        //         {
        //             title: '待处理的客户进件',
        //             num:'1',
        //             key: '/app/processed',
        //             className:'_ab_Processed',
        //             component: Processed
        //         }
        //     ]
        // },
    ],
    others: [
    ],
};

const rootSubmenuKeys = (function () {
    let rootSubmenuKeys = [];
    allRoutes.menus.forEach(item => {
      if (!item.subs || item.subs.length === 0) {
        rootSubmenuKeys = [...rootSubmenuKeys, [item.key]]
      } else {
        rootSubmenuKeys = [...rootSubmenuKeys, ...toArr(item, [item.key])]
      }
    })
    function toArr({ subs, key }) {
      let ar = []
      if (subs && subs.length) {
        for (let i=0; i < subs.length; i++) {
          let arr = toArr(subs[i])
          arr.forEach((item, i) => {
            item.unshift(key)
            ar.push(item)
          })
        }
      } else {
        ar.push([key])
      }
      return ar
    }
    return rootSubmenuKeys;
  }());

export {
    allRoutes,
    rootSubmenuKeys,
}