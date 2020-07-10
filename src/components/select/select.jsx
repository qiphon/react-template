import React from 'react'
import st from './select.module.scss'
import { devideClass } from '../../utils'

/**
 *    选择框
 *    @params title,      String    选择框标题
 *    @params labels      string    要展示的key
 *    @params values      string    值对应的属性名
 *    @params selectArr,  array  （require） 选择框选项
 *    @params cancel,     function （require）取消事件
 *    @params changeSelect  function （—require—） 选择后的事件
 */
class Select extends React.Component {
    state = {

    }
    render() {
        const {
            title, selectArr, cancel, changeSelect, labels, values
        } = this.props
        const labs = labels || 'name'
        const vals = values || 'id'
        // console.log(keys,title, selectArr, 111, cancel)
        return (
            <div
                className={
                    devideClass(st.model)
                }
                onClick={() => cancel()}
            >
                <div className={st.model_content}
                    onClick={ ev=> ev.stopPropagation() }
                >
                    <h2>{title || '请选择'}</h2>
                    <div className={st.model_main}>
                        {
                            selectArr && selectArr.map(
                                (item) => (<p key={(vals && item[vals]) || item[labs]}
                                    onClick={() => changeSelect(item)}
                                >{ item[labs] }</p>)
                            )
                        }
                    </div>
                    <p onClick={() => cancel()} className={st.CancelFalse}>取消</p>
                </div>
            </div>
        )
    }
}

/**
 *    选择框
 *    @params title,      String    选择框标题
 *    @params selectArr,  array  （require） 选择框选项
 *    @params cancel,     function （require）取消事件
 *    @params changeSelect  function （—require—） 选择后的事件
 */
class Select2 extends React.Component {
    state = {
        checked: [], // 选中的项目
    }
    changeSelects(item) {
        let { checked } = this.state
        checked.push(item)
        this.setState({
            checked
        })
        // 通知父组件
        this.props.changeSelect(checked,null)
    }
    changeChecked(key) {
        let {
            checked
        } = this.state
        checked = checked.slice(0, key)
        // console.log(checked, 'checked')
        this.setState({
            checked
        })
    }
    render() {
        let {
            title, selectArr, cancel, id = 'id', defaultChecked = [1, 2], name = 'name'
        } = this.props
        let {
            checked
        } = this.state
        console.log(selectArr, '==============')
        return (
            <div
                className={
                    devideClass(st.model)
                }
                onClick={() => this.setState({ isShowMarrage: false })}
            >
                <div className={st.select2}>
                    <h3>
                        {title || '请选择'}
                    </h3>
                    <img className={st.close}
                        src={require('../../image/close-icon@2x.png')} alt=""
                        onClick={ev => cancel(ev)}
                    />
                    <div
                        className={st.checkedValueWraper}
                    >
                        {
                            checked && checked[0] && checked.map((item, key) => (
                                <span className={st.checkedValue} key={item.id || item[name] || key}
                                    onClick={ev => this.changeChecked(key)}
                                >{item[name]}</span>
                            ))
                        }
                        <span className={devideClass(st.checkedValue, st.active)}>请选择</span>
                    </div>
                    <div
                        className={st.mainCon}
                    >
                        {
                            selectArr && selectArr[checked.length] &&
                            selectArr[checked.length].map(
                                (item, key) => (
                                    <div
                                        className={st.valueItem}
                                        key={item[id] || item[name] || key}
                                        onClick={() => this.changeSelects(item)}
                                    >{item[name]} </div>
                                ))
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export { Select2 }
export default Select