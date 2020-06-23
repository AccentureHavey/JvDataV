import Vue from "vue";
import Router from "vue-router";
import index from "@/views/app";
import data from "@/views/data";
import dataEDM from "@/views/dataEDM";
import All from "@/views/All";
import CNC from "@/views/CNC";

Vue.use(Router);

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "index",
      component: index
    },
    {
      path: "/data",
      name: "data/",
      component: index
    },
    {
      path: "/dataEDM/:user",
      name: "dataEDM",
      component: dataEDM
    },
    {
      path: "/CNC/:user",
      name: "CNC",
      component: CNC
    },
    {
      path: "/All/:user",
      name: "All",
      component: All
    },
    {
      path: "/data/:user",
      name: "data",
      component: data
    }
  ]
});
