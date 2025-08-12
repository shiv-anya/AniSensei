export const BANNER_ANIMES_QUERY = `query ($ids: [Int]) {
    Page(perPage: 20) {
      media(id_in: $ids, type: ANIME) {
        id
        title {
          romaji
          english
          native
        }
        type
        startDate {
          year
          month
          day
        }
        averageScore
        description(asHtml: false)
        coverImage {
          large
          extraLarge
        }
      }
    }
  }`;

export const TRENDING_ANIMES_QUERY = `query {
    Page(perPage: 20) {
      media(type: ANIME, sort: TRENDING_DESC) {
        id
        title {
          romaji
          english
          native
        }
        type
        startDate {
          year
        }
          coverImage {
          large
          extraLarge
        }
      }
    }
  }`;

export const NEW_RELEASED_ANIMES_QUERY = `query {
  Page(perPage: 20) {
    media(type: ANIME, sort: START_DATE_DESC) {
      id
      title {
      romaji
        english
      }
      type        
      startDate {
        year
      }
      averageScore
      coverImage {
        extraLarge
      }
    }
  }
}
`;

export const POPULAR_ANIME_SHOWS_QUERY = `query {
  Page(perPage: 20) {
    media(type: ANIME, format: TV, sort: POPULARITY_DESC) {
      id
      title {
        romaji
        english
        native
      }
      type        
      format      
      startDate {
        year
      }
      averageScore
      popularity
      coverImage {
        extraLarge
      }
    }
  }
}
`;

export const COMING_SOON_ANIMES_QUERY = `query {
  Page(perPage: 20) {
    media(type: ANIME, status: NOT_YET_RELEASED, sort: START_DATE) {
      id
      title {
        romaji
        english
        native
      }
      type        
      format      
      startDate {
        year
        month
        day
      }
      coverImage {
        extraLarge
      }
      description(asHtml: false)
    }
  }
}
`;

export const TOP_RATED_ANIMES = `query {
  Page(perPage: 20) {
    media(type: ANIME, sort: SCORE_DESC) {
      id
      title {
        romaji
        english
        native
      }
      type       
      format     
      startDate {
        year
        month
        day
      }
      averageScore
      coverImage {
        extraLarge
      }
      description(asHtml: false)
    }
  }
}
`;

export const WHATS_POPULAR_QUERY = `query {
  Page(perPage: 20) {
    media(type: ANIME, sort: POPULARITY_DESC) {
      id
      title {
        romaji
        english
        native
      }
      type       
      format     
      startDate {
        year
        month
        day
      }
      popularity 
      averageScore
      coverImage {
        extraLarge
      }
      description(asHtml: false)
    }
  }
}
`;

export const ALL_ANIME_QUERY = `
  query ($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(type: ANIME, sort: POPULARITY_DESC) {
        id
        title { romaji english native }
        type
        format
        startDate { year month day }
        popularity
        averageScore
        coverImage { extraLarge }
      }
    }
  }
`;

export const FILTER_QUERY = `query ($page: Int, $perPage: Int, $sort: [MediaSort], $format: MediaFormat, $status: MediaStatus) {
  Page(page: $page, perPage: $perPage) {
  pageInfo {
    total
    currentPage
    lastPage
    hasNextPage
    perPage
  }
    media(
      type: ANIME
      sort: $sort
      format: $format
      status: $status
    ) {
      id
      title {
        romaji
        english
      }
      format
      status
      averageScore
      startDate {
        year
        month
        day
      }
      coverImage {
        extraLarge
      }
    }
  }
}
`;

export const SEARCH_QUERY = `
  query ($page: Int, $perPage: Int, $search: String, $format: MediaFormat) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(
        type: ANIME
        search: $search
        format: $format
      ) {
        id
        title {
          romaji
          english
        }
        format
        averageScore
        startDate {
          year
          month
          day
        }
        coverImage {
          extraLarge
        }
      }
    }
  }
`;
