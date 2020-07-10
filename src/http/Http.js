import axios from 'axios'
// import Store from '../store/index'

const baseURL = process.env.URI_START ? "/" : process.env.URI_HOST ;

/**
 * @fileoverview 后台请求接口
 */
function backendAPI() {
    return {
        baseURL, 
        login: '/login',         //登录接口
    }
}
// http request 拦截器
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.interceptors.request.use((config) => {
    // if (Store.isLogin) {
    //     config.headers["token"] = `${Store.users.backend_access_token}`
    // }
    return config
}, error => {
    return Promise.reject(error)
})

// http response 拦截器
axios.interceptors.response.use(response => {
    var r = response.data
    // console.log(' deal response ')
    // if( +r.code === 401 ){
    //     sessionStorage.clear()
    //     localStorage.clear()
    //     Store.users = ''
    //     window.location.href = '/login'
    //     return;
    // }
    return response
}, error => {
    // console.log('catch err do anything')
    // if (error.response && error.response.data){
    //     let msgStr = error.response.data.message;
        
    //     if (msgStr) {
    //         message.info(msgStr);
    //     }else{
    //         message.info('网络异常！')
    //     }
    // }
    return Promise.reject(error)
})

const defaultOptions = {
    baseURL: baseURL,
    method: 'get',
    // timeout: 5000,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        // 'token':`${Store.users.backend_access_token}`
    },
    // withCredentials:true,
}

export const req = {
    base: (options) => {
        return new Promise((resolve, reject) => {
            axios({...defaultOptions, ...options}).then(res => {
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
    get: function (url, params) {
        let options = {
            url:url,
            method: 'get',
            params:params
        };
        return this.base(options);
    },
    post: function (url, params) {
        let options = {
            url:url,
            method: 'post',
            data:params
        };
        return this.base(options);
    },
    put: function (url, params) {
        let options = {
            url:url,
            method: 'put',
            data:params
        };
        return this.base(options);
    },
    delete: function (url, params) {
        let options = {
            url:url,
            method: 'delete',
            data:params
        };
        return this.base(options);
    },
    /**
     * @fileoverview  主要用于满足统计和诊断代码
     * @param {string} url 请求的接口,及携带的参数
     */ 
    send(url){
        return new Promise(resolve=>{
            if('sendBeacon' in window.navigator){
                resolve(window.navigator.sendBeacon(url))
            }else {
                var img = new Image()
                img.src= url
                img.onload = () => resolve(true)
            }
        })
    },
}

export default backendAPI();
