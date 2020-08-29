import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Img from 'gatsby-image'
import { Helmet } from 'react-helmet'

const ProjektePage = ({ data }: { data: any }) => {
  const { edges: projekte } = data.allMarkdownRemark;

  return (
    <Layout>
      <Helmet>
        <title>Projekte - Schweizerischer Blindenbund Regionalgruppe Zürich</title>
        <meta name="description" content='Projekte der Regionalgruppe Zürich des Schweizerischen Blindenbunds.' />
      </Helmet>
      <section className="section">
        <div className="container content">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="section">
                <h1 className="title is-size-1">
                  Projekte
          </h1><div className="tile is-ancestor">{projekte &&
                  projekte.map(({ node: projekt }: { node: any }) => (
                    <div className="tile is-6 is-parent" key={projekt.id}>
                      <div className="tile is-child">
                        <div className="card">
                          <div className="card-image">
                            <figure className="image">
                              <Link to={projekt.frontmatter.link}><Img fluid={projekt.frontmatter.bild.image.childImageSharp.fluid} alt={projekt.frontmatter.bild.alt} /></Link>
                            </figure>
                          </div>
                          <div className="card-content">
                            <div className="media">
                              <div className="media-content">
                                <p className="title is-4"><Link to={projekt.frontmatter.link}><strong>{projekt.frontmatter.title}</strong></Link></p>
                                <p className="subtitle is-6">{projekt.frontmatter.beschreibung}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

ProjektePage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  })
}

export default ProjektePage

export const projekteQuery = graphql`
      query ProjekteQuery {
          allMarkdownRemark(
            sort: { order: ASC, fields: [frontmatter___reihenfolge] }
            filter: {frontmatter: {templateKey: {eq: "projekt-item" } } }
        ) {
          edges {
          node {
              id
              frontmatter {
                title
                link
                templateKey
                beschreibung
                bild {
                  alt
                  image {
                    childImageSharp {
                      fluid(maxWidth: 400, quality: 92) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `