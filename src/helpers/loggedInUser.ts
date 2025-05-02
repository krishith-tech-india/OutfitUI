import Cookies from "universal-cookie";
import IVendor from "@src/interface/common/IVendor";
import ILocalStorageColumns from "@src/interface/loggedInUser/ILocalStorageColumns";
import ILocalStorageToken from "@src/interface/loggedInUser/ILocalStorageToken";

const cookies = new Cookies();

export const loggedInUser = {
  getUser,
  setUser,
  removeUser,
  setUserCookie,

  setColumnsForGrid,
  getColumnsForGrid,
  removeColumnsForGrid,
};

function getUser(): ILocalStorageToken {
  if (localStorage.getItem("user") !== null && localStorage.getItem("user") !== "") {
    const userFromLocalStorage: string = localStorage.getItem("user");
    if (userFromLocalStorage !== null) {
      const user: ILocalStorageToken = JSON.parse(userFromLocalStorage) as ILocalStorageToken;
      return user.data;
    }
  }

  return null;
}

function setUser(user: ILocalStorageToken): void {
  const userData: string = JSON.stringify(user);
  localStorage.setItem("user", userData);
}

function setUserCookie(user: ILocalStorageToken): void {
  if (user !== null && user.token) {
    cookies.set("_swSessionUser_Id", user.token, {
      path: "/",
      sameSite: "lax",
      secure: true,
      domain: ".syncware.com",
    });

    if (user.vendor) {
      cookies.set("_swSessionUser_XVendor", user.vendor.code, {
        path: "/",
        sameSite: "lax",
        secure: true,
        domain: ".syncware.com",
      });
    } else {
      cookies.set("_swSessionUser_XVendor", user.name, {
        path: "/",
        sameSite: "lax",
        secure: true,
        domain: ".syncware.com",
      });
    }
  }
}

function removeUser(): void {
  localStorage.removeItem("user");
  cookies.remove("_swSessionUser_Id", {
    path: "/",
    sameSite: "lax",
    secure: true,
    domain: ".syncware.com",
  });
  cookies.remove("_swSessionUser_XVendor", {
    path: "/",
    sameSite: "lax",
    secure: true,
    domain: ".syncware.com",
  });
}

function setColumnsForGrid(columns: ILocalStorageColumns): void {
  const savedGridColumns = getColumnsForGrid();

  if (savedGridColumns) {
    const newColumns: ILocalStorageColumns = {
      ...savedGridColumns,
      ...columns,
    };

    localStorage.setItem("columns", JSON.stringify(newColumns));
  } else {
    localStorage.setItem("columns", JSON.stringify(columns));
  }
}

function getColumnsForGrid(): ILocalStorageColumns {
  if (localStorage.getItem("columns") !== null && localStorage.getItem("columns") !== "") {
    const columns: string = localStorage.getItem("columns");
    if (columns !== null) {
      const parsedColumns: ILocalStorageColumns = JSON.parse(columns) as ILocalStorageColumns;
      return parsedColumns;
    }
  }
  return null;
}

function removeColumnsForGrid(): void {
  localStorage.removeItem("columns");
}
