# Welcome to Jekyll!
#
# This config file is meant for settings that affect your entire site, values
# which you are expected to set up once and rarely need to edit after that.
# For technical reasons, this file is *NOT* reloaded automatically when you use
# `jekyll serve -l -H localhost`. If you change this file, please restart the 
# server process.

# Basic Site Settings
locale                   : "en-US"
site_theme               : "default"
title                    : "Your Name / Site Title"
title_separator          : "-"
name                     : &name "Your Name"
description              : &description "personal description"
url                      : https://academicpages.github.io # the base hostname & protocol for your site e.g. "https://[your GitHub username].github.io" or if you already have some other page hosted on Github then use "https://[your GitHub username].github.io/[Your Repo Name]"
baseurl                  : "" # the subpath of your site, e.g. "/blog"
repository               : "academicpages/academicpages.github.io"

# Site Author - The following control what appear as part of the author content on the side bar.
#               If a field is blank the icon and link will not appear, otherwise it will be shown.
#               Additional customization can be done by editing /_includes/author-profile.html
author:
  # Biographic information
  avatar           : "profile.png"
  name             : "Your Sidebar Name"
  pronouns         : # example: "she/her"  
  bio              : "Short biography for the left-hand sidebar"
  location         : "Earth"
  employer         : "Red Brick University"
  uri              : # URL
  email            : "none@example.org" 

  # Academic websites
  academia         : # URL
  arxiv            : # URL - Update with the correct link to your profile
  googlescholar    : "https://scholar.google.com/citations?user=PS_CX0AAAAAJ"
  impactstory      : # URL
  orcid            : "http://orcid.org/yourorcidurl"
  semantic         : # URL
  pubmed           : "https://www.ncbi.nlm.nih.gov/pubmed/?term=john+snow"
  researchgate     : # URL
  scopus           : # URL

  # Repositories and software development
  bitbucket        : # Username - Update with your username on the site
  codepen          : # Username
  dribbble         : # Username
  github           : "academicpages"
  kaggle           : # Username  
  stackoverflow    : # User number or user number and name (i.e., use "1" or "1/jeff-atwood")    

  # Social media
  artstation       : # Username
  bluesky          : "bsky.app" # Replace this with you Bluesky username
  facebook         : # Username
  flickr           : # Username
  foursquare       : # Username
  goodreads        : # Username
  google_plus      : # Username
  keybase          : # Username
  instagram        : # Username
  lastfm           : # Username
  linkedin         : # Username
  mastodon         : # URL
  medium           : # URL
  pinterest        : # Username
  soundcloud       : # Username
  steam            : # Username
  telegram         : # URL
  tumblr           : # Username
  twitter          : # Username for X / Twitter
  vine             : # Username
  weibo            : # Username
  wikipedia        : # Username
  xing             : # Username
  youtube          : # Username
  zhihu            : # Username

# Publication Category - The following the list of publication categories and their headings
publication_category:
  books:
    title: 'Books'
  manuscripts:
    title: 'Journal Articles'    
  conferences:
    title: 'Conference Papers'

# Site Settings
teaser                   :  # filename of teaser fallback teaser image placed in /images/, .e.g. "500x300.png"
breadcrumbs              : false # true, false (default)
words_per_minute         : 160
future                   : true
read_more                : "disabled" # if enabled, adds "Read more" links to excerpts
talkmap_link             : false      #change to true to add link to talkmap on talks page
comments:
  provider               : # false (default), "disqus", "discourse", "facebook", "google-plus", "staticman", "custom"
  disqus:
    shortname            :
  discourse:
    server               : # https://meta.discourse.org/t/embedding-discourse-comments-via-javascript/31963 , e.g.: meta.discourse.org
  facebook:
    appid                :
    num_posts            : # 5 (default)
    colorscheme          : # "light" (default), "dark"
staticman:
  allowedFields          : ['name', 'email', 'url', 'message']
  branch                 : "gh-pages" # "master", "gh-pages"
  commitMessage          : "New comment."
  filename               : comment-{@timestamp}
  format                 : "yml"
  moderation             : true
  path                   : "_data/comments/{options.slug}"
  requiredFields         : ['name', 'email', 'message']
  transforms:
    email                : "md5"
  generatedFields:
    date:
      type               : "date"
      options:
        format           : "iso8601" # "iso8601" (default), "timestamp-seconds", "timestamp-milliseconds"
atom_feed:
  hide                   : false     # change to true to hide the RSS feed in the footer
  path                   : # blank (default) uses feed.xml


# SEO Related
google_site_verification :
bing_site_verification   :
alexa_site_verification  :
yandex_site_verification :


