export default {
  computed: {
    visitedViews() {
      return this.$store.state.tagsView.visitedViews
    }
  },
  methods: {
    deleteCurrentView() {
      const view = this.$route
      this.$store.dispatch('tagsView/delView', view).then(() => {
        const arr = view.fullPath.split('/').slice(1)
        // to reload parent page
        this.$router.replace({ path: `/${arr[0]}/${arr[1]}` })
      })
    }
  }
}
