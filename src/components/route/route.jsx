import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { allRoutes } from '../../constant'

@withRouter @inject('Store') @observer
class Rts extends Component {
    componentWillMount() {
        // console.log(this.props.Store.users.type)
    }
    renderRoutes() {
        let menu = allRoutes.menus
        let others = allRoutes.others

        others = others.length ? others.map(item => {
            return <Route key={item.key} exact path={item.key} component={item.component} />
        }) : []
        menu = menu.length ? menu.map(item => {
            if (item.subs) return this.renderSubs(item.subs)
            return <Route key={item.key} exact path={item.key} component={item.component} />
        }) : []
        return [...others, ...menu]
    }
    renderSubs(item) {
        if (!item.length) return ''
        return item.map(it => {
            if (it.subs) return this.renderSubs(it.subs)
            return <Route key={it.key} exact path={it.key} component={it.component} />
        })
    }
    render() {
        return (
            <Switch>
                {
                    this.renderRoutes()
                }
                <Route render={() => <Redirect to="/404" />} />
            </Switch>
        );
    }
}

export default Rts;