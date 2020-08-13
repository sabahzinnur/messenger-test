const listScrolling = {
  data() {
    return {
      listOffset: 1,
      offsetStep: 50,
      limit: 0,
    };
  },
  methods: {
    wheel(event) {
      if (event.deltaY < 0) {
        if (this.listOffset >= 0) {
          return;
        }
        this.listOffset += this.offsetStep;
      } else {
        if (this.limit < Math.abs(this.listOffset)) {
          return;
        }
        this.listOffset -= this.offsetStep;
      }
    }
  }
};

export default listScrolling;
