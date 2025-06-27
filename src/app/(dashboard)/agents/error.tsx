'use client'

import ErrorState from "@/components/error-state";
import React from "react";

const AgentsErrorState = () => {
  return (
    <ErrorState
      title="Error loading agents"
      description="Please try again later"
    />
  );
};

export default AgentsErrorState;
