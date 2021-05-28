<template>
  <section class="okr-dashboard component component--full-width">
    <div>
      <div class="okr-dashboard__options">
        <div class="okr-dashboard__options--top">
          <div class="okr-dashboard__options--left">
            <h2>Dashboard</h2>
          </div>
          <div class="okr-dashboard__options--right">
            <div class="okr-dashboard__timeframe-container">
              <button type="button">
                <ChevronLeftIcon />
              </button>
              <div class="okr-dashboard__timeframe">
                <h4>{{ currentQuarter.toUpperCase() }} {{ currentYear }}</h4>
                <p>{{ firstMonth }} - {{ lastMonth }}</p>
              </div>
              <button type="button">
                <ChevronRightIcon />
              </button>
            </div>
            <button class="button button--circle button--grey" type="button">
              <OptionsIcon />
            </button>
            <router-link
              class="button button--circle button--green okr-dashboard__add-button"
              :class="{ 'button--pulse': !allOkrData.length }"
              to="/okrs/okr/new"
              tag="button"
            >
              <AddIcon />
            </router-link>
          </div>
        </div>
        <div class="okr-dashboard__options--bottom">
          <div class="okr-dashboard__okr-types">
            <button type="button" @click="selectOkrType">
              Individual OKRs
            </button>
            <button type="button" @click="selectOkrType">Corporate OKRs</button>
            <button type="button" @click="selectOkrType">
              Sales Team OKRs
            </button>
          </div>
        </div>
      </div>
      <div class="okr-dashboard__cards">
        <div class="okr-dashboard__cards-option">
          <h3>OKRs<span v-if="!allOkrData.length">: 0</span></h3>
        </div>
        <div
          class="okr-dashboard__card-container"
          v-for="okr in allOkrData"
          :key="'objective-' + okr.id"
          :data-id="okr.id"
        >
          <OkrCard :data="okr" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import OkrCard from "@/components/molecules/OkrCard";

export default {
  components: {
    OkrCard,
  },
  data() {
    return {
      selectedOkr: null,
      selectedOkrId: null,
      currentQuarter: null,
      currentYear: null,
      firstMonth: null,
      lastMonth: null,
      QUARTERS: {
        q1: {
          1: "Jan",
          2: "Feb",
          3: "Mar",
        },
        q2: {
          4: "Apr",
          5: "May",
          6: "Jun",
        },
        q3: {
          7: "Jul",
          8: "Aug",
          9: "Sep",
        },
        q4: {
          10: "Oct",
          11: "Nov",
          12: "Dec",
        },
      },
    };
  },
  computed: {
    allOkrData() {
      return this.$store.state.okrs.allOkrData;
    },
  },
  methods: {
    selectOkrType(event) {
      [
        ...this.$el.querySelectorAll(".okr-dashboard__okr-types .active"),
      ].forEach((button) => {
        button.classList.remove("active");
      });
      event.currentTarget.classList.add("active");
    },
    setQuarter() {
      const currentDate = new Date();
      this.currentYear = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      for (let key in this.QUARTERS) {
        if (this.QUARTERS[key][month]) {
          this.currentQuarter = key;
        }
      }
      this.firstMonth = Object.values(this.QUARTERS[this.currentQuarter])[0];
      this.lastMonth = Object.values(this.QUARTERS[this.currentQuarter])[2];
    },
  },
  created() {
    this.setQuarter();
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/organisms/_okr-dashboard.scss";
</style>
