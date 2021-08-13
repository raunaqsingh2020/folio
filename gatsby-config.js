module.exports = {
  siteMetadata: {
    title: `Raunaq Singh – Creative Developer & Designer`,
    description: `Creative developer, design aficionado, abstract thinker.`,
    titleTemplate: "%s | Raunaq Singh",
    url: "https://localhost:8000",
    image: "/images/banner.png",
    pathPrefix: "/folio",
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `raunaq-singh-portfolio`,
        short_name: `portfolio`,
        start_url: `/`,
        background_color: `#FFF2D8`,
        theme_color: `#FFF2D8`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`,
      },
    },
    `gatsby-plugin-gatsby-cloud`,
  ],
}
