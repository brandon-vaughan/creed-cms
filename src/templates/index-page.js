import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import Content, {HTMLContent} from '../components/Content'

export const IndexPageTemplate = ({
  image,
  title,
  title_image,
  film,
  leadership,
  about,
  contentComponent
}) => {
  const PageContent = contentComponent || Content

  return (
  <div className="container">
    <div
      className="background"
      style={{
        backgroundImage: `url(${
          !!image.childImageSharp ? image.childImageSharp.fluid.src : image
        })`,
      }}
    >
      <div
        className="title"
        style={{
          backgroundImage: `url(${
            !!title_image.childImageSharp ? title_image.childImageSharp.fluid.src : title_image
          })`,
        }}
      />
    </div>
    
    <section className="about">
      <h1>{about.title} <span>{about.subtitle}</span></h1>
      <p>{about.description}</p>
    </section>
    <section className="film">
      <PageContent content={film} />
    </section>
    <section className="leadership">
      <h1>{leadership.heading}</h1>
      <p>{leadership.description}</p>
      {leadership.team.map(m => (
        <div key={m.name}>
          <h2>{m.name} <span>{m.title}</span></h2>
          <p>{m.bio}</p>
        </div>
      ))}
    </section>
    
  </div>
)
}

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title_image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  film: PropTypes.string,
  about: PropTypes.object,
  leadership: PropTypes.shape({
    team: PropTypes.array,
  }),
}

const IndexPage = ({ data }) => {
  const { frontmatter, html } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate
        contentComponent={HTMLContent}
        image={frontmatter.image}
        title_image={frontmatter.title_image}
        title={frontmatter.title}
        film={html}
        about={frontmatter.about}
        leadership={frontmatter.leadership}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      html
      frontmatter {
        title
        title_image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        about {
          title
          subtitle
          description
        }
        leadership {
          team {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            name
            title
            bio
          }
          heading
          description
        }
      }
    }
  }
`
