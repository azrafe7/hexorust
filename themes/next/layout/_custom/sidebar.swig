<span class="sidebar-posts">
  <h3 class="text-uppercase text-center">latest posts</h3>
  {{ list_posts({amount:5, transform:truncate, orderby:'custom_idx', order:1}) }}
</span>
<div class="tag-cloud">
  <h3 class="text-uppercase text-center">tags</h3>
  <div class="tag-cloud-title">
    {{ _p('counter.tag_cloud', site.tags.length) }}
  </div>
  <div>
    {{ tagcloud({min_font: 12, max_font: 22, color: true, start_color: '#ccc', end_color: '#111'}) }}
  </div>
</div>