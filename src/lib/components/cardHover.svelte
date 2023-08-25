<div
              class="rounded-md border p-1 shadow-lg shadow-black/30 dark:border-tertiary bg-dark-v1 dark:bg-custom-dark-v2 [--opacity:0] relative hover:[--opacity:1] max-w-[230px]"
            >
              <picture class="rounded relative grid overflow-hidden h-full">
                <img
                  class="aspect-[4/2] sm:h-[350px] xs:h-[280px] h-[300px] flex object-cover duration-200"
                  src={manga.images.webp.large_image_url}
                  alt={manga.title}
                  loading="lazy"
                />
                <div
                  class="absolute z-[1] w-full h-full backdrop-blur-[2px] inset-0 flex justify-center items-center bg-dark-v1/50 opacity-[var(--opacity)] duration-200 [box-shadow:inset_0px_0px_140px_30px_rgba(0,0,0,1);]"
                >
                  <div class="flex flex-col items-center">
                    <Link
                      variant="text"
                      href={LocalRotes.manga.details(manga.mal_id)}
                      class="flex-wrap px-2 flex text-center text-white">{manga.title}</Link
                    >
                    <span class="text-xs opacity-70">Rank: {manga?.rank ?? 'N/A'}</span>
                    <span class="text-xs opacity-70">Score: {manga?.score ?? 'N/A'}</span>
                    {#each manga?.genres as genre}
                      <span class="text-xs opacity-70">Genres: {genre?.name}</span>
                    {/each}
                  </div>
                </div>
              </picture>
            </div>