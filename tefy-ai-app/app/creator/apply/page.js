"use client";

import { auth, db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";

export default function ApplyCreator() {
  async function becomeCreator() {
    const uid = auth.currentUser.uid;
    await updateDoc(doc(db, "users", uid), {
      role: "creator",
      creatorAt: new Date()
    });
    alert("คุณเป็น Creator แล้ว 🎉");
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">สมัครเป็น Creator</h2>
      <p className="my-4 text-gray-600">
        เขียนโพสต์ แชร์ความรู้ และรับรายได้จากดาว ⭐
      </p>
      <button
        onClick={becomeCreator}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        สมัครเป็น Creator
      </button>
    </div>
  );
}
