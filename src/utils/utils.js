export function convertMovieDuration(duration) {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return hours ? `${hours}ч ${minutes}м` : `${minutes}м`;
}

export function handleFilterByDuration(movies) {
  return movies.filter((movie) => movie.duration <= 40);
}