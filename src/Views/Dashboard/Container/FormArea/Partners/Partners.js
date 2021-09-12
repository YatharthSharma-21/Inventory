import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { getPartner } from "../../../../../redux/actions/BPAction";
import Button from "../../../../common/Button/Button";

import "./Partners.css";

const PartnerCard = ({ partner, imgURL }) => {
  const history = useHistory();

  const { name, email, _id: id, code } = partner;

  return (
    <div className="partner__card">
      <img src={imgURL} alt="partner" />
      <div className="partner__detail">Name: {name}</div>
      <div className="partner__detail">Email: {email}</div>
      <div className="partner__detail">Partner Code: {code}</div>
      <Button
        text="Edit"
        onClick={() => history.push(`/admin/partner/${id}`)}
        title="Edit Partner"
      />
    </div>
  );
};

const Partners = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const partners = useSelector((state) => state.BP.partners);
  const fetched = useSelector((state) => state.BP.fetched);

  useEffect(() => {
    document.querySelector(".formArea").scrollTo(0, 0);

    if (!fetched.partners) dispatch(getPartner());
  }, []);

  return (
    <div className="partners">
      <h1>
        Partners
        <i
          className="fa fa-user-plus"
          aria-hidden="true"
          onClick={() => history.push("/admin/partners/add")}
          title="Add Partner"
        />
      </h1>

      <div className="partners__grid">
        {partners
          .slice(0)
          .reverse()
          .map((partner, i) => (
            <PartnerCard
              key={partner._id}
              imgURL={`https://www.w3schools.com/w3images/avatar${
                (i % 5) + 2
              }.png`}
              partner={partner}
            />
          ))}
      </div>
    </div>
  );
};

export default Partners;
