export default {
  data() {
    return {
      gradeList: [],
      classList: []
    }
  },
  created() {
    this.fetchGradeClassList('gradeList', 0)
  },
  methods: {
    // 获取年级班级列表
    fetchGradeClassList(arr, id) {
      this.$http.fetchGradeList({ pid: id }).then(({ data }) => {
        this[arr] = data
      })
    }
  }
}
