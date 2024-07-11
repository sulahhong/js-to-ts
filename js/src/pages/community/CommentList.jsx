import useFetch from "@hooks/useFetch";
import CommentItem from "@pages/community/CommentItem";
import CommentNew from "@pages/community/CommentNew";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CommentList() {
  const [state, setState] = useState(false);
  const { _id } = useParams();
  const { data, refetch } = useFetch(`posts/${_id}/replies`);

  const items = data?.item.map((item) => (
    <CommentItem key={item._id} item={item} />
  ));

  useEffect(() => {
    refetch();
  }, [state]);

  return (
    <section className="mb-8">
      <h4 className="mt-8 mb-4 ml-2">댓글 {items?.length} 개 </h4>
      {items}
      <CommentNew setState={setState} />
    </section>
  );
}

export default CommentList;
