export const tourItemCollectionQuery = `
  {
    tourItemCollection {
      items {
        date
        place 
        city 
        soldOut
        country
        ticketLink
        videoLink
        sys {
          id
        }
      }
    }
  }
`;

export const trakItemCollectionQuery = `
  {
    trackCollection {
      items {
        sys {
          id
        }
		  date
		  title
		  description
		  link {
			url
		  }
		 
      }
    }
  }
`;

export const newsItemCollectionQuery = `
  {
   newsItemCollection {
      items {
        sys {
          id
        }
		  title
		  date
		 
      }
    }
  }
`;

export const newsItemQuery = (id) => `
{
  newsItem(id: "${id}") {
    sys {
      id
    }
	 title
	 date
	
	 description {
		json
	 }
  }
}
`;

export const shopItemCollectionQuery = `
  query GetShopItems($limit: Int, $skip: Int) {
    shopItemCollection(limit: $limit, skip: $skip) {
      total
      items {
        sys {
          id
        }
        price
        title
        discount
        size
        pcd
        dia
        imageCollection {
          items {
            url
            title
          }
        }
      }
    }
  }
`;

export const shopItemQuery = (id) => `
{
	shopItem(id: "${id}") {
    sys {
      id
    }
	 price
	 title
	 
		discount
    size
    pcd
    dia
    imageCollection {
      items {
        url
        title
      }
    }
  }
}
`;