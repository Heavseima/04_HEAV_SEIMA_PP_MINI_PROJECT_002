import { auth } from "../auth";

const headerToken = async () => {
  const session = await auth();
  const headers = {
    "Content-Type": "application/json",
  };
  if (session?.user?.payload?.token) {
    headers.Authorization = `Bearer ${session.user.payload.token}`;
  }
  return headers;
};
export default headerToken;
