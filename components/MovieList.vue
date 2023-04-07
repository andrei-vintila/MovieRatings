<script lang="ts" setup>
const { getMovieList } = useOdmb();
const inputSearch = ref("batman");
const yearSearch = ref();
const debInputSearch = debouncedRef(inputSearch, 1000);
const debYearSearch = debouncedRef(yearSearch, 500);
const { data, pending, error } = await getMovieList({
  query: { s: debInputSearch, y: debYearSearch },
  key: "movies",
  watch: [debInputSearch, debYearSearch],
});
</script>

<template>
  <div class="max-w-xl rounded-sm mx-auto border">
    <div class="mx-4 flex space-x-2">
      <div class="relative flex-grow mt-2 flex items-stretch focus-within:z-10">
        <div
          class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
        >
          <Icon
            name="heroicons:magnifying-glass"
            class="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </div>
        <input
          type="text"
          name="search"
          id="search"
          v-model="inputSearch"
          class="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Batman"
        />
      </div>
      <div class="mt-2 flex items-stretch focus-within:z-10">
        <input
          type="text"
          name="yearSearch"
          id="yearSearch"
          v-model="yearSearch"
          class="block w-max rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Year"
        />
      </div>
    </div>
    <ul
      v-if="!pending && !error && !data?.Error"
      role="list"
      class="divide-y divide-gray-200"
    >
      <li
        v-for="movie in data?.Search"
        :key="movie.imdbId"
        class="flex py-4 px-2"
      >
        <img class="h-10 w-10 rounded-full" :src="movie.Poster" alt="" />
        <div class="ml-3">
          <p class="text-sm font-medium text-gray-900">
            {{ movie.Title }}
          </p>
          <p class="text-sm text-gray-500">
            <span class="font-thin">Year:</span> {{ movie.Year }}
          </p>
        </div>
      </li>
    </ul>
    <!-- 200 response from odmb but with error -->
    <div v-else-if="data?.Error && debInputSearch" class="text-center py-4">
      <h3 class="mt-2 text-sm font-semibold text-gray-900">
        {{ data?.Error }}
      </h3>
      <p class="mt-1 text-sm text-gray-500">
        Try searching for something else.
      </p>
    </div>
    <!-- Treat nicely when there is no input -->
    <div v-else-if="!debInputSearch" class="text-center py-4">
      <h3 class="mt-2 text-sm font-semibold text-gray-900">No movies here.</h3>
      <p class="mt-1 text-sm text-gray-500">Try searching for something.</p>
    </div>
  </div>
</template>
