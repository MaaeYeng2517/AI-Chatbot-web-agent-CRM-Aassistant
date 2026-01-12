"use client";

import { useState } from "react";
import { auth, db } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";

export default function WritePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function publish() {
    await addDoc(collection(db, "posts"), {
      title,
      content,
      authorId: auth.currentUser.uid,
      createdAt: new Date(),
      stars: 0
    });
    alert("โพสต์เรียบร้อย ✨");
  }

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">เขียนโพสต์ใหม่</h2>

      <input
        className="w-full border p-2 rounded"
        placeholder="หัวข้อ"
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="w-full border p-2 rounded h-40"
        placeholder="เนื้อหา"
        onChange={(e) => setContent(e.target.value)}
      />

      <button
        onClick={publish}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        เผยแพร่
      </button>
    </div>
  );
}
