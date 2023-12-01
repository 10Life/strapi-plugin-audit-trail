import axiosInstance from '../utils/axiosInstance';
const sleep = ms => new Promise(res => setTimeout(res, ms));
const logRequests = {
  flush: async () => {
    const data = await axiosInstance.get(`/audit-trail/flush`);
    await sleep(5000);
    return data;
  },
};
export default logRequests;