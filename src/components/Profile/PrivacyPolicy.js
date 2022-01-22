import React from "react";
import "../../styles/terms.css"
import blogo from "../../images/blogo.jpg"

const PrivacyPolicy = () => {
  return (
    <div className="priv-main">
      <div className="priv-title">
        <img src={blogo} alt="black kweeble" />
        <h1>User Agrement and Terms of Service</h1>
      </div>
      <div className="priv-main-par">
        <div className="wahetevr">
          <p className="wht">kk</p>
        </div>
         <h5>Kweeble Terms of Service</h5>
        <p>
          These Terms of Service (“Terms”) govern your access to and use of our
          services, including our various websites, SMS, APIs, email
          notifications, applications, buttons, widgets, ads, commerce services.
        </p>

        <p>
          Kweeble's purpose is to provide a useful tool for the public. Our rules
          are to ensure all people can make use of our service freely and
          safely.
        </p>
        {/* <h5>Safety</h5>
        <p>
          Violence: You may not threaten violence against an individual or a
          group of people. We also prohibit the glorification of violence. 
          Terrorism/violent extremism: You may not threaten or promote terrorism
          or violent extremism. Child sexual exploitation: We have
          zero tolerance for child sexual exploitation on Kweeble. Hateful
          conduct: You may not promote violence against, threaten, or harass
          other people on the basis of race, ethnicity, national origin, caste,
          sexual orientation, gender, gender identity, religious affiliation,
          age, disability, or serious disease. Suicide or self-harm:
          You may not promote or encourage suicide or self-harm. 
          Sensitive media, including graphic violence and adult content: You may
          not post media that is excessively gory or share violent or adult
          content in profile or images. 
        </p> */}

        <h5>Privacy</h5>
        <p>
          Private information: You may not publish or post other people's
          private information (such as home phone number and address) without
          their express authorization and permission. We also prohibit
          threatening to expose private information or incentivizing others to
          do so. Non-consensual nudity: You may not post or share intimate
          photos or videos of someone that were produced or distributed without
          their consent.
        </p>

        <h5> User Agrement</h5>
        
          
       
        <p>
          We believe you should always know what data we collect from you and
          how we use it, and that you should have meaningful control over both.
          We want to empower you to make the best decisions about the
          information that you share with us. That’s the basic purpose of the
          User Agreement. The data displayed on Kweeble is the information that
          you want to share with your fellow friends and classmates.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
