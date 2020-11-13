import store from "./redux/store";
import { getStatistics, getFinObjs, setActiveFinObjID } from "./redux/actions";

window.store = store;
window.getStatistics = getStatistics;
window.getFinObjs = getFinObjs;
window.setActiveFinObjID = setActiveFinObjID;
