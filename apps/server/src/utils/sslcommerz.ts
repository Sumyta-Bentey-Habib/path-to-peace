import dotenv from "dotenv";

// Load environment variables immediately
dotenv.config();

export interface SSLCommerzInitParams {
    amount: number;
    tranId: string;
    productName: string;
    customerName?: string;
    customerEmail?: string;
    customerPhone?: string;
}

const STORE_ID = process.env.SSL_STORE_ID;
const STORE_PASSWORD = process.env.SSL_STORE_PASSWORD;
const SESSION_API = process.env.SSL_SESSION_API;
const VALIDATION_API = process.env.SSL_VALIDATION_API;
const API_URL = process.env.BETTER_AUTH_URL;

/**
 * Validates the presence of required SSLCommerz environment variables.
 * Throws an descriptive error if any configuration is missing.
 */
export const validateConfig = (): void => {
    if (!STORE_ID || !STORE_PASSWORD || !SESSION_API || !VALIDATION_API || !API_URL) {
        throw new Error(
            "Missing critical SSLCommerz configuration in backend environment variables. " +
            "Please configure SSL_STORE_ID, SSL_STORE_PASSWORD, SSL_SESSION_API, SSL_VALIDATION_API, and BETTER_AUTH_URL in your apps/server/.env file."
        );
    }
};

/**
 * Initiates an SSLCommerz gateway session.
 *
 * @param params Object containing amount, transaction ID, product name, and optional customer details.
 * @returns Parsed JSON response from SSLCommerz API.
 */
export const initiateSSLSession = async (params: SSLCommerzInitParams): Promise<any> => {
    validateConfig();

    const amountInBDT = Math.round(params.amount);
    const sslParams = new URLSearchParams();

    // Core Store Details
    sslParams.append("store_id", STORE_ID!);
    sslParams.append("store_passwd", STORE_PASSWORD!);
    sslParams.append("total_amount", amountInBDT.toFixed(2));
    sslParams.append("currency", "BDT");
    sslParams.append("tran_id", params.tranId);

    // Redirect endpoints pointing back to our backend
    sslParams.append("success_url", `${API_URL}/api/payment/success`);
    sslParams.append("fail_url", `${API_URL}/api/payment/fail`);
    sslParams.append("cancel_url", `${API_URL}/api/payment/cancel`);
    sslParams.append("ipn_url", `${API_URL}/api/payment/ipn`);

    // Customer Details (Providing fallback test values if not provided by authenticated user)
    sslParams.append("cus_name", params.customerName || "Kazi Hasibul Haque Hasib");
    sslParams.append("cus_email", params.customerEmail || "hasib46739@gmail.com");
    sslParams.append("cus_add1", "Khulna, Bangladesh");
    sslParams.append("cus_city", "Khulna");
    sslParams.append("cus_state", "Khulna");
    sslParams.append("cus_postcode", "9100");
    sslParams.append("cus_country", "Bangladesh");
    sslParams.append("cus_phone", params.customerPhone || "01812004315");

    // Product & Shipping Profile Details (Required by SSLCommerz)
    sslParams.append("shipping_method", "NO");
    sslParams.append("num_of_item", "1");
    sslParams.append("product_name", params.productName);
    sslParams.append("product_category", "Education");
    sslParams.append("product_profile", "non-physical-goods");

    const response = await fetch(SESSION_API!, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: sslParams.toString()
    });

    return await response.json();
};

/**
 * Validates a transaction callback using SSLCommerz Validation API.
 *
 * @param valId The validation ID received from the redirect callback.
 * @returns Parsed JSON response from SSLCommerz Validation API.
 */
export const validateSSLTransaction = async (valId: string): Promise<any> => {
    validateConfig();

    const valUrl = `${VALIDATION_API}?val_id=${valId}&store_id=${STORE_ID}&store_passwd=${STORE_PASSWORD}&format=json`;
    const response = await fetch(valUrl);
    return await response.json();
};
