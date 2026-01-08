import Asset from "../components/Assets/Assets";
import AssetHeading from "../components/Assets/AssetsHeading";
import AssetLink from "../components/Assets/AssetsLink";
import AssetText from "../components/Assets/AssetsText";

import { MAIN_URL } from "./constants"


// feth request query
export const request = async (query, variables = {}) => {
  try {
    const result = await fetch(MAIN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query, variables }),
    });

    const { data } = await result.json();

    return data;
  } catch (err) {
    console.log(err);
  }
};

export const sortByDate = (arr) => {
	return arr.sort((a, b) => new Date(a.date) - new Date(b.date))
}

export const getLocalDateString = (date, { month = 'numeric', day = 'numeric', year = 'numeric' }) => {
	return new Date(date).toLocaleDateString('uk-UA', {
		month,
		day,
		year
	})
}


// для виводу текстів і зображень з json 
export const renderNode = ({ nodeType, data, value, content }, i) => {
	const key = `${nodeType}${i}`;

	switch (nodeType) {
		case "paragraph":
			return <p key={key}>{content.map(renderNode)}</p>;

		case "text":
			return <AssetText key={key} value={value} />;

		case "heading-3":
			return <AssetHeading key={key} content={content} />;

		case "embedded-asset-block":
			return <Asset key={key} id={data.target.sys.id} />;

		case "hyperlink":
			return <AssetLink key={key} uri={data.uri} content={content} />;

		default:
			break;
	}

	return Array.isArray(content) ? content.map(renderNode) : null;
};

export const jsonToText = ({ content }) => {
	return content.map(renderNode);
};

export const getAsset = async (assetId) => {
	try {
		const url = `https://cdn.contentful.com/spaces/${process.env.REACT_APP_SPACE_ID}/assets/${assetId}?access_token=${process.env.REACT_APP_ACCESS_TOKEN}`;

		const result = await fetch(url);

		const data = await result.json();

		const link = data?.fields?.file?.url;

		return link ? `https:${link}` : null;
	} catch (err) {
		console.log(err);
	}
};

/**
 * New behavior: `discount` is the final price in USD (not percent).
 * If `discount` is provided, return it (final price), otherwise return original price.
 * Existing percentage-based discounts are no longer supported.
 */
export const calculateDiscountedPrice = (price, discount) => {
	return discount ? discount : price;
};


