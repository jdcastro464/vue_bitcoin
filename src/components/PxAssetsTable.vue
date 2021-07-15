<template>
  <table>
    <thead>
      <tr class="bg-gray-100 border-b-2 border-gray-400">
        <th></th>
        <th :class="{ up: this.sortOrder == 1, down: this.sortOrder == -1 }">
          <span class="underline cursor-pointer" @click="changeSortOrder"
            >Ranking</span
          >
        </th>
        <th>Nombre</th>
        <th>Precio</th>
        <th>Cap. de Mercado</th>
        <th>Variación 24hs</th>
        <td class="hidden sm:block">
          <input
            class="
              bg-gray-100
              focus:outline-none
              border-b border-gray-400
              py-2
              px-4
              block
              w-full
              appearance-none
              leading-normal
            "
            id="filter"
            placeholder="Buscar..."
            type="text"
            v-model="filter"
          />
        </td>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in filteredAssets"
        :key="item.id"
        class="border-b border-gray-200 hover:bg-gray-100 hover:bg-orange-100"
      >
        <td>
          <img
            class="w-6 h-6"
            :src="`https://static.coincap.io/assets/icons/${item.symbol.toLowerCase()}@2x.png`"
            :alt="item.name"
          />
        </td>
        <td>{{ item.rank }}</td>
        <td>
          <router-link
            class="hover:underline text-green-600"
            :to="{ name: 'coin-detail', params: { id: item.id } }"
          >
            {{ item.name }}
          </router-link>
          <span class="text-gray-600">{{ item.symbol }}</span>
        </td>
        <td>{{ item.priceUsd | dollar }}</td>
        <td>{{ item.marketCapUsd | dollar }}</td>
        <td
          :class="
            item.changePercent24Hr.includes('-')
              ? 'text-red-600'
              : 'text-green-600'
          "
        >
          {{ item.changePercent24Hr | percent }}
        </td>
        <td class="hidden sm:block">
          <px-button @custom-click="goDetails(item.id)"> Detalle </px-button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import PxButton from "@/components/PxButton";

export default {
  name: "PxAssetsTable",

  components: {
    PxButton,
  },

  data() {
    return {
      sortOrder: 1,
      filter: "",
    };
  },

  computed: {
    filteredAssets() {
      const altOrder = this.sortOrder == 1 ? -1 : 1;

      return this.assets
        .filter(
          (a) =>
            a.symbol.toLowerCase().includes(this.filter.toLowerCase()) ||
            a.name.toLowerCase().includes(this.filter.toLowerCase())
        )
        .sort((a, b) => {
          if (parseInt(a.rank) > parseInt(b.rank)) {
            return this.sortOrder;
          }

          return altOrder;
        });
    },
  },

  methods: {
    goDetails(id) {
      this.$router.push({ name: "coin-detail", params: { id } });
    },

    changeSortOrder() {
      this.sortOrder = this.sortOrder == 1 ? -1 : 1;
    },
  },

  props: {
    assets: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped>
.up::before {
  content: "👆";
}

.down::before {
  content: "👇";
}

td {
  padding: 20px 0px;
  font-size: 0.6rem;
  text-align: center;
}

th {
  padding: 5px;
  font-size: 0.6rem;
}

@media (min-width: 640px) {
  td,
  th {
    padding: 20px;
    font-size: 1rem;
  }

  th {
    padding: 12px;
  }
}
</style>
