import React, { useCallback, useState } from "react";
import { Button, Text, ButtonGroup, IndexTable, Toast } from "@shopify/polaris";
import useFetch from "../../hooks/useFetch";
import { DeleteMajor, EditMajor } from "@shopify/polaris-icons";
import FaqGroup from "./FaqGroupForm";
import useDataFetcher from "../../hooks/useDataFetcher";

const FaqGroupItem = ({
  _id,
  id,
  name,
  description,
  orders,
  index,
  active,
  Refetch,
  activeId,
  isNewGroup,
  handleModalChange,
}) => {
  const [toggleActive, setToggleActive] = useState(false);

  const [responseDataDelete, dataDelete] = useDataFetcher(
    "DELETE",
    `/api/apps/faq-group/${_id}`,
    ""
  );

  const handleDelete = async () => {
    dataDelete();
    setToggleActive(true);
    Refetch();
  };

  const toastMarkup = toggleActive ? (
    <Toast
      content={`${name} Faq Deleted !`}
      onDismiss={() => setToggleActive(false)}
    />
  ) : null;

  return (
    <IndexTable.Row id={id} key={index} position={index}>
      <IndexTable.Cell>
        <Text variant="bodyMd" fontWeight="bold" as="span">
          {index + 1}
        </Text>
      </IndexTable.Cell>
      <IndexTable.Cell>{name}</IndexTable.Cell>
      <IndexTable.Cell>{description}</IndexTable.Cell>
      <IndexTable.Cell>
        <ButtonGroup>
          <Button variant="primary" url={`/faq-group/faq/${_id}`}>
            FAQ's
          </Button>
          <Button
            variant="primary"
            icon={EditMajor}
            tone="success"
            onClick={() => handleModalChange(false, _id)}
          >
            Edit
          </Button>
          <Button
            variant="primary"
            icon={DeleteMajor}
            tone="critical"
            onClick={() => {
              handleDelete();
            }}
          >
            Delete
          </Button>
          {toastMarkup}
        </ButtonGroup>
      </IndexTable.Cell>
      <div className="hidden">
        {orders ? (
          <FaqGroup
            _id={_id}
            group={{ description, name }}
            active={active}
            Refetch={Refetch}
            activeId={activeId}
            isNewGroup={isNewGroup}
            handleModalChange={handleModalChange}
          />
        ) : null}
      </div>
    </IndexTable.Row>
  );
};

export default FaqGroupItem;
