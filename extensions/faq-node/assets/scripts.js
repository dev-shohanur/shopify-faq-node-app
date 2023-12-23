const createOstIframe = () => {
  if (Shopify?.shop) {
    const GeneralFaq = document.getElementById("general-faq");
    const groupId = GeneralFaq.getAttribute("data-groupID");
    const Link = `https://loyal-content-kingfish.ngrok-free.app/store-font/general-faq/${Shopify?.shop}/${groupId}`;
    const Iframe = document.createElement("iframe");

    console.log(Shopify?.shop)

    Iframe.src = Link;
    Iframe.frameBorder = "0";
    Iframe.scrolling = "yes";
    Iframe.width = "100%";
    Iframe.height = "100%";
    Iframe.style = "min-height: 420px;";
    Iframe.className = "faq-container";
    GeneralFaq.appendChild(Iframe);
  }

};

createOstIframe();