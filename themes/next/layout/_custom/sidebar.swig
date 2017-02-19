<div class="tag-cloud" style="padding-top:10px">
<div class="tag-cloud-title">
	{{ _p('counter.tag_cloud', site.tags.length) }}
</div>
<div class="tag-cloud-tags">
  {{ tagcloud({min_font: 12, max_font: 22, color: true, start_color: '#ccc', end_color: '#111'}) }}
</div>
</div>
{{ list_posts({amount:3, transform:truncate, orderby:'-sticky -date'}) }}