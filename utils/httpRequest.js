import { loadingState } from "@/redux/reducers/commonReducer";
import { dispatch } from "@/redux/store";

export default async (url, method, data, isMultipart) => {
  try {
    dispatch(loadingState(true));

    let reqOptions = { method };

    if (isMultipart) {
      reqOptions.body = data;
    } else {
      reqOptions.headers = { "Content-Type": "application/json" };
      reqOptions.body = JSON.stringify(data);
    }
    const result = await fetch(
      (process.env.CLIENT_URL ?? "") + url,
      reqOptions
    );
    const response = await result.json();
    dispatch(loadingState(false));
    return response;
  } catch (error) {
    dispatch(loadingState(false));
    return { success: false, message: "Internal Server Error" };
  }
};
