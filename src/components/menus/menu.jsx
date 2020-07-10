import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu, Icon } from 'antd'
import { allRoutes, rootSubmenuKeys } from '../../constant'
import API from '../../http/API';


//此组件的意义就是将数据抽离出来，通过传递数据去渲染
@withRouter
class CustomMenu extends React.Component {
  state = {
    openKeys: [],
    selectedKeys: [],
    user:[],    
    numreaige:'',   //存储有多少个待处理
  }
  componentDidMount(){
      this.loanList();        //获取进件列表
  }
  loanList(){
      this.setState({Loadings:true})
      let {numreaige,user} = this.state;
      // console.log(user)
      user.is_todo='1'
      API.loanList(user).then(({data})=>{
          let {code,message,data:dataLoan} = data
          // console.log(data)
          if(code===200){
              // console.log(dataLoan)
              this.setState({
                numreaige:dataLoan.totalCount
              })
          }
      })
  }
  componentWillMount() {
    // 防止页面刷新侧边栏又初始化了
    const pathname = this.props.location.pathname
    if(pathname){
      this.setState({
        selectedKeys: [pathname]
      })
      this.changeOpenKeys([pathname], true)
    }
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.location.pathname==='/app/processed')  this.loanList(); 
    //当点击面包屑导航时，侧边栏要同步响应
    const pathname = nextProps.location.pathname
    if (this.props.location.pathname !== pathname) {
      this.setState({
        selectedKeys: [pathname],
      })
    }
  }
  changeOpenKeys = (openKeys, willMount) => {
    /**
     *   菜单栏变更
     *   @params openKeys    array   当前展开的项目
     *   @params willMount   bool    是否是willMount
     * 
     */
    let { openKeys: openKeyArr } = this.state;

    // console.log(openKeys, 'openkeys', openKeyArr);
    if( !willMount ){
      // 没有展开项就直接设置
      if(!openKeyArr.length || openKeys.length <= 1) return this.setState({
        openKeys
      })
      // 如果包含展开项，说明是关闭
      if(openKeyArr.includes(openKeys.slice(-1)[0])) return this.setState({
        openKeys: []
      })
      // openKeyArr = openKeys
    }
      let mapRes = openKeys.slice(-1)[0];
      // console.log(mapRes, 'mapres');
      rootSubmenuKeys.forEach(item=>{
        let index = item.indexOf( mapRes )
        if( index > -1 ) {
          return openKeyArr = item.slice(0, index+ 1)
        }
      })
    // console.log(111, openKeyArr)
    this.setState({
      openKeys: openKeyArr
    })
  };

  renderMenuItem = ({ key, icon, title,num, className,numberSelect }) => {
    const styleli={
      background:'rgb(255,59,49)',
      borderRadius:'3px',
      textAign:'center',
      marginLeft:'2px',
      fontSize:'13px',
      padding:'1px 5px',
      color:'#fff'
    }
    let {numreaige} =this.state;
    return (
      <Menu.Item 
        key={key}
        className={className}
      >
        <Link to={{ pathname:key,list_id:numberSelect}} >
          {icon && <Icon type={icon} />}
          <span>{title}</span>
          {(num&&numreaige)?<span style={styleli}>{numreaige}</span>:<span/>}
        </Link>
      </Menu.Item>
    )
  }
  renderSubMenu = ({ key, icon, title, subs, className }={}) => {
    // console.log(className, 'class')
    return (
      <Menu.SubMenu
        className={className}
        key={key}
        title={
          <span>{icon && <Icon type={icon} />}<span>{title}</span></span>
        }
      >
        {
          subs.map((item) => {
            return item.subs && item.subs.length > 0 ?
              this.renderSubMenu(item) :
              this.renderMenuItem(item)
          })
        }
      </Menu.SubMenu>
    )
  }

  render() {
    const { openKeys, selectedKeys } = this.state
    return (
      <Menu
        onOpenChange={ this.changeOpenKeys }
        onClick={({ key }) => this.setState({ selectedKeys: [key] })}
        openKeys={ openKeys }
        selectedKeys={selectedKeys}
        theme={this.props.theme ? this.props.theme : 'light'}
        mode='inline'
      >
        {
          this.props.menus && this.props.menus.map((item, i) => {
            return item.subs && item.subs.length > 0 ? this.renderSubMenu(item, i) : this.renderMenuItem(item, i)
          })
        }
      </Menu>
    )
  }
}

export default CustomMenu