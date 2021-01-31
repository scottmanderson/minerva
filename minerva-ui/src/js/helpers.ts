import { IDataSourceLookup, IFinObjLookup } from "./globalTypes";
import { IDataSource, IFinObj } from "./redux/storeTypes";

export const apiRoot =
  process.env.REACT_APP_API_ROOT || "http://127.0.0.1:5000";

export const percentFormat = (decimalNumber: number, digits = 2) => {
  return decimalNumber
    ? (decimalNumber * 100).toFixed(digits).toString() + "%"
    : "N/A";
};

export function makeFinObjLookup(finObjs: IFinObj[]): IFinObjLookup {
  return Object.fromEntries(finObjs.map((fo) => [fo.foid, fo.name]));
}

export function makeDataSourceLookup(
  dataSources: IDataSource[]
): IDataSourceLookup {
  return Object.fromEntries(dataSources.map((ds) => [ds.source_id, ds.name]));
}
