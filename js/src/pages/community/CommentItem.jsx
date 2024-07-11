import useUserStore from "@zustand/authStore";
import { Link } from "react-router-dom";

function CommentItem({item}) {
	const { user } = useUserStore();

	return (
		<div className="shadow-md rounded-lg p-4 mb-4">
		<div className="flex justify-between items-center mb-2">
			<img
				className="w-8 mr-2 rounded-full"
				src={`http://api.fesp.shop/${user.profile}`}
			/>
			<Link to="" className="text-orange-400">
				{user.name}
			</Link>
			<time
				className="ml-auto text-gray-500"
				dateTime={item.createdAt}
			>
				{item.createdAt}
			</time>
		</div>
		<pre className="whitespace-pre-wrap text-sm">{item.content || item.comment}</pre>
	</div>
	)
}

export default CommentItem