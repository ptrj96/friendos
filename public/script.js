var app1 = new Vue({
  el: '#input',
  data: {
    word: "",
    user: "",
    definition: "",
    items: [],
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    async add() {
      console.log("It worked");
      console.log(this.word);
      try {
        let r2 = await axios.post('/api/items', {
          word: this.word,
          user: this.user,
          definition: this.definition
        });
      } catch (error) {
        console.log(error);
      }
    },
  }
});

var app2 = new Vue({
  el: '#dict',
  data: {
        items: [],
        findTitle: "",
        findItem: null,
  },
  computed: {
    suggestions() {
      return this.items.filter(item => item.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
    }
  },
  methods: {
    async deleteItem(item) {
      try {
        console.log(item.user);
        await axios.delete("/api/items/" + item.word);
        res.sendStatus(200);
      } catch (error) {
        console.log(error);
      }
    },
    async getItems() {
          console.log("get is running");
    try {
      let response = await axios.get("/api/items");
      this.items = response.data;
      return true;
    } catch (error) {
      console.log(error);
      }
    },
    selectItem(item) {
      this.findTitle = "";
      this.findItem = item;
    },
  },
  created() {
    this.getItems();
  }
});
