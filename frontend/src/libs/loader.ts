import { LoaderFunction } from "react-router-dom";
import { apiRequest } from "./apiRequest";


export const historyEmployeeLoader: LoaderFunction = async ({ request, params }) => {
    const { id } = params;

    if (!id) {
        throw new Error("ID do funcionário não fornecido");
    }

    const res = await apiRequest(`/employee/${id}/history`);
    const res2 = await apiRequest(`/employee/${id}`);
    return { data: res.data, currentData: res2.data };
};
