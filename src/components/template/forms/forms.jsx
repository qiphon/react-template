import React from 'react';
import Style from './forms.module.scss';
import { Input, Row, Col, Select, DatePicker, Cascader,Button,Radio  } from 'antd';
import moment from 'moment';
import API from '../../../http/API'
const { Option } = Select;
const { RangePicker } = DatePicker;
const NoImg = require('../../../image/imgup@2x.png');

class FormInput extends React.Component{
    state = {}
    render(){
        /*
        placeholder 
        valdata  value值
        valueStyle input框样式
        type     类型
        disabledShow   bol是否可以编辑
        */
        let { obj, onChange } = this.props
        return(
            <div className={Style.BodyCon}>
                {/* 新建 */}
                <Row justify="start">
                    <Col>   
                        <Input 
                            placeholder={obj.placeholder||'请输入'}
                            value={obj.valdata}
                            style={obj.valueStyle}
                            onChange={ev => onChange(ev.target.value)}
                            type={obj.type?obj.type:"text"}
                            disabled={obj.disabledShow||false}
                        /> 
                    </Col>
                </Row>
            </div>
        )
    }
}
const { TextArea } = Input;
class FormTextArea extends React.Component{
    state = {}
    render(){
        /*
        placeholder 
        valdata  value值
        valueStyle input框样式
        type     类型
        disabledShow   bol是否可以编辑
        */
        let { obj, onChange } = this.props
        return(
            <div className={Style.BodyCon}>
                {/* 新建 */}
                <Row justify="start">
                    <Col>   
                        <TextArea 
                            rows={4}
                            placeholder={obj.placeholder||'请输入'}
                            value={obj.valdata}
                            style={obj.valueStyle}
                            onChange={ev => onChange(ev.target.value)}
                            disabled={obj.disabledShow||false}
                            />
                    </Col>
                </Row>
            </div>
        )
    }
}
class FormSelect extends React.Component{
    state = {}
    render(){
        /*
        defaultValue   
        value
        placeholder
        selArr    arr 选择项
        mode      设置是否可以选择多项框
        disabledShow   bol是否可以编辑
         */
        let { obj, onChange } = this.props
        // console.log(obj.placeholder)
        return(
            <Row justify="start" className={obj.mode?Style.BodyConmore:Style.BodyCon}>
                <Col>
                    <Select 
                        style={{minWidth:'180px'}}
                        placeholder={obj.placeholder|| "请选择"}
                        className={Style.contselec}
                        onChange={ value =>onChange(value)}
                        mode={obj.mode?"multiple":""}
                        value={obj.data||(obj.mode&&[])}
                        optionFilterProp="children"
                        disabled={obj.disabledShow||false}
                    >
                        {
                            obj.selArr && obj.selArr.map((item, i) => {
                                return <Option value={item.id||item.name||item.department} key={i}>{item.label||item.name||item.department}</Option>
                            })
                        }
                    </Select>
                </Col>
            </Row>
        )
    }
}
//select层级选择器
class CarSelect extends React.Component{
    state = {}
    render(){
        /*
        obj.selArr,  数据
        this.loadData  定义动态加载
        placeholder  
         */
        let { obj, onChange } = this.props
        return(
            <Cascader
                key={obj.id}
                options={obj.selArr}
                fieldNames={{ label: 'name', value:'id',children:'children'}}
                onChange={onChange}
                placeholder={obj.placeholder}
                changeOnSelect 
                disabled={obj.disabledShow||false}
                defaultValue={obj.defaultValue}
                style={obj.styles}
            />
        )
    }
}
//有起始时间，结束时间的时间选择
class FormDatePicker extends React.Component{
    render(){
        /*
        placeStart：  起始时间placeholder
        placeEnd：    截止时间placeholder
        keyValue：    设置重置的时候绑定key值
        pickertyps  设置为true是只选择一个时间，其余的为起始时间-终止时间
        format，    //定义时间格式
         */
        let { obj, onChange,key} = this.props
        // console.log(obj.pickertyps)
        return(
            <div className={Style.BodyConpicker}>
                <span className={Style.pickerText} style={obj.valueStyle}>{obj.title||''}</span>
                {
                    obj.pickertyps?<DatePicker showTime  
                    disabled={obj.disabledShow||false}
                    style={{marginRight:'20px'}}
                    onChange={(ev,dateStrings) => onChange(ev,dateStrings)}
                    placeholder={obj.placeholder}
                    format={obj.format||"YYYY-MM-DD HH:mm:ss"}
                    defaultValue={obj.defaultval}
                    />:
                    <RangePicker 
                    className={Style.pickerSel} 
                    onChange={(ev,dateStrings) => onChange(ev,dateStrings)}
                    placeholder={[obj.placeStart,obj.placeEnd]}
                    key={obj.keyValue?obj.keyValue:''}
                    />
                }
            </div>
        )
    }
}
class CasCity extends React.Component{
    /*
        城市地址选择器
        disabledShow   bol是否可以编辑
    */
   state={
    firstAddress:[],
    secondAddress:[],
   }
   componentDidMount(){
       this.AddressList()
   }
   AddressList(index,gred){
        API.getAreaList(index?index:1,gred||'').then(({data})=>{
            let {data:firstAddress,code} = data;
            if(+code===200){
                for(let m in firstAddress){
                    firstAddress[m].isLeaf=index>2?true:false
                }
                if(index>1){
                    this.setState({
                        secondAddress:firstAddress
                    })
                }else{
                    this.setState({
                        firstAddress
                    })
                }
            }
        })
    }
    onChange = (value, selectedOptions) => {
        // console.log(value, selectedOptions);
        let newArray=[]
        newArray= selectedOptions.map(item=>item.name).join(" - ")
        this.props.modeCity(newArray)
    };
    loadData = selectedOptions => {
        if(selectedOptions.length>2) return;
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;
        // load options lazily
            this.AddressList(selectedOptions.length+1,selectedOptions[selectedOptions.length-1].code)
            setTimeout(() => {  
                targetOption.loading = false;
                targetOption.children = this.state.secondAddress
                this.setState({
                    firstAddress: [...this.state.firstAddress],
                });
            }, 1000);
      };
   render(){
        let { obj} = this.props;
        let {firstAddress} =this.state;
        let addresHolder=obj.placeholder.replace(/-/g,"/")
        return(
            <div className={Style.BodyConpicker}>
                <Cascader
                    options={firstAddress}
                    fieldNames={{ label: 'name', value: 'code'}}
                    loadData={this.loadData}
                    onChange={this.onChange}
                    placeholder={addresHolder}
                    changeOnSelect 
                    disabled={obj.disabledShow||false}
                />
            </div>
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
        let { target, imgObj,imgBaseUrl,title,upImg } = this.props
        return (<div className={Style.upImg}>
            <span className={Style.upImgTitle}>
                {title}
            </span>
            <ul>
                {
                    target.map((it, i) =>
                        <li
                            key={i}
                            style={{width:'104px',height:'104px',marginLeft:'-35px'}}
                            className={Style.imgWrapper}
                        >
                            <label>
                                <input type="file" accept="image/*" onChange={(ev)=>upImg(ev,it.option)} disabled={it.disabledShow||false}/>
                                {
                                    imgObj.map((item,index)=>{
                                        return item.vals==it.option?
                                        item.val?<img className={Style.upImg} data={it.option} src={item.val || (imgBaseUrl + item.val)} alt="" />:
                                        <div className={Style.NoImg}>
                                            <img className={Style.upImg} src={NoImg} alt="" data={it.key} style={{background:'#fff'}}/>
                                        </div>
                                        :
                                        ''
                                    })
                                }
                            </label>
                        </li>
                    )
                }
            </ul>
        </div>)
    }
}
//多选标签
class ChoiceLabel extends React.Component{
    /*
    headertop, TRUE   顶部显示标题，否则左右显示
    title  标题
    selArr  循环的多选标签
    */
    state={}
    render(){
        let { obj, onChagnelab,onChagnelabTwo} = this.props
        // console.log(obj.type===1)
        return(
            <div className={Style.BodyContentNeed}>
                {/* <div className={Style.Urgency}> */}
                    {
                        obj.selArr&&obj.selArr.map((item,index)=>{
                            return <div key={index}>
                                <div className={obj.headertop?Style.Urgency:Style.UrgencyLeft} >
                                    {obj.headertop?
                                        <span className={Style.UrgencyTextOne}>{item.name||''}</span>
                                        :
                                        <span className={Style.UrgencyText}>{item.name||''}</span>
                                    }
                                    { 
                                        item.labels.map((i,dec)=>{
                                            return <Button 
                                            key={dec} 
                                            type={(obj.users.label&&obj.users.label[item.id].indexOf(i.id)>=0||
                                                obj.users.newListA&&obj.users.newListA.indexOf(i.id)>=0)?"primary":""}
                                            onClick={()=>onChagnelab(i,item)}
                                            key={dec}>{i.name}</Button>
                                        })
                                    }
                                </div>
                                {
                                    item.labels&&item.labels.map((im,d)=>{
                                        return <div className={obj.headertop?Style.UrgencyALTbtn:Style.UrgencyTwo} key={d}>
                                            {
                                                (obj.users.label[item.id].indexOf(im.id)>=0||
                                                obj.users.newListA&&obj.users.newListA.indexOf(im.id)>=0)&&
                                                im.child&&im.child.map((s,n)=>{
                                                    return <Button type="" 
                                                            type={obj.users.label&&obj.users.label[item.id].indexOf(s.id)>=0?"primary":""}
                                                            onClick={()=>onChagnelabTwo(s,item)} key={n}>{s.name}</Button>
                                                    })
                                            }
                                        </div>
                                    })
                                }
                            </div>
                        })
                    }

                {/* </div> */}
            </div>
        )
    }
}
//单选标签
class RadioLabel extends React.Component{
    /*
    headertop, TRUE   顶部显示标题，否则左右显示
    title  标题
    selArr  循环的多选标签
    valStyle   设置css样式
    */
    state={}
    render(){
        let { obj, onChange } = this.props
        return(
            <div className={Style.BodyContentNeed}>
                <div className={Style.Urgency} style={obj.valStyle}>
                    {obj.headertop?
                        <span className={Style.UrgencyTextOne}>{obj.title||''}</span>
                        :
                        <span className={Style.UrgencyText}>{obj.title||''}</span>
                    }
                     <Radio.Group buttonStyle="solid" onChange={(val)=>onChange(val)} defaultValue={obj.defaultval&&obj.defaultval}>
                        {
                            obj.selArr && obj.selArr.map((item, i) => {
                                return <Radio.Button className={Style.radioButton}
                                
                                    value={item.val} key={i}>{item.name}</Radio.Button>
                            })
                        }
                    </Radio.Group>
                </div>
            </div>
        )
    }
}
export {
    FormInput,
    FormTextArea,
    FormSelect,
    FormDatePicker,
    CasCity,
    RenderImg,
    ChoiceLabel,
    RadioLabel,
    CarSelect
}