import { useNavigate, useParams } from "react-router-dom";
import PropTypes from 'prop-types';

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
};

function ListItem({ item }) {
  const { type } = useParams();
  const navigate = useNavigate();

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 ease-in-out">
      <td className="p-2 text-center">{item._id}</td>
      <td className="p-2 truncate indent-4 cursor-pointer" onClick={ () => navigate(`/${type}/${item._id}`) }>{item.title}</td>
      <td className="p-2 text-center truncate">{item.user.name}</td>
      <td className="p-2 text-center hidden sm:table-cell">{item.views}</td>
      <td className="p-2 text-center hidden sm:table-cell">{item.repliesCount}</td>
      <td className="p-2 truncate text-center hidden sm:table-cell">{item.createdAt}</td>
    </tr>
  );
}

export default ListItem;