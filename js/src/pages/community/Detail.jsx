import Button from "@components/Button";
import useFetch from "@hooks/useFetch";
import useMutation from "@hooks/useMutation";
import useUserStore from "@zustand/authStore";
import { Outlet, useNavigate, useParams } from "react-router-dom";

function Detail() {
  const navigate = useNavigate();
  const { type, _id } = useParams();
  const { data } = useFetch(`posts/${_id}`);
  const { user } = useUserStore();
  const { send } = useMutation(`posts/${_id}`, {
    method: "DELETE",
  });

  const item = data?.item;

  const handleDelete = async (id) => {
    try {
      if(user._id === item.user._id){
        await send({
          headers: {
            Authorization: `Bearer ${user.token.accessToken}`,
          },
        });
      } else {
        console.error("본인이 작성한 글만 삭제 가능합니다.")
      }
      navigate(`/${type}`);
    } catch (error) {
      console.error("게시글 삭제 실패:", error);
    }
  };

  return (
    <main className="container mx-auto mt-4 px-4">
      <section className="mb-8 p-4">
        <div className="font-semibold text-xl">{item?.title}</div>
        <div className="text-right text-gray-400">
          작성자 : {item?.user.name}
        </div>
        <div className="mb-4">
          <div>
            <pre className="font-roboto w-full p-2 whitespace-pre-wrap">
              {item?.content}
            </pre>
          </div>
          <hr />
        </div>
        <div className="flex justify-end my-4">
          <Button onClick={() => navigate(`/${type}`)}>목록</Button>
          <Button
            bgColor="gray"
            onClick={() => navigate(`/${type}/${_id}/edit`)}
          >
            수정
          </Button>
          <Button bgColor="red" onClick={() => handleDelete(_id)}>
            삭제
          </Button>
        </div>
      </section>
      <Outlet />
    </main>
  );
}

export default Detail;
