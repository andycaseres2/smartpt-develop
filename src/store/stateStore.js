import { create } from "zustand";

const createNewTaskEmpty = (state, dynamicOptions) => [
  {
    data: "",
    editComponent: "select",
    type: null,
    options: state.clients,
    key_name: "idcustomer",
  },
  {
    data: "",
    editComponent: "input",
    type: "text",
    options: [],
    key_name: "name",
  },
  {
    data: "",
    editComponent: "input",
    type: "date",
    options: [],
    key_name: "startdate",
  },
  {
    data: "",
    editComponent: "input",
    type: "date",
    options: [],
    key_name: "estimateddate",
  },
  {
    data: "Pendiente",
    editComponent: "select",
    type: "status",
    options: [
      {
        id: 1,
        value: "Pendiente",
      },
      {
        id: 2,
        value: "En proceso",
      },
      {
        id: 3,
        value: "Finalizada",
      },
      {
        id: 4,
        value: "No ejecutada",
      },
    ],
    key_name: "state",
  },
  {
    data: "",
    editComponent: "input",
    type: "text",
    options: [],
    key_name: "comments",
  },
  {
    data: "",
    editComponent: "select",
    type: null,
    options: dynamicOptions,
    key_name: "idprocesses",
  },
  {
    data: "",
    editComponent: "select",
    type: null,
    options: state.activitiesByProcess,
    key_name: "idactivity",
  },
  {
    data: 0,
    editComponent: "input",
    type: "time",
    options: [],
    key_name: "estimatedtime",
  },
  {
    data: 0,
    editComponent: "input",
    type: "time",
    options: [],
    key_name: "realtimespent",
  },
  { data: "" },
  {
    data: "",
    editComponent: "input",
    type: "date",
    options: [],
    key_name: "estimateddate",
  },
  null,
];

export const stateStore = create((set) => {
  return {
    openNotifications: false,
    setOpenNotifications: (open) => {
      set({ openNotifications: open });
    },
    clients: [],
    setClients: (clients) => {
      set({ clients });
      set((state) => ({
        ...state,
        newTaskEmpty: createNewTaskEmpty(state, clients),
      }));
    },
    processes: [],
    setProcesses: (processes) => {
      set({ processes });
      set((state) => ({
        ...state,
        newTaskEmpty: createNewTaskEmpty(state, processes),
      }));
    },
    activitiesByProcess: [],
    setActivitiesByProcess: (activitiesByProcess) => {
      console.log("Setting activitiesByProcess:", activitiesByProcess);
      set({ activitiesByProcess });
      set((state) => ({
        ...state,
        newTaskEmpty: createNewTaskEmpty(state, activitiesByProcess),
      }));
    },
    activities: [],
    setActivities: (activities) => {
      set({ activities });
    },
    newTaskEmpty: [],
  };
});
