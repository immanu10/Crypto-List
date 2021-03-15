import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Details.css";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Details = ({ id, loading }) => {
  const [info, setInfo] = useState({});
  const [isInfoloading, setIsInfoLoading] = useState("true");

  useEffect(() => {
    axios
      .get(`https://api.coinpaprika.com/v1/coins/${id}`)
      .then((res) => {
        setInfo(res.data);
        setIsInfoLoading(false);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <>
      {isInfoloading || loading ? (
        <div>...Loading</div>
      ) : (
        <div>
          <div className="title">
            <h2 className="title-name">{info.name}</h2>
            <p className="title-symbol">{info.symbol}</p>
          </div>
          <p className="title-description">{info.description}</p>
          <p>
            Hash Algorithm : <span>{info.hash_algorithm}</span>{" "}
          </p>
          <p>
            Invented in :
            <span>{months[new Date(info.started_at).getMonth()]}</span>
            <span>{new Date(info.started_at).getFullYear()}</span>
          </p>
          <p>People who worked on {info.name} : </p>
          <ul>
            {info.team.map((person) => {
              return <li key={person.id}>{person.name}</li>;
            })}
          </ul>
          <p>
            Website :
            <a
              target="_blank"
              href={info.links.website[0]}
              className="title-website"
            >
              {info.name}
            </a>
          </p>
        </div>
      )}
    </>
  );
};

export default Details;
