<script lang="ts" setup>
const { getMovieList } = useOdmb();
const inputSearch = ref("batman");
const yearSearch = ref(22);
const { data, pending, error } = await getMovieList({
  query: { s: inputSearch, y: yearSearch },
  key: "movies",
  watch: [inputSearch],
});
</script>

<template>
  <div class="max-w-xl rounded-sm mx-auto border">
    <div class="mx-4">
      <div class="relative mt-2 flex flex-grow items-stretch focus-within:z-10">
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
          class="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Batman"
        />
      </div>
    </div>
    <ul v-if="!pending && !error" role="list" class="divide-y divide-gray-200">
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
    <div v-else-if="data?.Response">
      <h3 class="mt-2 text-sm font-semibold text-gray-900">
        {{ data?.Error }}
      </h3>
      <p class="mt-1 text-sm text-gray-500">
        Get started by creating a new project.
      </p>
    </div>
  </div>
</template>
