import React, { useState } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import edit from "../assets/images/edit.svg";
import "../../styles/Create.css";

const Create = () => {
  const redirect = useNavigate()
  const [ image, setImage ] = useState(null)
  const [ title, setTitle ] = useState("")
  const [ tags, setTags ] = useState("")
  const [ description, setDescription ] = useState("")
  const [ publish, setPublish ] = useState(false)

  const token = localStorage.getItem("token")
  
  const handleSubmit = async (e) => {

    console.log({ title, tags, description, image });
    e.preventDefault();
    setPublish(true)
    const formData = new FormData()
    formData.append("title", title)
    formData.append("tags", tags)
    formData.append("description", description)
    formData.append("image", image)

    try {
      const res = await fetch("https://ppostit-backend-server.onrender.com/api/user/story", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const data = await res.json()
      if (data.success) {
        //redirect to /mystories
        redirect("/mystories")
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <div id="task3Top">
      <Layout>
        <div>
          <div className="task3">
            <div className="newTask">
              <h1>Create Story</h1>
            </div>
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
              <div className="titleTask">
                <img src={edit} alt="" />

                <input required accept= "image/*" type="file" id="taskTitle"  name="image" placeholder="select image" onChange={(e) =>setImage(e.target.files[0])}/>
              </div>

              <div className="titleTask">
                <img src={edit} alt="" />

                <input type="text" placeholder="Title" id="taskTitle" required value={title} onChange={(e)=> setTitle(e.target.value)}  />
              </div>

              <div className="tagS">
                <img src={edit} alt="" />

                <select id="tags" required value={tags} onChange={(e) => setTags(e.target.value)}>
                  <option value="">Select a category</option>
                  <option value="nature">Nature</option>
                  <option value="lifestyle">Lifestyle</option>
                  <option value="sport">Sport</option>
                  <option value="technology">Technology</option>
                  <option value="others">Others</option>
                </select>
              </div>

              <div className="descripTion">
                <img src={edit} alt="" />
                <textarea required placeholder="Description" id="describe" value={description} onChange={(e) => setDescription(e.target.value)}/>
              </div>

              <div className="Btndone">
                <button type="submit" className="btnDone">
                  {/* Publish Story */}
                  {publish ? 'Publishing Your Story...' : "Publish Story"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Create;