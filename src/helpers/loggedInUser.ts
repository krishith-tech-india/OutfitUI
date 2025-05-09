import Cookies from "universal-cookie";
import ILocalStorageColumns from "@src/interface/loggedInUser/ILocalStorageColumns";
import ILocalStorageToken from "@src/interface/loggedInUser/ILocalStorageUser";

const cookies = new Cookies();

export const loggedInUser = {
  getUserToken,
  setUserToken,
  removeUser,
  setUserCookie,

  setColumnsForGrid,
  getColumnsForGrid,
  removeColumnsForGrid,
};

function getUserToken(): string {
  if (localStorage.getItem("userToken") !== null && localStorage.getItem("userToken") !== "") {
    const userFromLocalStorage: string = localStorage.getItem("userToken");
    if (userFromLocalStorage !== null) {
      const token: ILocalStorageToken = JSON.parse(userFromLocalStorage) as ILocalStorageToken;
      return token.data;
    }
  }

  return null;
}

function setUserToken(user: ILocalStorageToken): void {
  const userData: string = JSON.stringify(user);
  localStorage.setItem("userToken", userData);
}

function setUserCookie(userToken: ILocalStorageToken): void {
  if (userToken !== null && userToken.data) {
    cookies.set("_swSessionUser_Id", userToken.data, {
      path: "/",
      sameSite: "lax",
      secure: true,
      domain: ".syncware.com",
    });
  }
}

function removeUser(): void {
  localStorage.removeItem("userToken");
  cookies.remove("_swSessionUser_Id", {
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
