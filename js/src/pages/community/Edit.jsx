import Button from "@components/Button";
import Submit from "@components/Submit";
import useFetch from "@hooks/useFetch";
import useMutation from "@hooks/useMutation";
import useUserStore from "@zustand/authStore";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

function Edit() {
  const { type, _id } = useParams();
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { send } = useMutation(`posts/${_id}`, {
    method: "PATCH",
  });
  const { data } = useFetch(`posts/${_id}`);
  const item = data?.item;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: {
      title: item?.title,
      content: item?.content,
      type: item?.type,
    },
  });

  const handleEdit = async (formData) => {
    try {
      await send({
        body: JSON.stringify(formData),
        headers: {
          Authorization: `Bearer ${user?.token.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      navigate(`/${type}/${_id}`);
    } catch (error) {
      console.error("수정 실패:", error);
    }
  };

  return (
    <main className="min-w-[320px] p-4">
      <div className="text-center py-4">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
          게시글 수정
        </h2>
      </div>
      <section className="mb-8 p-4">
        <form onSubmit={handleSubmit(handleEdit)}>
          <div className="my-4">
            <label className="block text-lg content-center" htmlFor="title">
              제목
            </label>
            <input
              type="text"
              placeholder="제목을 입력하세요."
              className="w-full py-2 px-4 border rounded-md dark:bg-gray-700 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              name="title"
              {...register("title", {
                required: "제목을 입력하세요.",
                minLength: {
                  value: 2,
                  message: "제목을 2글자 이상 입력하세요.",
                },
              })}
            />
            {errors.title && (
              <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
                {errors.title.message}
              </p>
            )}
          </div>
          <div className="my-4">
            <label className="block text-lg content-center" htmlFor="content">
              내용
            </label>
            <textarea
              rows="15"
              placeholder="내용을 입력하세요."
              className="w-full p-4 text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              name="content"
              {...register("content")}
            ></textarea>
            {errors.content && (
              <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
                {errors.content.message}
              </p>
            )}
          </div>
          <hr />
          <div className="flex justify-end my-6">
            <Submit>수정</Submit>
            <Button type="reset" bgColor="gray" onClick={() => history.back()}>
              취소
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default Edit;