# Social Sharing
twitter:
  username               : &twitter
facebook:
  username               :
  app_id                 :
  publisher              :
og_image                 :  # Social media default site image
og_description           :  # Social media default site image description
# For specifying social profiles
# - https://developers.google.com/structured-data/customize/social-profiles
social:
  type                   : # Person or Organization (defaults to Person)
  name                   : # If the user or organization name differs from the site's name
  links: # An array of links to social media profiles


# Analytics
analytics:
  provider               :  "false" # false (default), "google", "google-universal", "google-analytics-4", "custom"
  google:
    tracking_id          :


# Reading Files
include:
  - .htaccess
  - _pages
  - files
exclude:
  - "*.sublime-project"
  - "*.sublime-workspace"
  - .asset-cache
  - .bundle
  - .github
  - .jekyll-assets-cache
  - .sass-cache
  - assets/js/_main.js
  - assets/js/plugins
  - assets/js/vendor
  - CHANGELOG
  - Capfile
  - config
  - Dockerfile
  - Gemfile
  - Gruntfile.js
  - gulpfile.js
  - LICENSE
  - local
  - log
  - node_modules
  - package.json*
  - Rakefile
  - README
  - tmp
  - vendor
keep_files:
  - .git
  - .svn
encoding: "utf-8"
markdown_ext: "markdown,mkdown,mkdn,mkd,md"


# Conversion
markdown: kramdown
highlighter: rouge
lsi: false
excerpt_separator: "\n\n"
incremental: false


# Markdown Processing
kramdown:
  input: GFM
  hard_wrap: false
  auto_ids: true
  footnote_nr: 1
  entity_output: as_char
  toc_levels: 1..6
  smart_quotes: lsquo,rsquo,ldquo,rdquo
  enable_coderay: false


# These settings control the types of collections used by the template
collections:
  teaching:
    output: true
    permalink: /:collection/:path/
  publications:
    output: true
    permalink: /:collection/:path/
  portfolio:
    output: true
    permalink: /:collection/:path/
  talks:
    output: true
    permalink: /:collection/:path/


# These settings control how pages and collections are included in the site
defaults:
  # _posts
  - scope:
      path: ""
      type: posts
    values:
      layout: single
      author_profile: true
      read_time: true
      comments: true
      share: true
      related: true
  # _pages
  - scope:
      path: ""
      type: pages
    values:
      layout: single
      author_profile: true
  # _teaching
  - scope:
      path: ""
      type: teaching
    values:
      layout: single
      author_profile: true
      share: true
      comments: true
  # _publications
  - scope:
      path: ""
      type: publications
    values:
      layout: single
      author_profile: true
      share: true
      comments: true
  # _portfolio
  - scope:
      path: ""
      type: portfolio
    values:
      layout: single
      author_profile: true
      share: true
      comment: true
  # _talks
  - scope:
      path: ""
      type: talks
    values:
      layout: talk
      author_profile: true
      share: true


# Sass/SCSS
sass:
  sass_dir: _sass
  style: compressed # http://sass-lang.com/documentation/file.SASS_REFERENCE.html#output_style


# Outputting
permalink: /:categories/:title/
# paginate: 5 # amount of posts to show
# paginate_path: /page:num/
timezone: Etc/UTC # http://en.wikipedia.org/wiki/List_of_tz_database_time_zones


# Plugins
plugins:
  - jekyll-feed
  - jekyll-gist
  - jekyll-paginate
  - jekyll-sitemap
  - jekyll-redirect-from
  - jemoji

# Mimic GitHub Pages with --safe
whitelist:
  - jekyll-feed
  - jekyll-gist
  - jekyll-paginate
  - jekyll-sitemap
  - jekyll-redirect-from
  - jemoji


# Archives
#  Type
#  - GitHub Pages compatible archive pages built with Liquid ~> type: liquid (default)
#  - Jekyll Archives plugin archive pages ~> type: jekyll-archives
#  Path (examples)
#  - Archive page should exist at path when using Liquid method or you can
#    expect broken links (especially with breadcrumbs enabled)
#  - <base_path>/tags/my-awesome-tag/index.html ~> path: /tags/
#  - <base_path/categories/my-awesome-category/index.html ~> path: /categories/
#  - <base_path/my-awesome-category/index.html ~> path: /
category_archive:
  type: liquid
  path: /categories/
tag_archive:
  type: liquid
  path: /tags/
# https://github.com/jekyll/jekyll-archives
# jekyll-archives:
#   enabled:
#     - categories
#     - tags
#   layouts:
#     category: archive-taxonomy
#     tag: archive-taxonomy
#   permalinks:
#     category: /categories/:name/
#     tag: /tags/:name/


