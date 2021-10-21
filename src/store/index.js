import { createStore } from 'vuex'
import getters from './getters'
//简单的方式
const modulesFiles = import.meta.globEager('./modules/*.js')
let modules = {}
for (const path in modulesFiles) {
    const moduleName = path.replace(/(.*\/)*([^.]+).*/gi, '$2')
    modules[moduleName] = modulesFiles[path].default
}

export default createStore({
    modules,
    getters
})
