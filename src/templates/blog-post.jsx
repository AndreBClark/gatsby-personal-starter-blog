import React from 'react'
import { graphql } from 'gatsby'
import Base from '../components/Base'
import SEO from '../components/SEO'
import Panel from '../components/Panel'
import ContentContainer from '../components/ContentContainer'
import styled from 'styled-components'
import { liveRemarkForm } from 'gatsby-tinacms-remark'
import { Wysiwyg } from '@tinacms/fields'
import { TinaField } from '@tinacms/form-builder'
import { Btn } from '../components/button'
import useSiteMetadata from '../hooks/useSiteMetaData'
import PageHeading from '../components/PageHeading'
import AniLink from 'gatsby-plugin-transition-link/AniLink'

const Article = styled.article`
  *:not(li) + * {
    margin-bottom: calc(${props => props.theme.spacer} * 4);
  }
  h2 {
    margin-bottom: ${props => props.theme.spacer};
  }
`

const SequentialLinks = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  padding: 0;
`
const Date = styled.p`
  margin: calc(4 * ${props => props.theme.spacer});
  max-width: ${props => props.theme.maxWidth};
  @media screen and (min-width: ${props => props.theme.breakpoints.desktop}) {
    margin: ${props => props.theme.spacer};
  }
`
const BlogPostTemplate = ({
  data,
  pageContext,
  location,
  setIsEditing,
  isEditing,
}) => {
  const post = data.markdownRemark
  const siteTitle = useSiteMetadata()
  const { previous, next } = pageContext
  return (
    <Base location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <ContentContainer>
        <PageHeading>{post.frontmatter.title}</PageHeading>
        <Date>{post.frontmatter.date}</Date>
        <Panel>
          <TinaField name="rawMarkdownBody" Component={Wysiwyg}>
            <Article dangerouslySetInnerHTML={{ __html: post.html }} />
          </TinaField>
          {process.env.NODE_ENV !== 'production' && (
            <Btn as={AniLink} onClick={() => setIsEditing(p => !p)}>
              {isEditing ? 'Preview' : 'Edit'}
            </Btn>
          )}
        </Panel>
        <Panel>
          <SequentialLinks>
            <li>
              {previous && (
                <AniLink
                  paintDrip
                  hex="#1D1D1D"
                  to={previous.fields.slug}
                  rel="prev"
                >
                  ← {previous.frontmatter.title}
                </AniLink>
              )}
            </li>
            <li>
              {next && (
                <AniLink
                  paintDrip
                  hex="#1D1D1D"
                  to={next.fields.slug}
                  rel="next"
                >
                  {next.frontmatter.title} →
                </AniLink>
              )}
            </li>
          </SequentialLinks>
        </Panel>
      </ContentContainer>
    </Base>
  )
}
const BlogTemplateOptions = {
  fields: [
    {
      label: 'Title',
      name: 'rawFrontmatter.title',
      component: 'text',
    },
    {
      name: 'frontmatter.draft',
      component: 'toggle',
      label: 'Draft',
    },
    {
      label: 'Date Posted',
      name: 'rawFrontmatter.date',
      component: 'date',
      dateFormat: 'MMMM DD YYYY',
      timeFormat: false,
    },
    {
      label: 'Body',
      name: 'rawMarkdownBody',
      component: 'markdown',
    },
  ],
}

export default liveRemarkForm(BlogPostTemplate, BlogTemplateOptions)

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
      fileRelativePath
      rawFrontmatter
      rawMarkdownBody
    }
  }
`
