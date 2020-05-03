import axios, { AxiosResponse } from 'axios';

const client = axios.create({
  baseURL: 'https://4ag9moeq25.execute-api.us-east-1.amazonaws.com/production/',
});

client.interceptors.response.use((resp: AxiosResponse<any>) => resp.data);

export default client;
