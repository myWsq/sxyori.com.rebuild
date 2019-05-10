import Dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";

export const DayJsPlugin = {
    install(Vue) {
        Dayjs.extend(localizedFormat);
        Dayjs.extend(relativeTime);
        Dayjs.locale("zh-cn");
        Vue.prototype.$day = Dayjs;
    }
};
