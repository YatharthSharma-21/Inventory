import React, { useState } from "react";
import { useParams } from "react-router";

// Styles
import "./PartnerDetail.css";

//Components
import Settings from "../../Settings/Settings";
import CreatePartner from "../../CreatePartner/CreatePartner";

//Redux
import { useSelector } from "react-redux";

const PartnerDetail = () => {
  const { id } = useParams();

  //Redux
  const { partners } = useSelector((state) => state.BP);
  const { user } = useSelector((state) => state.auth);

  const isAdmin = user.role.includes("admin");

  //Find partner by id
  const partner = isAdmin ? partners.find((part) => part._id === id) : user;

  const [isReportSettings, setIsReportSettings] = useState(isAdmin);
  return (
    <div>
      <div
        className="partnerDet__settings__toggle"
        onClick={() => setIsReportSettings(!isReportSettings)}
      >
        <div className="partnerDet__settings__toggle__btn">
          <i className="fas fa-cog"></i>
        </div>
        <p>{!isReportSettings ? "Report Settings" : "Personal Details"}</p>
      </div>

      {isReportSettings ? (
        <Settings
          settings={partner.settings}
          partCode={partner.code}
          preferences={partner?.preferences}
        />
      ) : (
        <CreatePartner
          heading={`Update Partner #${partner.code}`}
          partner={partner}
          isAdmin={isAdmin}
        />
      )}
    </div>
  );
};

export default PartnerDetail;
