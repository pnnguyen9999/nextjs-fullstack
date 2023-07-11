import apiClient from "@/libs/axiosClient";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function Home() {
  const router = useRouter();

  const login = async () => {
    try {
      const res = await apiClient.post("/login", {
        username: "nhan",
        password: "123123",
      });
      localStorage.setItem("token", res.data);
      toast.success("Đăng nhập thành công !");
    } catch (error) {
      toast.error("Đăng nhập thất bại !");
      console.log(error);
    }
  };

  const logout = async () => {
    localStorage.removeItem("token");
    toast.success("Đăng xuất thành công !");
  };
  return (
    <>
      Index{" "}
      <button onClick={() => router.push("/profile")}>
        go to user profile
      </button>
      <button onClick={() => login()}>login</button>
      <button onClick={() => logout()}>logout</button>
    </>
  );
}
