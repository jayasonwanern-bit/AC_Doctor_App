import Toast from 'react-native-simple-toast';

export const handleApiError = (error) => {
    console.log("API Error:", error);

    // Server not reachable / no internet
    if (!error?.response) {
        Toast.show({
            type: "error",
            text1: "Network Error",
            text2: "Please check your internet or try again later",
        });
        return;
    }

    const status = error.response.status;

    switch (status) {
        case 400:
            Toast.show({
                type: "error",
                text1: "Bad Request",
                text2: "Invalid request sent",
            });
            break;

        case 401:
            Toast.show({
                type: "error",
                text1: "Unauthorized",
                text2: "Please login again",
            });
            break;

        case 404:
            Toast.show({
                type: "error",
                text1: "Not Found",
                text2: "Requested data not found",
            });
            break;

        case 500:
        case 502:
        case 503:
            Toast.show({
                type: "error",
                text1: "Server Error",
                text2: "Something went wrong on our side",
            });
            break;

        default:
            Toast.show({
                type: "error",
                text1: "Error",
                text2: "Something went wrong",
            });
    }
};
