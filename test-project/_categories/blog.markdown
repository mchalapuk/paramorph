---
title: Blog
date: 2018-02-03 17:55:00 +02:00
tags:
- paramorph
- static
- blog
- generator
- news
- changelog
role: category
---

<div>
  <Feed { ...data } feed={ data.website.getCollectionOfTitle('Posts').pages } />
</div>

