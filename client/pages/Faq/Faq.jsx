import React, { useCallback, useEffect, useState } from "react";
import "../../App.css";
import {
  Button,
  IndexTable,
  LegacyCard,
  useIndexResourceState,
  Text,
  ButtonGroup,
  Frame,
  Spinner,
} from "@shopify/polaris";
import useFetch from "../../hooks/useFetch";
import {
  DeleteMajor,
  EditMajor,
  MobileBackArrowMajor,
} from "@shopify/polaris-icons";
import FaqItem from "./FaqItem";
import useDataFetcher from "../../hooks/useDataFetcher";
import { usePathParams } from "raviger";
import FaqForm from "./FaqForm";

const Faq = ({ groupId }) => {
  const [orders, setOrders] = useState([]);
  const [active, setActive] = useState(false);
  const [activeId, setActiveId] = useState("");
  const [isNewGroup, setIsNewGroup] = useState(true);
  const [responseData, Refetch, isLoading] = useDataFetcher(
    "GET",
    `/api/apps/faq/${groupId}`,
    ""
  );

  const [responseFaqGroup, faqGroup] = useDataFetcher(
    "GET",
    `/api/apps/faq-group/${groupId}`,
    ""
  );

  useEffect(() => {
    faqGroup();
  }, []);

  const handleModalChange = useCallback(
    (isNew, id) => {
      setIsNewGroup(isNew);
      setActiveId(id);
      setActive(!active);
      if (!isNew) {
        Refetch();
      }
    },
    [active]
  );
  useEffect(() => {
    if (!isLoading && !responseData.success) {
      Refetch();
    }
  }, [Refetch, isLoading]);
  useEffect(() => {
    if (responseData.success) {
      setOrders([...responseData.result]);
    }
  }, [responseData]);

  const resourceName = {
    singular: "FAQ",
    plural: "FAQ's",
  };

  const CURRENT_PAGE = "current_page";

  return (
    <div className="w-full ">
      <Frame>
        <div className="my-20 flex justify-around">
          <Button icon={MobileBackArrowMajor} url="/faq-group">
            Back To Group
          </Button>
          <Text variant="heading3xl" as="h2">
            The All FAQ Of
            <span className="text-green-800">
              {" "}
              {responseFaqGroup.result !== undefined
                ? responseFaqGroup.result[0].name
                : "..."}{" "}
              {"  "}
            </span>
            Group
          </Text>
          <Button variant="primary" onClick={() => handleModalChange(true)}>
            Create New Faq
          </Button>
        </div>
        <div className="container mx-auto">
          <LegacyCard>
            {isLoading ? (
              <div className="h-[50vh] w-[100vw] flex justify-center items-center">
                <Spinner accessibilityLabel="Spinner example" size="large" />
              </div>
            ) : (
              <>
                <div className={`${orders ? "hidden" : "block"}`}>
                  <FaqForm
                    active={active}
                    Refetch={Refetch}
                    activeId={activeId}
                    groupId={groupId}
                    isNewGroup={isNewGroup}
                    handleModalChange={handleModalChange}
                  />
                </div>
                <IndexTable
                  selectable={false}
                  hasZebraStriping={true}
                  resourceName={resourceName}
                  itemCount={orders.length}
                  headings={[
                    { title: "index" },
                    { title: "Name" },
                    { title: "Description" },
                    { title: "Actions" },
                  ]}
                >
                  {orders.map(({ _id, id, name, description }, index) => (
                    <>
                      <FaqItem
                        key={index}
                        index={index}
                        groupId={groupId}
                        _id={_id}
                        id={id}
                        name={name}
                        description={description}
                        orders={orders}
                        active={active}
                        Refetch={Refetch}
                        activeId={activeId}
                        isNewGroup={isNewGroup}
                        handleModalChange={handleModalChange}
                      />
                    </>
                  ))}
                </IndexTable>
              </>
            )}
          </LegacyCard>
        </div>
      </Frame>
    </div>
  );
};

export default Faq;
