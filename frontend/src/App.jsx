import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({
    title: "",
    content: "",
    author: "",
    category: "",
    discountPercentage: "",
  });

  const loadPosts = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/posts`);
      setPosts(res.data);
    } catch (error) {
      alert("Backend connect wenne na. API URL / backend check karanna.");
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addPost = async (e) => {
    e.preventDefault();
    await axios.post(`${API_URL}/api/posts`, form);
    setForm({ title: "", content: "", author: "", category: "" , discountPercentage: "",});
    loadPosts();
  };


  const deletePost = async (id) => {
    await axios.delete(`${API_URL}/api/posts/${id}`);
    loadPosts();
  };

  return (
    <div className="container">
      <h1>MERN Blog Manager</h1>
      <p className="sub">MongoDB + Express + React + Node deploy practice project</p>

      <form onSubmit={addPost} className="card form">
        <input
          name="title"
          placeholder="Post title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          placeholder="Post content"
          value={form.content}
          onChange={handleChange}
          required
        />
        <input
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleChange}
        />
        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
        />
        <input
  name="discountPercentage"
  type="number"
  placeholder="Discount Percentage"
  value={form.discountPercentage}
  onChange={handleChange}
/>
        <button type="submit">Add Post</button>
      </form>

      <div className="posts">
        {posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          posts.map((post) => (
            <div className="card post" key={post._id}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <small>
                {post.author || "Anonymous"} • {post.category || "General"}
              </small>
              <p>Discount: {post.discountPercentage}%</p>
              <button className="delete" onClick={() => deletePost(post._id)}>
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
