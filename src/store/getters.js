const getters = {
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  user_info: state => state.user.user_info,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes
}
export default getters
