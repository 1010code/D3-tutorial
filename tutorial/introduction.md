

```javascript
d3.select(); // 選取某標籤
d3.selectAll(); // 選取全部標籤

d3.select('h1').style('color', 'red')
.attr('class', 'heading')
.text('Updated h1 tag');

d3.select('body').append('p').text('First Paragraph');
d3.select('body').append('p').text('Second Paragraph');
d3.select('body').append('p').text('Third Paragraph');

d3.selectAll('p').style('color', 'b')
```
