import DOMPurify from "dompurify";
import moment from "moment";

export const formatDateFrom_ISO_to_YYYY_MM_DD = (data: Date) => {
  if (data) {
    const _date = moment(data).hours(0).minutes(0).seconds(0).toDate();
    return moment(_date).format("YYYY-MM-DD").toString();
  } else {
    console.error(`Not able convert ${typeof data} into YYYY-MM-DD`);
    return data;
  }
};

export const isSystemRouteMatchWithCurrentRoute = (systemRoute: string, currentRoute: string, variable: string) => {
  const path1 = systemRoute.split("/");
  const variableIndex = variable && path1.indexOf(variable);
  const path2 = currentRoute.split("/");

  if (path1.length && path1.length === path2.length) {
    if (systemRoute.length > 4) {
      const temp1 = path1.filter((_data, index) => index !== variableIndex);
      const temp2 = path2.filter((_data, index) => index !== variableIndex);
      return JSON.stringify(temp1) === JSON.stringify(temp2);
    } else {
      return path1[1] === path2[1];
    }
  } else {
    return false;
  }
};

export const removeTags = (str: string) => {
  if (str === null || str === "") {
    return false;
  } else {
    str = str.toString();
  }

  // Regular expression to identify HTML tags in
  // the input string. Replacing the identified
  // HTML tag with a null string.
  return str.replace(/(<([^>]+)>)/gi, "");
};

export const getPurifyDom = (htmlString: string) => {
  return DOMPurify.sanitize(htmlString, { ADD_ATTR: ["target"] });
};
