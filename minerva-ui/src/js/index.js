import store from "./redux/store";
import { getStatistics, getFinObjs, setActiveFinObj } from "./redux/actions";

window.store = store;
window.getStatistics = getStatistics;
window.getFinObjs = getFinObjs;
window.setActiveFinObjID = setActiveFinObj;
