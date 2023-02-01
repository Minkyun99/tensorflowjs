<template>
  <div>
    <form action="/up" enctype="multipart/form-data">
      <input type="file" name="ufile" id="" />
      <input type="submit" value="전송" />
    </form>

    <div>{{ img }}</div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      img: ''
    }
  },
  created() {
    this.$socket.on('send', (data) => {
      this.get_img = data
    })

    // this.$socket.on('name', (file_name) => {
    //   this.name = file_name
    // })
  },

  methods: {
    confirm: function () {
      this.$socket.emit('send', this.input_file)
    }

    // upload(name, files) {
    //   const formData = new FormData()
    //   formData.append(name, files[0], files[0].name)
    // }
  }
}
</script>

<style></style>
