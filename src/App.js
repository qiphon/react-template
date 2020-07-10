import React, { Component } from 'react';
import { Layout, ConfigProvider } from 'antd';
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import Rts from './components/route/route'
import Header from './components/header/header'
import CustomMenu from "./components/menus/menu";
import BCrumb from './components/breadcrumb/breadcrumb';
// import Store from './store/index'
import { renderMenu } from './constant/index';
import CatchErr from './components/catchErr'

//插件语言变为中文
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('en');

const {
  Content, Sider,
} = Layout;

@inject("Store") @observer
class App extends Component {
  state = {
    collapsed: false,
    path: ''      // 当前的路由
  }
  componentWillMount() {
  }
  componentDidMount() {
  }
  componentWillReceiveProps(props) {
  }
  // react 错误处理机制
  // componentDidCatch(error, info){
  //   window.location.href = window.location.href
  // }
  toggleSlide() {   // 是否收起左侧列表
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
  render() {
    // console.log(this.props.Store)
    return (
      <ConfigProvider locale={zhCN}>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <div className="logo" style={{ fontSize: '14px' }}>
              {/* <img src={require('./image/logo.png')}/> */}
            title
          </div>
            <CustomMenu menus={this.props.Store.userMenus} />
          </Sider>
          <Layout>
            <Header onToggle={ev => this.toggleSlide()} />
            {this.state.path !== '/' && <BCrumb pathN={this.state.path} />}
            <Content
              style={{
                margin: 15, background: '#fff', minHeight: 280, position: 'relative', border: '1px solid rgba(240,242,245,1)'
              }}
            >
              <Rts />
            </Content>
          </Layout>
        </Layout>
      </ConfigProvider>
    );
  }
}

export default withRouter(App);
