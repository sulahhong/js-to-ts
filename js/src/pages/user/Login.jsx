import Submit from "@components/Submit";
import useMutation from "@hooks/useMutation";
import useUserStore from "@zustand/authStore";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { setUser } = useUserStore();
  const { send } = useMutation("users/login", {
    method: "POST",
  });

  const onSubmit = async(formData) => {
    try{
      const res = await send({
        body: JSON.stringify(formData),
      })
      const user = res.item
      setUser(user)
      navigate('/')
    } catch(error) {
      console.error("회원가입 실패:", error);
    }
  }

  return (
    <main className="min-w-80 flex-grow flex items-center justify-center">
      <div className="p-8 border border-gray-200 rounded-lg w-full max-w-md dark:bg-gray-600 dark:border-0">
        <div className="text-center py-4">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">로그인</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 mb-2" htmlFor="email">이메일</label>
            <input
              id="email"
              type="email"
              placeholder="이메일을 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              name="email"
              {...register('email', {
                required: '이메일은 필수 입니다.',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: '이메일 형식이 아닙니다.',
                },
              })}
            />
            {/* 입력값 검증 에러 출력 */}
            {errors.email && <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">{errors.email.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 mb-2" htmlFor="password">비밀번호</label>
            <input
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              name="password"
              {...register('password', {
                required: '비밀번호는 필수 입니다.',
                minLength: {
                  value: 8,
                  message: '8자리 이상 입력하세요.',
                },
              })}
            />
            {/* 입력값 검증 에러 출력 */}
            {errors.password && <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">{errors.password.message}</p>}
            <Link to="#" className="block mt-6 ml-auto text-gray-500 text-sm dark:text-gray-300 hover:underline">비밀번호를 잊으셨나요?</Link>
          </div>
          <div className="mt-10 flex justify-center items-center">
            <Submit>로그인</Submit>
            <Link to="/user/signup" className="ml-8 text-gray-800 hover:underline">회원가입</Link>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Login;