import { action, observable, computed } from 'mobx'
import { Storage } from '../utils/index'
import { allRoutes } from '../constant'

class Store {
    @observable qiphon = "767521025@qq.com"
    @observable qq = "767521025"
    @observable users = Storage.getItem("loginUser") && JSON.parse(Storage.getItem("loginUser"))
    @observable crumbs = []

    @computed get userMenus() {
        return allRoutes.menus
    }

    @action updateUser(val) {
        Storage.setItem("loginUser", JSON.stringify(val))
    }
    @computed get isLogin() {
        return this.users ? true : false;
    }
}

export default new Store()