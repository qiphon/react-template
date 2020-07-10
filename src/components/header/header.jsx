import React from 'react'
import { Badge, Dropdown, Menu, Alert, Layout } from 'antd'
import screenfull from 'screenfull'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import './style.scss'
import API from '../../http/API'

const Header = Layout.Header;
@withRouter @inject("Store") @observer
class HeaderBar extends React.Component {
    state = {
        icon: 'arrows-alt',
        count: 100,
        visible: false,
        ipt_value: '',
        search_none: true,
        focus: false,            // 搜索框是否聚焦
        isShowModel:false,//用于控制用户列表信息 是否显示
        isShowRed:false,
        dataList:[],
        CmShow:'',
    }

    componentDidMount() {
        window.sys_logout = this.logout
    }
    toggle = () => {
        this.props.onToggle()
    }
    screenfullToggle = () => {
        if (screenfull.enabled) {
            screenfull.toggle()
        }
    }
    logout = () => {
        API.Logout().then(({data})=>{
            this.props.Store.updateUser(null);
            this.props.history.push("/login");
        })
    }
    ModifyPassword=()=>{
        this.props.history.push("/loginout");
    }
    componentWillUnmount() {
    }
    componentWillReceiveProps(nextProps, nextContext) {
        // console.log(nextProps, nextContext,"nextContext")
    }
    handleMenuClick=(e)=>{
        // sessionStorage.setItem('CmShow',e.key)
        this.setState({
            CmShow:e.key
        })
    }
    render() {
        const { collapsed } = this.props
        const menu = (
            <Menu className='menu'>
                <Menu.Item><span onClick={e => this.ModifyPassword()}>修改密码</span></Menu.Item>
                <Menu.Item><span onClick={e => this.logout()}>退出登录</span></Menu.Item>
            </Menu>
        )
        const login = (
            <Dropdown overlay={menu} trigger={["click"]}>
                <div style={{ cursor: 'pointer' }}>
                    <img style={style.userAvatar}
                        onClick={() => this.setState({ visible: true })}
                        src={require('../../image/no-pic.jpg')} alt="" />
                </div>
            </Dropdown>
        )
        const { isShowModel, isShowRed } = this.state;
        return (
            <Header
                style={{
                    background: 'rgb(59, 116, 255)',
                    position:"relative"
                }}
               
            >
                <div style={{ lineHeight: '64px', float: 'right' }}>
                    <div className='' style={style.headerRight}>
                        <div
                            onClick={() => this.setState({ count: 0 })}
                            style={style.headerTask}>
                            <Badge count={0} overflowCount={99} >
                                <div style={{color:'#fff'}}>{this.props.Store.users&&this.props.Store.users.name}</div>
                                {isShowRed?<span style={style.icon}></span>:""} 
                            </Badge>
                        </div>
                        <div
                            style={style.headerTask}
                        >
                            {login}
                        </div>
                    </div>
                    {
                        this.state.search_none ?
                            '' : (<Alert message="查询结果为空" type="error" style={style.error} />)
                    }
                </div>
                {isShowModel ? <div className="newUesrOrder" onMouseLeave={() => this.setState({ isShowModel: false })}>
                    <ul >
                        {/* {this.renderList()} */}
                    </ul>
                </div>:""}
            </Header>
        )
    }
}

const style = {
    //右侧区域样式 
    headerRight: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
    },
    headerTask: {
        marginLeft: 26,
        display: 'inline-block',
        position:'relative',
        // margin: '0 26px'
    },
    // 用户头像
    userAvatar: {
        width: 35,
        height: 35,
        borderRadius: '50%',
        marginRight: 8
    },
    error: {
        position: 'absolute',
        left: '25%',
        width: '50%',
        zIndex: 30,
    },
    icon:{
        position: 'absolute',
        width: '10px',
        height: '10px',
        background: 'red',
        borderRadius: '50%',
        top:"2px",
        right: '-3px'
    },
  
}

export default HeaderBar