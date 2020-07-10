import React from 'react';
import ReactDOM from 'react-dom';
// import * as serviceWorker from './serviceWorker';
import { Provider } from 'mobx-react'
import { ConfigProvider } from 'antd'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import Store from './store/index'
import './index.css'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import App from './App';
import NotFound from './views/NotFound'


ReactDOM.render(
    <Provider Store={Store} >
        <BrowserRouter>
            <ConfigProvider locale={zh_CN}>
                <Switch>
                    <Route exact path='/' render={() => <Redirect to="/app/index" push />} />
                    <Route path="/app" component={App} />
                    <Route path="/404" component={NotFound} />
                    <Route component={NotFound} />
                </Switch>
            </ConfigProvider>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
