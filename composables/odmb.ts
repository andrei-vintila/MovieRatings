import { AsyncData, UseFetchOptions } from "nuxt/app";

export const useOdmb = () => {
  const { OMDB_API_KEY, OMDB_API_URL } = useAppConfig();
  const baseUrl = `${OMDB_API_URL}?apikey=${OMDB_API_KEY}`;

  type Movie = {
    Title: "string";
    Year: number;
    imdbId: "string";
    Type: "string";
    Poster: "string";
  };
  type MovieList = {
    Search: Movie[];
    totalResults: number;
    Response: boolean;
    Error: string;
  };

  const getMovieList = function (options: UseFetchOptions<any>) {
    return useFetch(baseUrl, options) as AsyncData<MovieList, Error>;
  };
  return { getMovieList, baseUrl };
};
