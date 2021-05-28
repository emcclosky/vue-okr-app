import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import focusControl from "./plugins/focus-control";
import directives from "./plugins/directives";
import "@/assets/styles/global.scss";

const app = createApp(App);
app.use(store).use(router);
app.mixin(focusControl);
app.directive("click-outside", directives);

// global icons
import EditIcon from "./components/ui-elements/EditIcon";
import AddIcon from "./components/ui-elements/AddIcon";
import DeleteIcon from "./components/ui-elements/DeleteIcon";
import ChevronLeftIcon from "./components/ui-elements/ChevronLeftIcon";
import ChevronRightIcon from "./components/ui-elements/ChevronRightIcon";
import OptionsIcon from "./components/ui-elements/OptionsIcon";
import SettingIcon from "./components/ui-elements/SettingIcon";
import LogoutIcon from "./components/ui-elements/LogoutIcon";
import CloseIcon from "./components/ui-elements/CloseIcon";
import DashboardIcon from "./components/ui-elements/DashboardIcon";
import DropdownArrow from "./components/ui-elements/DropdownArrow";
import MenuIcon from "./components/ui-elements/MenuIcon";
import NotificationIcon from "./components/ui-elements/NotificationIcon";
import PerformanceIcon from "./components/ui-elements/PerformanceIcon";
import TaskIcon from "./components/ui-elements/TaskIcon";
import SearchIcon from "./components/ui-elements/SearchIcon";
import ProfileIcon from "./components/ui-elements/ProfileIcon";
import ChevronDownIcon from "./components/ui-elements/ChevronDownIcon";

app.component("EditIcon", EditIcon);
app.component("AddIcon", AddIcon);
app.component("DeleteIcon", DeleteIcon);
app.component("ChevronLeftIcon", ChevronLeftIcon);
app.component("ChevronRightIcon", ChevronRightIcon);
app.component("OptionsIcon", OptionsIcon);
app.component("SettingIcon", SettingIcon);
app.component("LogoutIcon", LogoutIcon);
app.component("CloseIcon", CloseIcon);
app.component("DashboardIcon", DashboardIcon);
app.component("DropdownArrow", DropdownArrow);
app.component("MenuIcon", MenuIcon);
app.component("NotificationIcon", NotificationIcon);
app.component("PerformanceIcon", PerformanceIcon);
app.component("TaskIcon", TaskIcon);
app.component("SearchIcon", SearchIcon);
app.component("ProfileIcon", ProfileIcon);
app.component("ChevronDownIcon", ChevronDownIcon);

app.mount("#app");
