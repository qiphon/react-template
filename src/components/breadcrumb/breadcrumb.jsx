import React, { Component } from 'react'
import { Breadcrumb } from 'antd'
import { inject, observer } from 'mobx-react'

@inject("Store") @observer
class BCrumb extends Component {
    Breadcrumb(){
    
    }
    // BItem(crumbs){
    //     return crumbs.length > 0 &&
    //         (
    //             <Breadcrumb
    //                 style={{
    //                     margin: ' 0 16px',
    //                     position: 'relative',
    //                     top: 13
    //                 }}
    //                 key="000"
    //             >
    //                 {
    //                     crumbs.map((obj, index,arry) => {
    //                         if (index == arry.length - 1) {
    //                             return <Breadcrumb.Item key={index}>{obj.title}</Breadcrumb.Item>
    //                         } else {
    //                             return <Breadcrumb.Item key={index}><a href={obj.key}>{obj.title}</a></Breadcrumb.Item>
    //                         }
    //                     })
    //                 }
    //             </Breadcrumb>
    //         )
    // }
    render() {
        return  <>
            {/* {this.BItem(crumbs)} */}
        </>
    
    }
}

// Breadcrumb(){

// }
// BItem(crumbs){
//     return crumbs.length > 0 &&
//         (
//             <Breadcrumb
//                 style={{
//                     margin: ' 0 16px',
//                     position: 'relative',
//                     top: 13
//                 }}
//                 key="000"
//             >
//                 {
//                     crumbs.map((obj, index,arry) => {
//                         if (index == arry.length - 1) {
//                             return <Breadcrumb.Item key={index}>{obj.title}</Breadcrumb.Item>
//                         } else {
//                             return <Breadcrumb.Item key={index}><a href={obj.key}>{obj.title}</a></Breadcrumb.Item>
//                         }
//                     })
//                 }
//             </Breadcrumb>
//         )
// }
// render() {
//     let crumbs = [];
//     crumbs.push(this.props.Store.crumbs["首页"]);
//     this.props.pathN.split("/").forEach((it,index) => {
//         let crumb = this.props.Store.crumbs[it];
//         crumb && crumbs.push(crumb);
//     })
//     return  <React.Fragment>
//         {this.BItem(crumbs)}
//     </React.Fragment>

// }
export default BCrumb
