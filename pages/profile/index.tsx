import apiClient from "@/libs/axiosClient";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Props = {};
interface IUser {
  id: string;
  createdAt: string;
  username: string;
  email: string;
}

interface IBooks {
  id: string;
  createdAt: string;
  name: string;
  author: string;
}

export default function Profile({}: Props) {
  const [userData, setUserData] = useState<IUser>();
  const [books, setBooks] = useState<IBooks[]>();

  const router = useRouter();

  const getProfile = async () => {
    try {
      const res = await apiClient.get("/profile");
      setUserData(res.data);
      console.log({ data: res.data });
    } catch (error) {
      router.push("/");
    }
  };

  const getBooks = async () => {
    try {
      const res = await apiClient.get("/books");
      setBooks(res.data);
      console.log({ data: res.data });
    } catch (error) {
      router.push("/");
    }
  };

  useEffect(() => {
    getProfile();
    getBooks();
  }, []);

  if (!userData) {
    return <></>;
  }

  return (
    <div>
      Profile
      <ul>
        <li>username: {userData?.username}</li>
        <li>email: {userData?.email}</li>
        <li>create at: {userData?.createdAt}</li>
      </ul>
      {books?.map((book) => (
        <div>
          {book.name} - {book.author}
        </div>
      ))}
    </div>
  );
}
