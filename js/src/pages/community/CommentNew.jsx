import Submit from "@components/Submit";
import useMutation from "@hooks/useMutation";
import useUserStore from "@zustand/authStore";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

function CommentNew({setState}) {
  const { _id } = useParams();
  const { user } = useUserStore();
  const { send } = useMutation(`posts/${_id}/replies`, {
    method: "POST",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleAdd = async (formData) => {
    try {
      await send({
        body: JSON.stringify(formData),
        headers: {
          Authorization : `Bearer ${user.token.accessToken}`, 
          "Content-Type": "application/json",
        }
      })
      setState(true)
      reset()
    } catch (error) {
      console.error("댓글 작성 실패:", error)
    }
  };  

  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <h4 className="mb-4">새로운 댓글을 추가하세요.</h4>
      <form onSubmit={handleSubmit(handleAdd)}>
        <div className="mb-4">
          <textarea
            rows="3"
            cols="40"
            className="block p-2 w-full text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="내용을 입력하세요."
            name="content"
            {...register("content", {
              required: "내용을 입력하세요.",
              minLength: {
                value: 2,
                message: "내용을 2글자 이상 입력하세요.",
              },
            })}
          ></textarea>

          {errors.content && (
            <p className="ml-2 mt-1 text-sm text-red-500">{errors.content.message}</p>
          )}
        </div>
        <Submit size="sm">댓글 등록</Submit>
      </form>
    </div>
  );
}

export default CommentNew;
