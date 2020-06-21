/*
 * Blue1984 - Twitter without censorship
 * Copyright (c) 2020. Mikhail Lazarev
 * https://github.com/MikaelLazarev/blue1984-server
 *
 */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import PageHeader from "../../components/PageHeader/PageHeader";
import { Breadcrumb } from "../../components/PageHeader/Breadcrumb";
import { FormView } from "../../containers/Accounts/FormView";

import { STATUS } from "../../utils/status";
import { RootState } from "../../store";
import {Account, AccountCreateDTO} from "../../core/accounts";

import actions from "../../store/actions";

export const AccountsNewScreen: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [hash, setHash] = useState("0");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const operationStatus = useSelector(
    (state: RootState) => state.operations.data[hash]?.data
  );

  const id = "";

  // TODO: Move status to new Dataloader component

  useEffect(() => {
    if (hash !== "0") {
      switch (operationStatus?.status) {
        case STATUS.SUCCESS:
          history.push(`/accounts/${id}`);
          break;

        case STATUS.FAILURE:
          setHash("0");
          setIsSubmitted(false);
          alert(`Cant submit your operation to server\n${operationStatus.error}` );
      }
    }
  }, [hash, operationStatus]);

  const breadcrumbs: Breadcrumb[] = [
    {
      url: "/account",
      title: "Accounts",
    },
  ];

  const data: AccountCreateDTO = {
    id: "",
  };
  const onSubmit = (values: AccountCreateDTO) => {
    setIsSubmitted(true);
    const newHash = Date.now().toString();
    setHash(newHash);

    // Emit data
    dispatch(actions.accounts.addNewAccount(values.id, newHash));
  };

  return (
    <div className="content content-fixed">
      <PageHeader title={"Add new account"} breadcrumbs={breadcrumbs} />
      <FormView data={data} onSubmit={onSubmit} isSubmitted={isSubmitted} />
    </div>
  );
};
