"use client";
import { AuthGuard } from "./components/guard/AuthGuard";
import { useAuthUserContext } from "./providers/AuthUserProvider";
import { useRouter } from "next/navigation";

const HomeComponent = () => {
  const { currentUser, onLogout } = useAuthUserContext();
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="text-center">
        <h1 className="text-5xl font-bold">Airion株式会社 コーディング試験</h1>
        <p className="mt-3 text-2xl">ようこそ、{currentUser?.user_name}さん</p>
      </div>

      <div className="mt-12 flex justify-center items-center space-x-4">
        <button
          className="text-center block border border-white rounded bg-blue-500 hover:bg-blue-700 text-white py-2 px-8"
          onClick={() => {
            router.push('/tasks');
          }}
        >
          タスク管理画面
        </button>

        <button
          className="text-center block border border-white rounded bg-violet-500 hover:bg-violet-700 text-white py-2 px-8 cursor-not-allowed"
          disabled
        >
          ユーザ管理画面
        </button>
      </div>

      {
        // ログアウトボタン
      }
      <button
        className="mt-4 text-center block border border-white rounded bg-red-500 hover:bg-red-700 text-white py-2 px-8"
        onClick={() => onLogout()}
      >ログアウト</button>
    </div>
  );
}

export default function Home() {
  return (
    <AuthGuard>
      <HomeComponent />
    </AuthGuard>
  )
}