# HTML Compression
# - http://jch.penibelst.de/
compress_html:
  clippings: all
  ignore:
    envs: development
    
<!-- ---
permalink: /
title: "Hello"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

Welcome to my personal website!

Test
======
Hello, my name is Chengyan Ji, I go by Kurt. I chose this name in highschool because I thought [Kurt Cobain](https://en.wikipedia.org/wiki/Kurt_Cobain) was pretty cool. I am originally from Xi'an, China. I am an incoming PhD student in statistical science at George Mason University. I obtained my Bachelor's in the University of Washington, and Master's from University of Illinois and University of Virginia.

In my spare time, I like to play table tennis🏓, basketball🏀 or badminton🏸. I also like hiking🥾⛰️ and wildlife photography📸🦊. This is my favorite animal [Asiatic Cheetah](https://en.wikipedia.org/wiki/Asiatic_cheetah). I hope to see one some day!

You can go to my Gallery page to see my photos! [Test](../images/DSC_0151.JPG)

<!-- Getting started
======
1. Register a GitHub account if you don't have one and confirm your e-mail (required!)
1. Fork [this template](https://github.com/academicpages/academicpages.github.io) by clicking the "Use this template" button in the top right. 
1. Go to the repository's settings (rightmost item in the tabs that start with "Code", should be below "Unwatch"). Rename the repository "[your GitHub username].github.io", which will also be your website's URL.
1. Set site-wide configuration and create content & metadata (see below -- also see [this set of diffs](http://archive.is/3TPas) showing what files were changed to set up [an example site](https://getorg-testacct.github.io) for a user with the username "getorg-testacct")
1. Upload any files (like PDFs, .zip files, etc.) to the files/ directory. They will appear at https://[your GitHub username].github.io/files/example.pdf.  
1. Check status by going to the repository settings, in the "GitHub pages" section

Site-wide configuration
------
The main configuration file for the site is in the base directory in [_config.yml](https://github.com/academicpages/academicpages.github.io/blob/master/_config.yml), which defines the content in the sidebars and other site-wide features. You will need to replace the default variables with ones about yourself and your site's github repository. The configuration file for the top menu is in [_data/navigation.yml](https://github.com/academicpages/academicpages.github.io/blob/master/_data/navigation.yml). For example, if you don't have a portfolio or blog posts, you can remove those items from that navigation.yml file to remove them from the header. 

Create content & metadata
------
For site content, there is one Markdown file for each type of content, which are stored in directories like _publications, _talks, _posts, _teaching, or _pages. For example, each talk is a Markdown file in the [_talks directory](https://github.com/academicpages/academicpages.github.io/tree/master/_talks). At the top of each Markdown file is structured data in YAML about the talk, which the theme will parse to do lots of cool stuff. The same structured data about a talk is used to generate the list of talks on the [Talks page](https://academicpages.github.io/talks), each [individual page](https://academicpages.github.io/talks/2012-03-01-talk-1) for specific talks, the talks section for the [CV page](https://academicpages.github.io/cv), and the [map of places you've given a talk](https://academicpages.github.io/talkmap.html) (if you run this [python file](https://github.com/academicpages/academicpages.github.io/blob/master/talkmap.py) or [Jupyter notebook](https://github.com/academicpages/academicpages.github.io/blob/master/talkmap.ipynb), which creates the HTML for the map based on the contents of the _talks directory).

**Markdown generator**

test

How to edit your site's GitHub repository
------
Many people use a git client to create files on their local computer and then push them to GitHub's servers. If you are not familiar with git, you can directly edit these configuration and Markdown files directly in the github.com interface. Navigate to a file (like [this one](https://github.com/academicpages/academicpages.github.io/blob/master/_talks/2012-03-01-talk-1.md) and click the pencil icon in the top right of the content preview (to the right of the "Raw | Blame | History" buttons). You can delete a file by clicking the trashcan icon to the right of the pencil icon. You can also create new files or upload files by navigating to a directory and clicking the "Create new file" or "Upload files" buttons. 

Example: editing a Markdown file for a talk
![Editing a Markdown file for a talk](/images/editing-talk.png)

For more info
------
More info about configuring Academic Pages can be found in [the guide](https://academicpages.github.io/markdown/), the [growing wiki](https://github.com/academicpages/academicpages.github.io/wiki), and you can always [ask a question on GitHub](https://github.com/academicpages/academicpages.github.io/discussions). The [guides for the Minimal Mistakes theme](https://mmistakes.github.io/minimal-mistakes/docs/configuration/) (which this theme was forked from) might also be helpful. --> -->
