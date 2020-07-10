import React from 'react'
import st from './form.module.scss'
import { devideClass, fixIphoneScrollBug } from '../../utils'
import Select, { Select2 } from '../select/select';
import DatePicker from 'react-mobile-datepicker'
const NoImg = require('../../image/imgup@2x.png');
function doCB(cb, arg) {
    typeof cb === 'function' && cb(arg)
}
class Input extends React.Component {
    state = {}
    render() {
        /**
         *  obj 传入的数据对象
         *  obj 键的解释：
         *      key 对应的key值
         *      placeholder
         *      maxLength
         *      type     default text
         *      //option   操作的字段
         *      header   str     大标题
         *      show     bool    是否可见
         *      min      num     最小值（仅限数字）
         *      max      num     最大值
         *      step     num     步值
         *      data     str/num 表单内的值
         *      keyStyle   obj   修改表单键的样式
         *      valueStyle obj   修改表单值的样式
         *      sub      bool    是否是下一级选择框
         *      indent   obj     下一级选择框额外需要的样式
         *      Stars       是否显示*号
         *      Thousandyuan      需求登记页面设置千元万元
         *      headerlist        需求登记页面多一个header情况下（参考需求登记页面）
         *      mmend   bool     样式是否修改为需求登记的样式
         *      isChild  bool 控制联动子类的样式 
         *      type 判读是文本还是数字类型
         *  =========event ===========
         *  onChange(value, obj.option)
         * */
        let { obj, onChange } = this.props
        return !obj.show && (
            obj.sub ?
                <div
                    style={
                        obj.indentStyle
                    }
                    className={devideClass(st.select, st.indent)}
                >
                    <React.Fragment
                        key={obj.option}
                    >
                        {obj.header && <p className={st.sectionHead} style={{ padding: '0.6rem 0 0.3rem 0' }}>{obj.header}</p>}
                        <label
                            className={devideClass(st.fillist, st.input, 'clearfix', obj.isChild ? st.ts : "", obj.flex ? st.fillistTs : "")}
                        >
                            <span
                                className={st.key}
                                style={obj.keyStyle}
                            >{obj.key || 'key'}</span>
                            <input
                                style={obj.valueStyle, { width: '45%' }}
                                min={obj.min}
                                max={obj.max}
                                value={obj.data}
                                onChange={ev => onChange(ev.target.value)}
                                maxLength={obj.maxLength || 100}
                                placeholder={obj.placeholder || "请输入"}
                                onBlur={ev => fixIphoneScrollBug({ top: obj.scrollT || 1 })}
                                onFocus={ev => fixIphoneScrollBug({ clear: true })}
                                type={obj.type === "tel" ? obj.type : "text"}
                            />
                        </label>
                    </React.Fragment>
                </div> :
                <React.Fragment
                    key={obj.option}
                >
                    {obj.header && obj.mmend ? <p className={st.sectionHeadQuest}>
                        <span className={st.HeaderQuesten}>{obj.header}</span>/10
                    </p> : <p className={st.sectionHead} style={obj.header && { padding: '30px 0 15px 0' }}>
                            {obj.header}
                        </p>}

                    {obj.headerlist && <p className={st.sectionlist}>{obj.headerlist}</p>}
                    <label
                        className={devideClass(st.fillist, st.input, obj.mmend ? st.fillborder : '', 'clearfix', obj.isChild ? st.ts : "", obj.flex ? st.fillistTs : "")}
                    >
                        <span
                            className={st.key}
                            style={obj.keyStyle, obj.mmend && { display: 'none' }}
                        ><label style={{ color: '#ED4A58' }}>{obj.Stars || ''}</label>{obj.key || 'key'}</span>
                        <input
                            style={obj.valueStyle, obj.mmend && { width: '6.3rem', textAlign: 'left', }}
                            min={obj.min}
                            max={obj.max}
                            value={obj.data}
                            onChange={ev => onChange(ev.target.value)}
                            maxLength={obj.maxLength || 100}
                            type={obj.type || 'text'}
                            placeholder={obj.placeholder || "请输入"}
                            onBlur={ev => fixIphoneScrollBug({ top: obj.scrollT || 1 })}
                            onFocus={ev => fixIphoneScrollBug({ clear: true })}
                            type={obj.type === "tel" ? obj.type : "text"}

                        />
                        {obj.Thousandyuan && <span className={st.Thousandyuan}>{obj.Thousandyuan}</span>}
                    </label>
                </React.Fragment>
        )
    }
}
class Sel extends React.Component {
    state = {
        showSel: false,  // 是否展示选项
    }
    changeSelect(bool, cb) {
        this.setState({ showSel: bool })
        typeof cb === 'function' && cb()
    }
    render() {
        let { showSel } = this.state
        let { obj, onChange } = this.props
        /**
         *  obj 传入的数据对象，键值如下：
         *      key      str  对应的key值，展示的选项名称，如 姓名
         *      placeholder str  
         *      //option   操作的字段 废弃
         *      selArr   arr  可选的数组
         *      show     bool 是否可见
         *      data     str/num  当前选中的值
         *      sub      bool 是否是下一级选择框
         *      indent   obj  下一级选择框额外需要的样式
         *      isChild  bool 控制联动子类的样式 
         *      ===== 选择框中的字段 =======
         *      title    str  展示的标题
         *      label    str  展示的值
         *      mmend     控制需求登记的样式（改变style）
         *  ====== event =======
         *  onChange     fun
        */
        return !obj.show && (
            obj.sub ?
                <div
                    style={
                        obj.indentStyle
                    }
                    className={devideClass(st.select, st.indent)}
                >
                    <label
                        key={obj.option}
                        className={devideClass(st.fillist, 'clearfix', obj.isChild ? st.ts : "")}
                        onClick={() => this.setState({
                            showSel: true
                        })}
                    >
                        <span className={st.key} style={{ width: '45%' }}>{obj.key || 'key'}</span>
                        <p className={st.arrow}>
                            {obj.data ?
                                <span className={st.ts}>{
                                    obj.selArr.filter(item => item.id === obj.data)[0] && obj.selArr.filter(item => item.id === obj.data)[0].label
                                }</span> :
                                <span style={{ fontWeight: '400' }}>{obj.placeholder || "请选择"}</span>
                            }
                        </p>
                        <span className={st.img}></span>
                        {
                            // 选择器
                            showSel && !!obj.selArr &&
                            <Select
                                title={obj.title}
                                selectArr={obj.selArr}
                                labels={obj.label || 'label'}
                                cancel={
                                    () => this.setState({
                                        showSel: false,
                                    })
                                }
                                changeSelect={
                                    item => this.changeSelect(false, onChange(item))
                                }
                            />
                        }
                    </label>
                </div> :
                <div>
                    {obj.header && obj.mmend ? <p className={st.sectionHeadQuest}>
                        <span className={st.HeaderQuesten}>{obj.header}</span>/10
                    </p> : <p className={st.sectionHead}>
                            {obj.header}
                        </p>}

                    {obj.headerlist && <p className={st.sectionlist}>{obj.headerlist}</p>}
                    <label
                        key={obj.option}
                        className={devideClass(st.fillist, st.select, obj.mmend ? st.fillborder : '', 'clearfix', obj.isChild ? st.ts : "")}
                        onClick={() => this.setState({
                            showSel: true
                        })}
                    >
                        <span className={st.key} style={obj.mmend && { display: 'none' }}>
                            <label style={{ color: '#ED4A58' }}>{obj.Stars || ''}</label>
                            {obj.key || 'key'}</span>
                        <p className={st.arrow}>
                            {obj.data ?
                                <span
                                    style={obj.mmend && { width: '95%', textAlign: 'left' }}
                                    className={st.ts}>{
                                        obj.selArr.filter(item => item.id === obj.data)[0] && obj.selArr.filter(item => item.id === obj.data)[0].label
                                    }</span> :
                                <span style={{ fontWeight: '400' }, obj.mmend && { width: '6.3rem', textAlign: 'left', }}>
                                    {obj.placeholder || "请选择"}</span>
                            }
                        </p>
                        <span className={st.img} style={obj.mmend && { position: 'absolute', right: '.32rem' }}></span>
                        {
                            // 选择器
                            showSel && !!obj.selArr &&
                            <Select
                                title={obj.title}
                                selectArr={obj.selArr}
                                labels={obj.label || 'label'}
                                cancel={
                                    () => this.setState({
                                        showSel: false,
                                    })
                                }
                                changeSelect={
                                    item => this.changeSelect(false, onChange(item))
                                }
                            />
                        }
                    </label>
                </div>
        )
    }
}
class TextArea extends React.Component {
    state = {}
    render() {
        /**
         *  obj 传入的数据对象
         *  obj 键的解释：
         *      key 对应的key值
         *      placeholder
         *      maxLength
         *      type     default text
         *      //option   操作的字段
         *      header   str     大标题
         *      show     bool    是否可见
         *      min      num     最小值（仅限数字）
         *      max      num     最大值
         *      step     num     步值
         *      data     str/num 表单内的值
         *      keyStyle   obj   修改表单键的样式
         *      valueStyle obj   修改表单值的样式
         *      sub      bool    是否是下一级选择框
         *      indent   obj     下一级选择框额外需要的样式
         *      Stars       是否显示*号
         *      Thousandyuan      需求登记页面设置千元万元
         *      headerlist        需求登记页面多一个header情况下（参考需求登记页面）
         *      mmend   bool     样式是否修改为需求登记的样式
         *  =========event ===========
         *  onChange(value, obj.option)
         * */
        let { obj, onChange } = this.props
        return !obj.show && (
            obj.sub ?
                <div
                    style={
                        obj.indentStyle
                    }
                    className={devideClass(st.select, st.indent)}
                >
                    <React.Fragment
                        key={obj.option}
                    >
                        {obj.header && <p className={st.sectionHead}>{obj.header}</p>}
                        <label
                            className={devideClass(st.fillist, st.input, 'clearfix')}
                            style={{ minHeight: "3rem" }}
                        >
                            <span
                                className={st.key}
                                style={obj.keyStyle, { width: '30%' }}
                            >{obj.key || 'key'}</span>
                            <textarea
                                style={obj.valueStyle, { width: '70%', border: '0.02rem solid #F4F4F4', verticalAlign: "middle" }}
                                min={obj.min}
                                max={obj.max}
                                value={obj.data}
                                cols="5"
                                onChange={ev => onChange(ev.target.value)}
                                maxLength={obj.maxLength || 64} type={obj.type || 'text'} placeholder={obj.placeholder || "请输入"}
                                onBlur={ev => fixIphoneScrollBug({ top: obj.scrollT || 1 })}
                                onFocus={ev => fixIphoneScrollBug({ clear: true })}
                            />
                        </label>
                    </React.Fragment>
                </div> :
                <React.Fragment
                    key={obj.option}
                >
                    {obj.header && <p className={obj.mmend ? st.sectionHeadQuest : st.sectionHead}>
                        {obj.mmend}?<span className={st.HeaderQuesten}>{obj.header}</span>/10:{obj.header}
                    </p>}
                    {obj.headerlist && <p className={st.sectionlist}>{obj.headerlist}</p>}
                    <label
                        className={devideClass(st.fillist, st.input, obj.mmend ? st.fillborder : '', 'clearfix')}
                        style={{ minHeight: "3rem" }}

                    >
                        <span
                            className={st.key}
                            style={obj.keyStyle, obj.mmend && { display: 'none' }, { width: '30%' }}
                        ><label style={{ color: '#ED4A58' }}>{obj.Stars || ''}</label>{obj.key || 'key'}</span>
                        <textarea
                            style={obj.valueStyle, obj.mmend && { width: '6.3rem', textAlign: 'left' }, { width: '70%', border: '0.02rem solid #F4F4F4', verticalAlign: "middle", minHeight: "2rem" }}
                            min={obj.min}
                            max={obj.max}
                            cols="5"
                            value={obj.data}
                            onChange={ev => onChange(ev.target.value)}
                            maxLength={obj.maxLength || 64} type={obj.type || 'text'} placeholder={obj.placeholder || "请输入"}
                            onBlur={ev => fixIphoneScrollBug({ top: obj.scrollT || 1 })}
                            onFocus={ev => fixIphoneScrollBug({ clear: true })}
                        />
                        {obj.Thousandyuan && <span className={st.Thousandyuan}>{obj.Thousandyuan}</span>}
                    </label>
                </React.Fragment>
        )
    }
}
// 图片上传
class RenderImg extends React.Component {
    state = {
    }
    render() {
        /**
        *  imgObj obj state中存储的
        *  target obj 图片组件展示的文字和存储的字段 
        *  imgBaseUrl str 接口返回的 图片根地址
        *  title str 展示的标题
        *  =========event ===========
        *  upImg(value, obj.option) // 图片处理的方法
        * */
        let { target, imgObj, imgBaseUrl, title, upImg } = this.props
        return (<div className={st.upImg}>
            <span className={st.upImgTitle}>
                {title}
            </span>
            <ul>

                {
                    target.map((it, i) =>
                        <li
                            key={i}
                            className={st.imgWrapper}
                        >
                            <label>
                                <input type="file" accept="image/*" onChange={(ev) => upImg(ev, it.option)} />
                                {
                                    imgObj[it.option] ?
                                        <img className={st.upImg} data={it.option} src={imgObj[it.option] || (imgBaseUrl + imgObj[it.option])} alt="" /> :
                                        <div className={st.NoImg}>
                                            <img className={st.upImg} src={NoImg} alt="" data={it.key} />
                                            <span>{it.key}</span>
                                        </div>
                                }
                            </label>
                        </li>
                    )
                }
            </ul>
        </div>)
    }
}
// 城市组件
class RenderCity extends React.Component {
    // 判断字符串还是数组
    isArr(arr) {
        return arr instanceof Array
    }
    render() {
        /**
        *   城市选择组件
        *   obj {}    定义的城市组件数据
        *   obj.isChild  详细地址组件
        *   key       string   展示的说明文字
        *   location  array    用户选择的数据 0=> arr, 其他为单字段
        *   locationLen  number 选择器要选择的数据长度 ，比如 省市 2级就是 2
        *   isShowCitySel 4弹层的显隐
        *  citys  城市组件
        *   mmend   bool     样式是否修改为需求登记的样式  header  控制当前页样式3/10
        *  
        */
        let { user, obj, carposition, isShowCitySel, citys, onChange } = this.props
        let { locationLen, location } = obj
        locationLen = locationLen || 2
        return (
            <React.Fragment key={obj.key}>
                {/* 需求登记时候改变样式 */}
                {obj.mmend && <div>
                    {obj.header && <p className={st.sectionHeadQuest}>
                        <span className={st.HeaderQuesten}>{obj.header}</span>/10
                    </p>}
                    {obj.key && <p className={st.sectionlist}>{obj.key}</p>}
                </div>}
                {obj.mmend ?
                    <label className={devideClass(st.fillist, 'clearfix')}
                        key={obj.key || 'city'}
                        onClick={() => {
                            carposition(1, null, obj)
                        }}
                        style={{ border: '0.02rem solid #F4F4F4' }}
                    >
                        <p className={st.arrow}>
                            {user[location[0]] && user[location[0]].length ?
                                <span className={st.ts} style={{ width: '95%', textAlign: 'left' }}>{
                                    this.isArr(user[location[0]]) ?
                                        user[location[0]] && user[location[0]].length >= 2 &&
                                        user[location[0]].map(it => it.name).join(' - ') :
                                        user[location[0]]
                                }</span> :
                                <span style={{ width: '95%', textAlign: 'left' }}>请选择</span>
                            }
                        </p>
                        <span className={st.img} style={{ position: 'absolute', right: '.32rem' }}></span>
                    </label>
                    :
                    <label className={devideClass(st.fillist, 'clearfix')}
                        key={obj.key || 'city'}
                        onClick={() => {
                            carposition(1, null, obj)
                        }}
                    >
                        <span className={st.key}>{obj.key || ''}</span>
                        <p className={st.arrow}>
                            {user[location[0]] && user[location[0]].length ?
                                <span className={st.ts}>{
                                    this.isArr(user[location[0]]) ?
                                        user[location[0]] && user[location[0]].length >= 2 &&
                                        user[location[0]].map(it => it.name).join(' - ') :
                                        user[location[0]]
                                }</span> :
                                <span style={{ fontWeight: '400' }}>请选择</span>
                            }
                        </p>
                        <span className={st.img}></span>
                    </label>
                }
                {obj.isChild ? <Input obj={obj.children} value={obj.data} onChange={(e) => onChange(e)} ></Input> : ""}
                {
                    isShowCitySel && citys &&
                    <Select2
                        title="请选择城市"
                        selectArr={citys}
                        id='city_code'
                        cancel={() => carposition()}
                        changeSelect={arr => carposition(null, arr)}
                    />
                }
            </React.Fragment>
        )
    }
}
// 日期组件
class DateSel extends React.Component {
    state = {
        dateShow: false
    }
    render() {
        /**
         *  @params obj  object    参数以对象形式传入
         *          key 对应的key值
         *          placeholder
         *          // option   操作的字段
         *          show     是否可见
         *          sub      是否是子集选项
         *          =======  时间插件字段  =============
         *          dateConfig    object  时间插件配置
         *  @params onChange    function   当选择后的函数
        */
        let { obj, onChange } = this.props

        let {
            dateShow
        } = this.state
        console.log(dateShow, "dateShow")
        return (
            <React.Fragment>
                {
                    obj && !obj.show && obj.sub ?
                        <div
                            style={
                                obj.indentStyle
                            }
                            className={devideClass(st.select, st.indent)}
                        >

                            <label
                                className={devideClass(st.fillist, st.dateSel, 'clearfix')}
                                onClick={() => this.setState({
                                    dateShow: true
                                })}
                            >
                                <span className={st.key}>{obj.key || 'key'}</span>
                                <p className={st.arrow}>
                                    {
                                        obj.data ?
                                            <span className={st.ts}>{
                                                obj.data
                                            }</span> :
                                            <span style={{ fontWeight: '400' }}>{obj.placeholder || "请选择"}</span>
                                    }
                                </p>
                                <span className={st.img}></span>
                            </label>
                        </div> :
                        <label
                            className={devideClass(st.fillist, st.dateSel, 'clearfix')}
                            onClick={() => this.setState({
                                dateShow: true
                            })}
                        >
                            <span className={st.key}>{obj.key || 'key'}</span>
                            <p className={st.arrow}>
                                {
                                    obj.data ?
                                        <span className={st.ts}>{
                                            obj.data
                                        }</span> :
                                        <span style={{ fontWeight: '400' }}>{obj.placeholder || "请选择"}</span>
                                }
                            </p>
                            <span className={st.img}></span>
                        </label>
                }
                <DatePicker
                    isOpen={dateShow}
                    dateFormat={{
                        'year': {
                            format: 'YYYY',
                            caption: 'Year',
                            step: 1,
                        },
                        'month': {
                            format: 'MM',
                            caption: 'Mon',
                            step: 1,
                        },
                        'date': {
                            format: 'DD',
                            caption: 'Day',
                            step: 1,
                        },
                    }}
                    onCancel={
                        ev => this.setState({ dateShow: false })
                    }
                    onSelect={
                        (time) => {
                            this.setState({
                                dateShow: false,
                            })
                            doCB(onChange, time)
                        }
                    }
                />
            </React.Fragment>
        )
    }
}
export {
    Input,
    Sel as Select,
    TextArea,
    RenderImg,
    RenderCity,
    DateSel
}