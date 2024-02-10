import React from "react";
import { useState, useEffect, useContext } from "react";
import RestaurantCard, { cardWithDiscount } from "../component/RestaurantCard";
import Shimmer from "../component/Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/hooks/useOnlineStatus";
import userContext from "../utils/context/userContext";
import useRestaurant from "../utils/hooks/useRestaurant";

const Main = () => {
  // const [resList, setResList] = useState([]);
  // const [filteredList, setFilteredList] = useState([]);

  //calling custom hook for api call
  const { resList, filteredList, setFilteredList } = useRestaurant();
  const [searchText, setSearchText] = useState("");

  const { loggedInUser, setUserName } = useContext(userContext);

  const RestaurantCardPromoted = cardWithDiscount(RestaurantCard);

  // useEffect(() => {
  //   fetchRestro();
  // }, []);

  // const fetchRestro = async () => {
  //   const list = await fetch(
  //     "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
  //   );
  //   const json = await list.json();
  //   //console.log(json)
  //   setResList(
  //     json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants
  //   );
  //   setFilteredList(
  //     json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants
  //   );
  //   // setFilteredArray(json.data.cards[5].card.card.gridElements.infoWithStyle.restaurants)
  //   console.log(
  //     json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants
  //   );
  // };
  const handleToggle = () => {
    const filteredRestro = resList.filter((res) => res.info.avgRating > 4.4);
    setFilteredList(filteredRestro);
  };

  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false) {
    return <h1>You're Offline</h1>;
  }
  // const handleToggle = () => {
  //   if (isFiltered) {
  //     // If currently filtered, switch to the original array
  //     setFilteredArray(null);
  //   } else {
  //     // If not filtered, apply your filter condition here
  //     // For example, let's filter out items with a specific property
  //     const filteredItems = resList.filter(item => item.info.avgRating > 4.4);
  //     setFilteredArray(filteredItems);
  //   }

  //   // Toggle the filter state
  //   setIsFiltered(!isFiltered);
  // };

  return resList.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="">
      <div className="">
        <div className="h-20 flex items-center justify-around pt-4">
          <div>
            <input
              type="text"
              className="py-3 pr-4"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />
            <button
              className="ml-3"
              onClick={() => {
                const searchedRestro = resList.filter((res) =>
                  res.info.name.toLowerCase().includes(searchText.toLowerCase())
                );
                setFilteredList(searchedRestro);
              }}
            >
              Search
            </button>
          </div>

          <button
            onClick={handleToggle}
            className="border border-black p-3 m-3 active:bg-slate-400 hover:bg-slate-400"
          >
            Top Rated
          </button>
          <span className=" px-2 py-1">
            <label>UserName : </label>
            <input
              className="px-2 y-1"
              type="search"
              value={loggedInUser}
              onChange={(e) => setUserName(e.target.value)}
            />
          </span>
        </div>
        <div className="flex flex-wrap gap-5 pt-11">
          {/* isFiltered ?
                 filteredArray.map((lists) => (
           <Link key={lists.info.id} to={'/restaurant' + lists.info.id}> <RestaurantCard  resData={lists}/></Link>
             )): */}
          {filteredList.map((lists) => (
            <Link key={lists.info.id} to={"/restaurants/" + lists.info.id}>
              {lists.info.aggregatedDiscountInfoV3 ? (
                <RestaurantCardPromoted resData={lists} />
              ) : (
                <RestaurantCard resData={lists} />
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;