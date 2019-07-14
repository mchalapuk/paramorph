
import { Paramorph, Post } from '../../model';

export function rss(paramorph : Paramorph) : string {
  const indexPage = paramorph.posts['/'] as Post;
  const notFoundPage = paramorph.posts['/404/'] as Post;

  const posts = Object.keys(paramorph.posts)
    .map(key => paramorph.posts[key] as Post)
    .filter(post => post.output && post.constructor === Post);
  posts.splice(posts.indexOf(indexPage), 1);
  posts.splice(posts.indexOf(notFoundPage), 1);

  const { title, baseUrl } = paramorph.config;

  function render({ url, title, description, timestamp } : Post) {
    return `  <item>
    <title>${title}</title>
    <link>${baseUrl}${url}</link>
    <guid>${baseUrl}${url}</guid>
    <pubDate>${new Date(timestamp).toISOString()}</pubDate>
    <description>${description}</description>
  </item>`;
  }

  return `<?xml version="1.0" encoding="UTF-8" ?>
<channel>
  <link>${baseUrl}/</link>
  <title>${title}</title>
  <generator>Paramorph</generator>
${ posts.map(render).join('\n') }
</channel>
`;
}

export default rss;

