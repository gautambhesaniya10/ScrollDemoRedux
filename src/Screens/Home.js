import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { comicAPI } from "../Redux/comic/action";
const Home = () => {
  const dispatch = useDispatch();
  const [comicOffset, setComicOffset] = useState(25);
  const [searchText, setSearchText] = useState("");
  const [comicData, setComicData] = useState([]);
  const { comic } = useSelector((state) => state.comic);
  useEffect(() => {
    dispatch(comicAPI(comicOffset));
  }, [comicOffset]);
  useEffect(() => {
    setComicData(comic)
  }, [comic]);

  const handleScrollEnd = () => {
    setComicOffset(comicOffset + 25);
  };

  window.onscroll = function () {
    let scrollingDown =
      document.documentElement.scrollTop <
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    if (scrollingDown === false) {
      handleScrollEnd();
    }
  };
  const handleSearch = (value) => {
    if (value) {
      setSearchText(value)
      let dummyData = [];
      comic.map(item => {
        let globalRegex = new RegExp(value.toLowerCase(), 'g');
        let title = item.title.toLowerCase()
        if (globalRegex.test(title)) {
          dummyData.push(item)
        }
      })
      setComicData(dummyData)
    }else{
      setSearchText(value)
      setComicData(comic)
    }
  }
  return (
    <div className="container" style={{ marginTop: "20px" }}>
      <div className="row">
        <div className="d-flex py-3 justify-content-end">
          <input className="form-control me-3 w-50" value={searchText} type="search" onChange={(e) => handleSearch(e.target.value)} placeholder="Search" aria-label="Search" />
        </div>
        {comicData?.map((comic, index) => (
          <div key={index} className="col-md-4">
            <div className="mb-5">
              <div className="card" style={{ height: "450px" }}>
                <img
                  style={{ height: "350px", textAlign: "center" }}
                  className="card-img-top"
                  src={comic.images["480w_still"].url}
                  alt="comic"
                />
                <div className="card-body">
                  <p className="card-text">
                    {comic.title}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
