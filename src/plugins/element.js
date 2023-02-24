import Vue from 'vue'
import { Button,Input,Form,FormItem,Message,MenuItemGroup,Menu,Submenu, MenuItem,Breadcrumb,BreadcrumbItem,DropdownMenu,DropdownItem,Tag,Table,TableColumn,Pagination,Upload } from 'element-ui'
// 手动添加$message方法到Vue的原型上 方便this.$message调用
Vue.prototype.$message = Message

Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Tag)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Upload)

