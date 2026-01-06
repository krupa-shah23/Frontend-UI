import { useEffect, useState } from "react";
import { getAllUsers } from "../../api/auth";
import mockImages from "../../data/mockImages";
import PostCard from "../../components/PostCard";
import "./Home.css";


export default function Home()
{

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() =>
  {

    async function buildFeed()
    {

      try
      {
        const res = await getAllUsers();

        const users = Array.isArray(res.data)
          ? res.data
          : res.data.users || [];

        const feed = users.map((user, index) =>
        ({
          id: user._id,
          image: mockImages[index % mockImages.length],
          caption: user.bio || "Enjoying the moment ✨",
          likes: Math.floor(Math.random() * 500) + 50,
          comments: [],
          user:
          {
            name: user.name,
            username: user.name.split(" ")[0].toLowerCase(),
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
              user.name
            )}&background=0D1117&color=00FF88`,
          },
        }));

        setPosts(feed);
      }

      catch (err)
      {
        console.error("Failed to build feed", err);
      }
      
      finally
      {
        setLoading(false);
      }

    }


    buildFeed();

  }, []);


  if (loading)
    return <div className="home">Loading feed...</div>;


  return (
    <div className="home">

      <div className="feed">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

    </div>
  );

}
