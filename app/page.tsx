"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "@/app/store/store";
import TaskList from "@/app/components/TaskList";

export default function Home() {
  return (
    <Provider store={store}>
      <TaskList />
    </Provider>
  );
}
