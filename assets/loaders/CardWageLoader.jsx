import React from "react";
import ContentLoader from "react-content-loader";

const MyLoader = (props) => (
  <ContentLoader
    speed={2}
    width={400}
    height={370}
    viewBox="0 0 400 300"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="-200" rx="0" ry="0" width="300" height="370" />
    <rect x="16" y="47" rx="0" ry="0" width="266" height="10" />
    <rect x="0" y="162" rx="0" ry="0" width="300" height="18" />
    <rect x="0" y="188" rx="0" ry="0" width="300" height="18" />
    <rect x="0" y="215" rx="0" ry="0" width="300" height="18" />
    <circle cx="147" cy="270" r="20" />
    <circle cx="243" cy="270" r="20" />
    <circle cx="52" cy="270" r="20" />
  </ContentLoader>
);

const CardWageLoader = () => (
  <React.Fragment>
    {Array(10)
      .fill("")
      .map((e, i) => (
        <div key={i} className="card_wage_loader">
          <MyLoader style={{ opacity: Number(2 / i).toFixed(1) }} />
        </div>
      ))}
  </React.Fragment>
);

export default CardWageLoader;
