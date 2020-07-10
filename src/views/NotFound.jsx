/**
 * Created by hao.cheng on 2017/5/7.
 */
import React from 'react';
import img from '../image/404.png';


class NotFound extends React.Component {
    state = {
        animated: ''
    };
    enter = () => {
        this.setState({animated: 'hinge'})
    };
    render() {
        return (
            <div className="center" style={{
                position:'absolute',
                top:0,
                left:0,
                zIndex: -1,
                display: 'flex',
                alignItems:'center',
                justifyContent:'center',
                width: '100vw',
                height: '100vh', background: '#ececec', overflow: 'hidden'
            }}>
                <img style={{height : '30vh'}}
                    src={img} alt="404" className={`animated swing ${this.state.animated}`} onMouseEnter={this.enter} />
            </div>
        )
    }
}

export default NotFound;