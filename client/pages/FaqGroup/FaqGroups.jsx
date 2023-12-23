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
import { DeleteMajor, EditMajor } from "@shopify/polaris-icons";
import FaqGroup from "./FaqGroupForm";
import FaqItem from "./FaqGroupItem";
import useDataFetcher from "../../hooks/useDataFetcher";
import Loading from "../Loading";

const FaqGroups = () => {
  console.log("Md Shohanur Rahman");
  const [orders, setOrders] = useState([]);
  const [active, setActive] = useState(false);
  const [activeId, setActiveId] = useState("");
  const [isNewGroup, setIsNewGroup] = useState(true);
  const [responseData, Refetch, isLoading] = useDataFetcher(
    "GET",
    "/api/apps/faq-group",
    ""
  );
  const handleModalChange = useCallback(
    (isNew, id) => {
      setIsNewGroup(isNew);
      setActiveId(id);
      setActive(!active);
      Refetch();
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
    singular: "FAQ Group",
    plural: "FAQ Groups",
  };

  const CURRENT_PAGE = "current_page";

  return (
    <div className="w-full ">
      {isLoading ? (
        <Loading />
      ) : (
        <Frame>
          <div className="my-20 flex justify-around">
            <Text variant="heading3xl" as="h2">
              The All Groups
            </Text>
            <Button variant="primary" onClick={() => handleModalChange(true)}>
              Create New Group
            </Button>
          </div>
          <div className="container mx-auto">
            <LegacyCard sectioned>
              <IndexTable
                selectable={false}
                hasMoreItems={true}
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
                  <FaqItem
                    key={index}
                    index={index}
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
                ))}
              </IndexTable>
            </LegacyCard>
          </div>
        </Frame>
      )}
    </div>
  );
};

export default FaqGroups;
