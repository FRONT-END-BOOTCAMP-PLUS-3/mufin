export class KISRestClient {
    private apiKey: string;
    private secretKey: string;
    private accessToken: string| null = null;

    constructor(apiKey: string, secretKey: string) {
        this.apiKey = apiKey;
        this.secretKey = secretKey;
    }

    public async getAccessToken(): Promise<string> {
        if (this.accessToken) return this.accessToken;

        const url = process.env.KIS_API_URL;

        const body = {
            grant_type: "client_credentials",
            appkey: this.apiKey,
            appsecret: this.secretKey
          };

          try {
            const response = await fetch(url, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body)
            });
            } catch (error) {
                console.error(error);
            }
    }
}