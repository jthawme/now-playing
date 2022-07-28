import { Breakpoint } from "~/assets/js/mixins/breakpoints";

export const state = () => {
  return {
    endpoint: "",
    domain: "",
    breakpoints: {
      [Breakpoint.Desktop]: true,
      [Breakpoint.Tablet]: true,
      [Breakpoint.LargeMobile]: true
    }
  };
};

export const mutations = {
  setEndpoint(state, val) {
    state.endpoint = val;
  },
  setDomain(state, val) {
    state.domain = val;
  },
  setBreakpoint(state, val) {
    state.breakpoints[val.key] = val.value;
  }
};

export const actions = {
  async nuxtServerInit({ commit }, { env }) {
    commit("setEndpoint", env.endpoint);
    commit("setDomain", env.PROJECT_DOMAIN);
  }
};
