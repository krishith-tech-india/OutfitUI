import { saveAs } from "@progress/kendo-file-saver";
import { AxiosError } from "axios";
import { loggedInUser } from "./loggedInUser";

export const handle = {
  handleResponse,
  handleError,
};

async function handleResponse(response: Response): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    const contentType = response.headers.get("content-type");
    if (response.ok) {
      if (contentType && contentType.includes("application/json")) {
        response
          .json()
          .then((json) => resolve(json))
          .catch((error) => console.error({ error }));
      } else if (contentType && (contentType.includes("application/csv") || contentType.includes("application/pdf"))) {
        response
          .blob()
          .then(function (fileBlob) {
            const filename = response.headers
              .get("content-disposition")
              .split(";")
              .find((n) => n.includes("filename="))
              .replace("filename=", "")
              .trim();
            const objectURL = URL.createObjectURL(fileBlob);
            saveAs(objectURL, filename);
          })
          .catch((error) => console.error({ error }));
        resolve(null);
      } else {
        resolve(null);
      }
    } else {
      if (response.status === 401) {
        loggedInUser.removeUser();
        window.location.href = "/login";
      } else if (contentType && contentType.includes("application/json")) {
        response
          .json()
          .then((json) => resolve(json))
          .catch((error) => console.error({ error }));
      } else {
        response
          .text()
          .then((text) => reject(text))
          .catch((error) => console.error({ error }));
      }
    }
  });
}

function handleError(error: AxiosError): Promise<any> {
  if (error.message?.includes("Failed to fetch")) {
    window.location.href = "/page-500";
  }
  return Promise.reject(error.message);
}
