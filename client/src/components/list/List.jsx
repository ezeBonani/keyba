/* eslint-disable react/prop-types */
import "./list.scss";
import Card from "../card/Card";

export default function List({ posts }) {
  return (
    <div className="list">
      {posts.map((item) => {
        return <Card key={item.id} item={item} />;
      })}
    </div>
  );
}
