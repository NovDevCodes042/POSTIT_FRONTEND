import React, { useState, useEffect} from "react";
import Layout from "../components/Layout";
import StoryContent from "../components/StoryContent";

import { Link } from "react-router-dom";
import stories from "../mockData/story";
import Story from "../components/Story";
import { instance } from "../Config/api";
import Loading from "../components/LoadingState/Loading";

const Allstories = () => {
  const token = localStorage.getItem("token")
  // console.log(stories);
  const [stories, setStories] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchStories = async () => {
    try {
      const { data } = await instance.get("/all/story", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setIsLoading(false)
      // console.log(data);
      setStories(data.stories)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchStories();
  }, [])

  // if (isLoading){
  //   return <Loading />
  // }

  return (
    <div>
      <Layout>
        <div>
          <StoryContent />
        </div>
        <div className="container story-div  mt-3">
          {isLoading ? <Loading /> : stories.map((story) => {
            return <Story key={story._id} {...story} />;
          })}
        </div>
      </Layout>
    </div>
  );
};

export default Allstories;
