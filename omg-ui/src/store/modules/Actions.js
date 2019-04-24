const state = {
  action: '',
  args: {},
  output: ''
}

const getters = {
  getAction: state => state.action,
  getActionArgs: state => state.args,
  getActionOutput: state => state.output
}

const mutations = {
  setAction: (state, action) => (state.action = action),
  addActionArg: (state, arg) => (state.args[arg.key] = arg.value),
  deleteActionArg: (state, key) => {
    delete state.args[key]
  },
  setActionOutput: (state, output) => (state.output = output)
}

const actions = {}

export default {
  state,
  getters,
  mutations,
  actions
}
