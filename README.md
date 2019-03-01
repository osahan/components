# Maven Engage

`maven-engage` is a web component providing content recommendation cards (similar to those given by Taboola or RevContent) for sites across the Maven family of websites.

## Quick start

* Include `mavenEngage.min.js` as a script within your `<head>` tag
    - Use this URL for development: `https://raw.githack.com/osahan/components/master/dist/mavenEngage.min.js`
* Where the recommendations should appear, add the following tag:

```
    <maven-engage src="JSON_ENDPOINT">
        <script type="application/json">
            {
                COMPONENT_STYLE_CONFIG
            }
        </script>
    </maven-engage>
```
## Styling & Customization

The `maven-engage` element and the child `maven-card` elements may be styled using the `COMPONENT_STYLE_CONFIG` blob. An example is as follows (all attributes are currently required):

### Component Style Config

```
{
    "component": {
        "title": "From Maven Coalition: List Cards"
    },
    "style": {
        "component": {
            "title": {
                "font": "22px/150% Arial, Helvetica, sans-serif",
                "color": "#000000",
                "textTransform": "uppercase"
            },
            "backgroundColor": "transparent"
        },
        "card": {
            "cardType": "standard",
            "imageStyle": "landscape",
            "textAlign": "center",
            "backgroundColor": "transparent",
            "sectionLabel": {
                "color": "#00B8FC",
                "font": "10px Arial, Helvetica, sans-serif",
                "textTransform": "uppercase"
            },
            "title": {
                "color": "#000000",
                "font": "18px Arial, Helvetica, sans-serif",
                "textTransform": "uppercase"
            },
            "subTitle": {
                "color": "#000000",
                "font": "12px Arial, Helvetica, sans-serif",
                "textTransform": "none"
            },
            "site": {
                "color": "#000000",
                "backgroundColor": "#f1f1f1",
                "font": "10px Arial, Helvetica, sans-serif",
                "textTransform": "uppercase"
            }
        }
    }
}
```
## Expected Endpoint Response

The JSON endpoint returns an object with a single `cards` property, which is an array of card objects. A sample card object is below:

```
  [{
    "title": "Double-Mushroom Cheeseburger",
    "link": "https://www.rachaelraymag.com/recipe/double-mushroom-burger-with-cheese",
    "site": {
        "displayName": "Rachael Ray Every Day",
        "link": "https://www.rachaelraymag.com/"
    },
    "label": {
      "displayName": "Dinner",
      "link": "https://www.rachaelraymag.com/recipes/dinner"
    },
    "subTitle": "This vegetarian burger doubles down on umami with grilled and sauteed mushrooms (plus cheese!).",
    "image": {
      "src": "https://www.rachaelraymag.com/.image/c_limit%2Ccs_srgb%2Cq_auto:good%2Cw_700/MTYwMzI5NjQ2MDUzNzk0ODk1/double-mushroom-cheeseburgers-1218-5d67571f.webp"
    }
  }]
  ```
  ### Test Endpoints
* `https://jsonblob.com/api/jsonBlob/c48ac50e-3b97-11e9-bb3d-9105f8944490`
* `https://jsonblob.com/api/jsonBlob/40ccb1b1-3abc-11e9-9959-69e70be952f8`
