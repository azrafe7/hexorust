'use strict';

var assign = require('object-assign');
var pagination = require('hexo-pagination');


hexo.config.custom_index_generator = assign({
  per_page: typeof hexo.config.per_page === 'undefined' ? 10 : hexo.config.per_page,
  order_by: '-date'
}, hexo.config.custom_index_generator);


hexo.extend.generator.register('index', function index(locals) {
  console.log('custom index generator');
  
  var config = this.config;

  var posts = locals.posts.sort(config.custom_index_generator.order_by);
  
  posts.each(function(post, i) { 
    post.custom_idx = i;
  });
  
  var paginationDir = config.pagination_dir || 'page';

  return pagination('', posts, {
    perPage: config.custom_index_generator.per_page,
    layout: ['index', 'archive'],
    format: paginationDir + '/%d/',
    data: {
      __index: true
    }
  });
  
});
