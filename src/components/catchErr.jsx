import React from 'react'
import {withRouter} from 'react-router-dom'

@withRouter
class CatchErr extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        // console.dir(info)
        // 解决anubis 因删除菜单造成页面跳转失败
        if(error.message.includes('removeChild')){
            window.location.href = window.location.href
        }
    }

    render() {
        if (this.state.hasError) {
            return <h1>未知错误，请刷新页面，也可 <a href="/">返回首页</a></h1>;
        }
        return this.props.children;
    }
}
export default CatchErr